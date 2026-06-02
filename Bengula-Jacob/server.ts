import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parse middleware
app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is not set in environment variables. Chat API will default to simulated responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Memory stores for user messages and consultation bookings (mock simulation but persistent in-memory)
interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

const bookings: Booking[] = [];

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chat with Jacob's AI Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid discussion messages." });
    }

    const lastMessage = messages[messages.length - 1]?.content;
    if (!lastMessage) {
      return res.status(400).json({ error: "Empty message requested." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return simulated educational response if key is missing
      const simulatedText = `[Simulated advice from Bengula Jacob's Assistant]:
Thank you for your interest. To help you with your wealth-building journey in Kenya, let me highlight that high-yield Government Treasury Bonds (currently yielding 15%-17% in the Kenyan market), M-Akiba, and regulated Co-operative SACCOs stand out as incredible opportunities for wealth security. 

To provide fully tailored AI financial coaching live, please ensure your GEMINI_API_KEY is set in the secrets panel of Google AI Studio. Please let me know which of these investment vehicles you would like to explore further, or use our calculators in the portal to map your route!`;
      return res.json({ text: simulatedText });
    }

    const client = getGeminiClient();
    
    // Format conversation history for Gemini
    const systemInstruction = `You are Bengula Jacob's Wealth Coaching AI Assistant, representing Jacob Bengula, private wealth relationship manager at Absa Kenya and founder of Bengula Inc. 
Your tone should be highly professional, encouraging, and deeply knowledgeable about the Kenyan financial ecosystem. This includes Kenyan Treasury Bonds, Treasury Bills, M-Akiba, NSE Stocks, Unit Trusts, real estate syndicates, SACCOs, and general personal wealth building. 
Frame yourself as Jacob's professional digital assistant. Frame financial calculations, compound interest, tax withholding (typically 10% or 15% on bond interest in Kenya), and personal budgeting tips in a coaching-focused, practical way.
Do NOT give formal, binding regulated financial advice, but offer highly informative and educational perspectives. The user's name is ${userProfile?.name || 'Valued Guest'} with a financial goal of "${userProfile?.goal || 'General Financial Literacy'}".
Always respond in clear, beautiful Markdown. Keep your responses structured with bullet points or numbered lists where appropriate to ensure they are easy to read.`;

    // Map content parts
    const chatContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Generate output with gemini-3.5-flash as default for basic text tasks
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to communicate with AI Assistant." });
  }
});

// Book a consulting session
app.post("/api/book", (req, res) => {
  try {
    const { name, email, service, date, time, notes } = req.body;
    
    if (!name || !email || !service || !date || !time) {
      return res.status(400).json({ error: "Missing required fields for booking." });
    }

    const newBooking: Booking = {
      id: "bng-" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      service,
      date,
      time,
      notes,
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    res.status(201).json({ success: true, booking: newBooking });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to schedule booking." });
  }
});

// Get all bookings (internal tracking)
app.get("/api/bookings", (req, res) => {
  res.json({ bookings });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BENGULA backend running on port ${PORT}`);
  });
}

startServer();
