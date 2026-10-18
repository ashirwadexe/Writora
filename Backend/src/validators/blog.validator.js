import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be of 3 characters"),

  content: z.string().min(10, "Title must be of 10 characters"),

  image: z.string().optional(),

  category: z.string().optional(),

  tags: z.array(z.string()).optional(),

  readTime: z.number().min(1, "Read time must be at least 1 minute"),
});

// PATCH: Only validating the fields the client wants to update.
export const updateBlogSchema = createBlogSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update the blog",
  });