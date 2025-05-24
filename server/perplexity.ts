import axios from 'axios';
import { Request, Response } from 'express';
import { log } from './vite';

// Base URL for Perplexity API
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Initialize Perplexity client
const getPerplexityClient = () => {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    log('Perplexity API key not found. Please set PERPLEXITY_API_KEY in your environment variables.', 'perplexity');
    return null;
  }
  
  return axios.create({
    baseURL: 'https://api.perplexity.ai',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
};

// Define the system message for agricultural context
const farmingSystemMessage = {
  role: 'system',
  content: `You are an agricultural assistant for JalSetu, a smart water management app for farmers.
  You help farmers with questions about:
  - Water management and irrigation best practices
  - Soil moisture interpretation
  - Water quality metrics (pH, TDS, temperature)
  - Weather predictions and water conservation
  - Crop-specific watering needs
  - Water-saving techniques

  Always provide practical, actionable advice tailored to farmers. Keep responses concise, helpful, and focused on water management for agriculture.
  If asked about topics unrelated to farming or water management, politely steer the conversation back to agricultural water topics.`
};

// Handle chat requests
export async function handlePerplexityChat(req: Request, res: Response) {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const client = getPerplexityClient();
    if (!client) {
      return res.status(500).json({ 
        error: 'Perplexity API client not initialized. Please check your API key.',
        fallback: true
      });
    }
    
    // Format the conversation history for Perplexity API
    const formattedMessages = [];
    
    // Add system message first
    formattedMessages.push(farmingSystemMessage);
    
    // Add conversation history
    if (history.length > 0) {
      // Messages must alternate between user and assistant roles
      for (let i = 0; i < history.length; i++) {
        formattedMessages.push({
          role: history[i].role === 'user' ? 'user' : 'assistant',
          content: history[i].content
        });
      }
    }
    
    // Add the current user message
    formattedMessages.push({
      role: 'user',
      content: message
    });
    
    try {
      // Call Perplexity API
      const response = await client.post('/chat/completions', {
        model: 'llama-3.1-sonar-small-128k-online', // Using the smaller, faster model
        messages: formattedMessages,
        temperature: 0.2, // Lower temperature for more consistent, focused responses
        max_tokens: 500,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.1,
        stream: false
      });
      
      const result = response.data;
      const assistantResponse = result.choices[0].message.content;
      
      return res.json({ 
        response: assistantResponse,
        sources: result.citations || []
      });
    } catch (error: any) {
      log(`Error in Perplexity API call: ${error.message}`, 'perplexity');
      
      // Check if this is a rate limit error
      const isRateLimitError = error.response?.status === 429 || 
                              (error.message && error.message.includes('rate limit'));
      
      if (isRateLimitError) {
        // Provide a helpful response about rate limits
        return res.json({ 
          response: "I'm currently experiencing high demand and have reached my usage limits. As I'm using a free API tier, I can only handle a certain number of questions per minute. Please try again in a minute or two, or ask a different question about water management for your farm.",
          rateLimited: true
        });
      }
      
      // Check if this is an API key error
      const isApiKeyError = error.response?.status === 401 || 
                          error.response?.status === 403 || 
                          (error.message && error.message.includes('auth'));
      
      if (isApiKeyError) {
        // Use fallback predefined responses based on keywords in the message
        const input = message.toLowerCase();
        let responseText = '';
        
        if (input.includes('irrigation') || input.includes('water schedule')) {
          responseText = 'For optimal irrigation, I recommend watering deeply but infrequently. This encourages roots to grow deeper and makes plants more drought-resistant. Check your soil moisture sensor readings daily and water when the level drops below 30%. Morning watering (5-7am) is best to minimize evaporation.';
        } else if (input.includes('soil moisture')) {
          responseText = 'Soil moisture readings indicate how much water is available to your plants. Optimal levels vary by crop type, but generally: 0-20% is dry (needs watering), 20-60% is ideal for most crops, and above 60% may indicate overwatering which can lead to root diseases.';
        } else if (input.includes('water quality') || input.includes('ph') || input.includes('tds')) {
          responseText = 'Water quality metrics include pH (acidity), TDS (dissolved solids), and temperature. Ideal pH ranges from 6.0-7.0 for most crops. High TDS (>1000 ppm) may indicate salinity issues. Water temperature should be close to soil temperature for optimal absorption.';
        } else if (input.includes('rice') || input.includes('paddy')) {
          responseText = 'Rice typically requires standing water during most of its growing season. The ideal water depth is 5-10cm. For soil moisture levels outside of flooding periods, maintain 70-80% saturation. Check water level daily, especially during hot weather.';
        } else if (input.includes('drought') || input.includes('conserve')) {
          responseText = 'During drought conditions, prioritize water for your most valuable crops. Use mulch to reduce evaporation, implement drip irrigation if possible, recycle household water when safe, and water at night or early morning. JalSetu sensors can help you optimize water usage.';
        } else if (input.includes('vegetable') || input.includes('garden')) {
          responseText = 'Vegetables generally need consistent moisture. Root vegetables need about 1 inch of water per week, leafy greens need more frequent watering with less volume, and fruiting vegetables like tomatoes need deep watering when the soil is dry 2 inches below the surface.';
        } else {
          responseText = "I'm having trouble accessing my AI knowledge base due to authentication issues. In the meantime, I can provide basic information about irrigation schedules, soil moisture readings, water quality metrics, and crop-specific advice. Please try asking specifically about these topics.";
        }
        
        return res.json({ 
          response: responseText,
          apiKeyError: true
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to get response from Perplexity API',
        message: error.message 
      });
    }
  } catch (error: any) {
    log(`Error in chat request: ${error.message}`, 'perplexity');
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message 
    });
  }
}