import chatbotData from "@/data/chatbot.json";

interface Intent {
  id: string;
  keywords: string[];
  phrases: string[];
  answer: string;
}

export class ChatbotEngine {
  private intents: Intent[];
  private fallback: string;
  private greetings: { keywords: string[]; answer: string };

  constructor() {
    this.intents = chatbotData.intents;
    this.fallback = chatbotData.fallback;
    this.greetings = chatbotData.greetings;
  }

  public getResponse(input: string): string {
    const normalizedInput = input.toLowerCase().trim();
    const tokens = this.tokenize(normalizedInput);

    if (tokens.length === 0) return "Please say something!";

    // Check for greetings first
    if (this.isGreeting(tokens)) {
      return this.greetings.answer;
    }

    // Score each intent
    const scores = this.intents.map((intent) => ({
      intent,
      score: this.calculateScore(normalizedInput, tokens, intent),
    }));

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    const bestMatch = scores[0];

    // Minimum threshold for matching
    if (bestMatch.score > 0.1) {
      return bestMatch.intent.answer;
    }

    return this.fallback;
  }

  private tokenize(text: string): string[] {
    return text
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter((token) => token.length > 2); // Filter out very short words
  }

  private isGreeting(tokens: string[]): boolean {
    return tokens.some((token) => this.greetings.keywords.includes(token));
  }

  private calculateScore(input: string, tokens: string[], intent: Intent): number {
    let score = 0;

    // 1. Keyword matching (High weight)
    const keywordMatches = tokens.filter((token) => intent.keywords.includes(token));
    score += (keywordMatches.length / tokens.length) * 0.5;

    // 2. Phrase matching (Highest weight if exact or near exact)
    const phraseMatches = intent.phrases.some((phrase) => {
      const normalizedPhrase = phrase.toLowerCase();
      return normalizedPhrase.includes(input) || input.includes(normalizedPhrase);
    });
    if (phraseMatches) score += 0.7;

    // 3. Token similarity with phrases
    intent.phrases.forEach((phrase) => {
      const phraseTokens = this.tokenize(phrase.toLowerCase());
      const commonTokens = tokens.filter((token) => phraseTokens.includes(token));
      const similarity = commonTokens.length / Math.max(tokens.length, phraseTokens.length);
      score += similarity * 0.3;
    });

    return score;
  }
}

export const chatbotEngine = new ChatbotEngine();
