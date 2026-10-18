import Blog from "../models/blog.model.js";
import { generateAIContent } from "../services/ai.services.js";
import { writeBlogSchema } from "../validators/ai.validator.js";

// Generate a blog using AI
export const generateBlog = async (req, res) => {
  try {
    // Step 1: Validate user input
    const validation = writeBlogSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid blog topic.",
      });
    }

    const {
      topic,
      language = "English",
      tone = "Informative",
    } = validation.data;

    // Step 2: Prepare instructions for the AI
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

    // Step 3: Ask the AI service to generate the blog
    const content = await generateAIContent(prompt);

    // Step 4: Send the generated content to the frontend
    return res.status(200).json({
      success: true,
      message: "Blog generated successfully.",
      data: {
        topic,
        content,
      },
    });
  } catch (error) {
    console.error("AI blog generation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to generate the blog right now.",
    });
  }
};


export const summarizeBlog = async (req, res) => {
  try {
    // 1. Get the blog ID from the URL
    const { blogId } = req.params;

    // 2. Find the existing blog in MongoDB
    const blog = await Blog.findById(blogId).select("title content");
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // 3. Prepare the summary prompt
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

    // 4. Generate the summary using our existing AI service
    const summary = await generateAIContent(prompt);

    // 5. Return the summary to the frontend
    return res.status(200).json({
      success: true,
      message: "Summary generated successfully.",
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
