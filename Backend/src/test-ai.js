
import "dotenv/config";
import { generateAIContent } from "./services/ai.services.js";

async function testAI() {
  try {
    const result = await generateAIContent(
      "Explain Node.js in 3 simple sentences."
    );

    console.log("AI Response:");
    console.log(result);
  } catch (error) {
    console.error("AI request failed:", error.message);
  }
}

testAI();
