import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';
import { log } from './vite';

// Initialize Gemini AI with API key
const initializeGemini = () => {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    log('Google Gemini API key not found. Please set GOOGLE_GEMINI_API_KEY in your environment variables.', 'chatbot');
    return null;
  }
  
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (error) {
    log(`Error initializing Gemini AI: ${error}`, 'chatbot');
    return null;
  }
};

// Handle chat requests
export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const genAI = initializeGemini();
    if (!genAI) {
      return res.status(500).json({ 
        error: 'Gemini AI not initialized. Please check your API key.',
        fallback: true
      });
    }
    
    // Create a model instance using the correct model name for Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Format for history in Gemini API
    const formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Define a system prompt with context about JalSetu
    const farmingContext = `You are an agricultural assistant for JalSetu, a smart water management app for farmers.
    You help farmers with questions about:
    - Water management and irrigation best practices
    - Soil moisture interpretation
    - Water quality metrics (pH, TDS, temperature)
    - Weather predictions and water conservation
    - Crop-specific watering needs
    - Water-saving techniques

    Always provide practical, actionable advice tailored to farmers. Keep responses concise, helpful, and focused on water management for agriculture.
    If asked about topics unrelated to farming or water management, politely steer the conversation back to agricultural water topics.`;
    
    try {
      // Start a chat session with history
      const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        },
      });
      
      // If it's the first message, send the context first
      if (history.length === 0) {
        await chat.sendMessage(farmingContext);
      }
      
      // Get response from the model
      const result = await chat.sendMessage(message);
      const text = result.response.text();
      
      return res.json({ response: text });
    } catch (error: any) {
      log(`Error in Gemini API call: ${error.message}`, 'chatbot');
      
      // Check if this is a rate limit error
      const isRateLimitError = error.message && (
        error.message.includes('429') || 
        error.message.includes('quota') || 
        error.message.includes('rate limit') || 
        error.message.includes('Too Many Requests')
      );
      
      if (isRateLimitError) {
        // Provide a helpful response about rate limits
        return res.json({ 
          response: "I'm currently experiencing high demand and have reached my usage limits. As I'm using a free API tier, I can only handle a certain number of questions per minute. Please try again in a minute or two, or ask a different question about water management for your farm.",
          rateLimited: true
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to get response from Gemini API',
        message: error.message 
      });
    }
  } catch (error: any) {
    log(`Error in chat request: ${error.message}`, 'chatbot');
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message 
    });
  }
}