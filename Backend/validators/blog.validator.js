import { z } from 'zod';

export const createBlogSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be of 3 characters'),

    content: z
        .string()
        .min(10, 'Title must be of 10 characters'),

    image: z
        .string()
        .optional(),

    category: z
        .string()
        .optional(),

    tags: z
        .array(z.string())
        .optional(),

    readTime: z
        .string()
});

export const updateBlogSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be of 3 characters'),

    content: z
        .string()
        .min(10, 'Title must be of 10 characters'),

    image: z
        .string()
        .optional(),

    category: z
        .string()
        .optional(),

    tags: z
        .array(z.string())
        .optional()
});

