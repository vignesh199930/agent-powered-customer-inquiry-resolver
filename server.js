const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Knowledge Base
const knowledgeBase = {
  Pricing: {
    keywords: ["price", "pricing", "cost", "plan", "payment", "subscription"],
    information:
      "Our pricing plans vary based on customer requirements and selected services. Please contact our sales team for detailed pricing information."
  },

  "Technical Support": {
    keywords: [
      "error",
      "issue",
      "problem",
      "bug",
      "technical",
      "not working",
      "failed"
    ],
    information:
      "Our technical support team can help resolve technical issues. Please provide the error message or describe the problem in detail."
  },

  "Account Management": {
    keywords: [
      "account",
      "login",
      "password",
      "profile",
      "reset",
      "sign in",
      "username"
    ],
    information:
      "For account-related assistance, you can reset your password or contact our account management team for further support."
  },

  "General Information": {
    keywords: [],
    information:
      "Thank you for contacting us. Please provide more details about your inquiry, and our team will be happy to assist you."
  }
};

// Classify the inquiry
function classifyInquiry(inquiry) {
  const normalizedInquiry = inquiry.toLowerCase();

  for (const [topic, data] of Object.entries(knowledgeBase)) {
    if (topic === "General Information") {
      continue;
    }

    const matchedKeyword = data.keywords.find((keyword) =>
      normalizedInquiry.includes(keyword)
    );

    if (matchedKeyword) {
      return {
        topic,
        matchedKeyword
      };
    }
  }

  return {
    topic: "General Information",
    matchedKeyword: null
  };
}

// Generate response
function generateResponse(topic) {
  const information = knowledgeBase[topic].information;

  return `Thank you for your inquiry. ${information}`;
}

// API Endpoint
app.post("/api/inquire", (req, res) => {
  const { inquiry } = req.body;

  // Validation
  if (!inquiry || typeof inquiry !== "string" || inquiry.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid inquiry."
    });
  }

  // Agent workflow
  const classification = classifyInquiry(inquiry);
  const response = generateResponse(classification.topic);

  res.status(200).json({
    success: true,
    inquiry,
    topic: classification.topic,
    matchedKeyword: classification.matchedKeyword,
    response
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});