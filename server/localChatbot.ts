import { Request, Response } from 'express';
import { log } from './vite';

// Database of farming and water management knowledge
const knowledgeBase = {
  irrigation: [
    "For optimal irrigation, water deeply but infrequently. This encourages roots to grow deeper and makes plants more drought-resistant.",
    "Morning watering (5-7am) is best to minimize evaporation and fungal problems.",
    "Check soil moisture sensors daily and water when the level drops below 30% for most crops.",
    "Drip irrigation is 30-50% more efficient than sprinkler systems for most crops.",
    "For row crops, consider furrow irrigation to direct water exactly where needed."
  ],
  
  soilMoisture: [
    "Soil moisture readings indicate how much water is available to your plants.",
    "Optimal levels vary by crop type, but generally: 0-20% is dry (needs watering), 20-60% is ideal for most crops, and above 60% may indicate overwatering.",
    "Sandy soils drain quickly and need more frequent watering, while clay soils retain moisture longer.",
    "Use mulch to help retain soil moisture and reduce evaporation.",
    "Consistent soil moisture is more important than frequent watering for most crops."
  ],
  
  waterQuality: [
    "Key water quality metrics include pH (acidity), TDS (dissolved solids), and temperature.",
    "Ideal pH ranges from 6.0-7.0 for most crops. Adjust with agricultural lime to raise pH or sulfur to lower it.",
    "High TDS (>1000 ppm) may indicate salinity issues which can damage plants.",
    "Water temperature should be close to soil temperature for optimal absorption.",
    "If using well water, test regularly for contaminants that could affect plant health."
  ],
  
  cropSpecific: {
    rice: "Rice typically requires standing water during most of its growing season. The ideal water depth is 5-10cm. For soil moisture levels outside of flooding periods, maintain 70-80% saturation.",
    wheat: "Wheat is sensitive to both over and under-watering. Maintain soil moisture at 50-60% during the vegetative stage and 40-50% during grain filling.",
    cotton: "Cotton needs consistent moisture during bud development and flowering. Water stress during this period can reduce yields by 30%.",
    vegetables: "Vegetables generally need consistent moisture. Root vegetables need about 1 inch of water per week, leafy greens need more frequent watering with less volume.",
    fruits: "Fruit trees need deep watering to encourage deep root growth. Water deeply once every 7-14 days depending on soil type and weather."
  },
  
  conservation: [
    "During drought, prioritize water for your most valuable crops.",
    "Use mulch to reduce evaporation by up to 70%.",
    "Implement drip irrigation if possible, which can save 30-50% of water compared to overhead sprinklers.",
    "Recycle household water (greywater) when safe for non-food crops.",
    "Water at night or early morning to minimize evaporation."
  ],
  
  weatherPredictions: [
    "Use weather forecasts to plan irrigation. Skip watering if rain is predicted within 24 hours.",
    "Wind increases evaporation rates. Avoid irrigation on windy days if possible.",
    "During heat waves, increase watering frequency but not necessarily volume.",
    "In cooler weather, reduce watering as evaporation and plant uptake decreases.",
    "Consider installing a rain gauge or weather station for more accurate local measurements."
  ]
};

// Helper function to get relevant information based on query keywords
function getRelevantInfo(query: string): string {
  query = query.toLowerCase();
  
  // Check for topics in the knowledge base
  let responses: string[] = [];
  
  if (query.includes('irrigation') || query.includes('watering') || query.includes('water schedule')) {
    responses = responses.concat(knowledgeBase.irrigation);
  }
  
  if (query.includes('soil') || query.includes('moisture')) {
    responses = responses.concat(knowledgeBase.soilMoisture);
  }
  
  if (query.includes('quality') || query.includes('ph') || query.includes('tds')) {
    responses = responses.concat(knowledgeBase.waterQuality);
  }
  
  if (query.includes('drought') || query.includes('save') || query.includes('conserve')) {
    responses = responses.concat(knowledgeBase.conservation);
  }
  
  if (query.includes('weather') || query.includes('forecast') || query.includes('prediction')) {
    responses = responses.concat(knowledgeBase.weatherPredictions);
  }
  
  // Check for specific crops
  if (query.includes('rice') || query.includes('paddy')) {
    responses.push(knowledgeBase.cropSpecific.rice);
  }
  
  if (query.includes('wheat')) {
    responses.push(knowledgeBase.cropSpecific.wheat);
  }
  
  if (query.includes('cotton')) {
    responses.push(knowledgeBase.cropSpecific.cotton);
  }
  
  if (query.includes('vegetable') || query.includes('garden')) {
    responses.push(knowledgeBase.cropSpecific.vegetables);
  }
  
  if (query.includes('fruit') || query.includes('tree')) {
    responses.push(knowledgeBase.cropSpecific.fruits);
  }
  
  // If no specific topic is found, provide general information
  if (responses.length === 0) {
    responses = [
      "I can help with questions about irrigation, soil moisture, water quality, crop-specific water needs, water conservation, and weather impacts on farming.",
      "For specific advice, try asking about irrigation schedules, soil moisture readings, water quality metrics, or how to conserve water during droughts.",
      "I have information about water requirements for crops like rice, wheat, cotton, vegetables, and fruit trees. Which would you like to know about?"
    ];
  }
  
  // Select relevant information (up to 3 points)
  let selectedResponses = responses.slice(0, Math.min(3, responses.length));
  
  // Combine the responses into a coherent paragraph
  return selectedResponses.join(' ');
}

// Handle chat requests
export async function handleLocalChat(req: Request, res: Response) {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Generate a response based on the message content
    const responseText = getRelevantInfo(message);
    
    // Return the response
    return res.json({ 
      response: responseText
    });
    
  } catch (error: any) {
    log(`Error in local chat: ${error.message}`, 'localChat');
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      message: error.message 
    });
  }
}