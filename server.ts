import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Proxy Route for Pollinations AI
  app.post("/api/chat", async (req, res) => {
    const { messages, model, seed } = req.body;
    const apiKey = process.env.POLLINATIONS_API_KEY;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided" });
    }

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
