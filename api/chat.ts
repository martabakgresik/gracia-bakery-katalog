// Simple in-memory storage for rate limiting (per serverless instance)
const rateLimitMap = new Map<string, { count: number, lastRequest: number }>();

export default async function handler(request: any, response: any) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Basic Rate Limiting (Simulated)
  const ip = request.headers['x-forwarded-for'] || 'random-ip';
  const now = Date.now();
  const limit = 20; // 20 requests per minute
  const windowMs = 60 * 1000;

  const current = rateLimitMap.get(ip as string) || { count: 0, lastRequest: now };
  if (now - current.lastRequest > windowMs) {
    current.count = 0;
    current.lastRequest = now;
  }

  if (current.count >= limit) {
    return response.status(429).json({ error: 'Terlalu banyak permintaan. Silakan coba lagi sebentar lagi.' });
  }
  
  current.count++;
  rateLimitMap.set(ip as string, current);

  const { messages, model, seed } = request.body;
  const apiKey = process.env.POLLINATIONS_API_KEY;

  if (!messages || !Array.isArray(messages)) {
    return response.status(400).json({ error: 'Invalid messages array provided' });
  }

  try {
    const aiResponse = await fetch('https://gen.pollinations.ai/v1/chat/completions', {
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

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error(`AI API Error (${aiResponse.status}):`, errorText);
      return response.status(aiResponse.status).json({ 
        error: "AI service returned an error",
        status: aiResponse.status 
      });
    }

    const data = await aiResponse.json();
    
    // Basic validation of the response structure
    if (!data.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from AI provider");
    }

    return response.status(200).json(data);
  } catch (error: any) {
    console.error('Error in AI Proxy:', error.message);
    return response.status(500).json({ 
      error: 'Failed to communicate with AI provider',
      message: error.message 
    });
  }
}
