import {z} from "zod";

// Validate the data coming from the frontend
export const writeBlogSchema = z.object({
  topic: z.string().trim().min(3).max(200),
  language: z.string().trim().min(2).max(50).optional(),
  tone: z.string().trim().min(2).max(50).optional(),
});