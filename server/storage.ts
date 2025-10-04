import { type Idea, type InsertIdea } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getIdeas(): Promise<Idea[]>;
  getIdea(id: string): Promise<Idea | undefined>;
  createIdea(idea: InsertIdea): Promise<Idea>;
  updateIdea(id: string, idea: Partial<InsertIdea>): Promise<Idea | undefined>;
  deleteIdea(id: string): Promise<boolean>;
  reorderIdeas(ids: string[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private ideas: Map<string, Idea>;

  constructor() {
    this.ideas = new Map();
  }

  async getIdeas(): Promise<Idea[]> {
    return Array.from(this.ideas.values()).sort((a, b) => a.order - b.order);
  }

  async getIdea(id: string): Promise<Idea | undefined> {
    return this.ideas.get(id);
  }

  async createIdea(insertIdea: InsertIdea): Promise<Idea> {
    const id = randomUUID();
    const idea: Idea = { ...insertIdea, id };
    this.ideas.set(id, idea);
    return idea;
  }

  async updateIdea(id: string, updates: Partial<InsertIdea>): Promise<Idea | undefined> {
    const idea = this.ideas.get(id);
    if (!idea) return undefined;
    
    const updatedIdea = { ...idea, ...updates };
    this.ideas.set(id, updatedIdea);
    return updatedIdea;
  }

  async deleteIdea(id: string): Promise<boolean> {
    return this.ideas.delete(id);
  }

  async reorderIdeas(ids: string[]): Promise<void> {
    ids.forEach((id, index) => {
      const idea = this.ideas.get(id);
      if (idea) {
        this.ideas.set(id, { ...idea, order: index });
      }
    });
  }
}

export const storage = new MemStorage();
