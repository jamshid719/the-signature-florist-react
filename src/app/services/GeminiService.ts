import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../lib/config";
import { COMPANY_CONTEXT } from "../../lib/companyContext";

class GeminiService {
  private chat: ChatSession;

  constructor() {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: COMPANY_CONTEXT,
    });
    this.chat = model.startChat({ history: [] });
  }

  async sendMessage(userMessage: string): Promise<string> {
    const result = await this.chat.sendMessage(userMessage);
    return result.response.text();
  }
}

export default GeminiService;
