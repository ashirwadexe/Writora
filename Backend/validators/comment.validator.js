import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(3, "Comment must be atleast 3 characters long.")
    .max(500, "Comment should not be more than 500 characters long."),
});
