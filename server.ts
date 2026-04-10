import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy is required for express-rate-limit to work correctly behind a load balancer/proxy
  app.set('trust proxy', 1);

  // Use helmet for security headers, but disable some features that might interfere with Vite in dev
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled to allow Vite's inline scripts and styles
    crossOriginEmbedderPolicy: false,
  }));

  app.use(express.json());

  const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    validate: { trustProxy: false },
    message: { error: 'Terlalu banyak permintaan AI. Silakan coba lagi nanti.' }
  });

  // API Proxy Route for Pollinations AI
  app.post("/api/chat", aiLimiter, async (req, res) => {
    const { messages, model, seed } = req.body;
    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided" });
    }

    // Basic input validation
    if (messages.length > 50) {
      return res.status(400).json({ error: "Conversation too long" });
    }

    const systemInstruction = `Anda adalah "Gracia Asisten", asisten virtual resmi untuk website Gracia Bakery.
      Toko ini menjual roti, jajanan pasar, kue kering, dan donat.
      Nomor WhatsApp toko: +62 822-3330-9744.
      
      Tentang Gracia Bakery:
      Berdiri sejak tahun 2010, Gracia Bakery bermula dari kecintaan terhadap resep kue tradisional warisan keluarga. Kami berkomitmen menggunakan bahan-bahan premium berkualitas tinggi tanpa bahan pengawet buatan. Semua dibuat fresh setiap hari.
      
      Tugas Anda:
      1. Selalu panggil pelanggan dengan sapaan "Kak" atau "Kakak".
      2. Bersikaplah sangat ramah, hangat, antusias, dan berikan emoji secukupnya.
      3. Jawab pertanyaan dengan singkat, padat, namun persuasif. 
      4. Gunakan bahasa Indonesia yang santai namun tetap sopan.
      5. Gunakan Markdown untuk format teks (tebal, miring).
      6. Jika pelanggan ingin memesan, arahkan ke WhatsApp: [Hubungi WhatsApp](https://wa.me/6282233309744)`;

    // Filter out any existing system messages from the client and prepend our own
    const filteredMessages = messages.filter(m => m.role !== 'system');
    const apiMessages = [
      { role: 'system', content: systemInstruction },
      ...filteredMessages
    ];

    try {
      const response = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
        },
        body: JSON.stringify({
          messages: messages,
          model: model || 'openai',
          seed: seed || 42
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`AI API Error (${response.status}):`, errorText);
        return res.status(response.status).json({ 
          error: "AI service returned an error",
          status: response.status 
        });
      }

      const data = await response.json();
      
      // Basic validation of the response structure
      if (!data.choices?.[0]?.message?.content) {
        throw new Error("Invalid response format from AI provider");
      }

      res.json(data);
    } catch (error: any) {
      console.error('Error in AI Proxy:', error.message);
      res.status(500).json({ 
        error: 'Failed to communicate with AI provider',
        message: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        // Force fresh content for dev
        res.status(200).set({ 
          "Content-Type": "text/html",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "Surrogate-Control": "no-store"
        }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
