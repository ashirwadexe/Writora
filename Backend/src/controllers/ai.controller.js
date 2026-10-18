import Blog from "../models/blog.model.js";
import { generateAIContent } from "../services/ai.services.js";
import { writeBlogSchema } from "../validators/ai.validator.js";

// POST: /api/ai/write-blog
export const generateBlog = async (req, res) => {
  try {
    const result = writeBlogSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(401).json({
        message: "validation failed!",
        success: false,
      });
    }

    const { topic, language = "English", tone = "Informative" } = result.data;

    const prompt = `
      You are a professional blog writer for Writora.

      Write an original blog about: ${topic}

      Language: ${language}
      Tone: ${tone}

      Requirements:
      - Start with a suitable blog title.
      - Include an introduction.
      - Use clear headings and subheadings.
      - Explain the topic in simple, useful language.
      - End with a conclusion.
      - Do not invent facts or statistics.
      - Return the blog content in readable Markdown.
    `;

    const content = await generateAIContent(prompt);

    return res.status(201).json({
        message: "Blog generated successfully!",
        success: true,
        data: {
            topic,
            content
        }
    });

  } catch (error) {
    console.error("AI blog generation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to generate the blog right now.",
    });
  }
};

// POST: /api/ai/summarize/:blogId
export const summarizeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId).select("title content");
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found!",
        success: false,
      });
    }

    const prompt = `
      You are an expert article summarizer.

      Summarize the following blog in simple English.

      Requirements:
      - Keep the summary concise.
      - Include the main ideas and important takeaways.
      - Do not add information that is not in the article.
      - Use clear, readable language.

      Blog title: ${blog.title}

      Blog content:
      ${blog.content}
    `;

    const summary = await generateAIContent(prompt);

    return res.status(201).json({
      message: "Summary generated successful!",
      success: true,
      data: {
        blogId: blog._id,
        title: blog.title,
        summary,
      },
    });
  } catch (error) {
    console.error("AI summary failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to generate summary right now.",
    });
  }
};
