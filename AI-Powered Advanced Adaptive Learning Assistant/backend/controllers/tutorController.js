const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ensure GEMINI_API_KEY is in .env

const getAIResponse = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ Ensure correct model
    const result = await model.generateContent(query);
    const response = await result.response;

    console.log("Gemini API Raw Response:", response);

    // ✅ Extract AI-generated text safely
    const aiMessage = response.text ? await response.text() : "No recommendations found.";
    
    return aiMessage;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm having trouble processing your request. Please try again.";
  }
};

const handleTutorQuery = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  const aiResponse = await getAIResponse(query);
  res.json({ answer: aiResponse });
};

module.exports = { handleTutorQuery };
