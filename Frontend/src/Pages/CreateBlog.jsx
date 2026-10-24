import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import "highlight.js/styles/atom-one-dark.css";

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  ImagePlus,
  FileText,
  Sparkles,
  Code2,
  Braces,
  Tag,
  FolderOpen,
  Upload,
  X,
  Clock3,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../Components/Common/Loader";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const CreateBlog = () => {
  const [isPublishing, setIsPublishing] = useState(false);

  // Blog details
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  // Cover image
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imageError, setImageError] = useState("");

  // Editor statistics
  const [wordCount, setWordCount] = useState(0);

  // Form feedback
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Code snippet colors -> common programming lang ke syntax ke according colors dega
  const lowlight = createLowlight(common);

  // Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),

      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),

      Image.configure({
        allowBase64: false,
      }),

      Placeholder.configure({
        placeholder: "Start writing your story here...",
      }),
    ],

    content: "<p></p>",

    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },

    // Recalculate words whenever editor content changes
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim();

      const words = text ? text.split(/\s+/).length : 0;

      setWordCount(words);
      setFormError("");
      setFormSuccess("");
    },
  });

  // Release temporary browser image URLs when preview changes
  useEffect(() => {
    if (!coverPreview) return;

    return () => {
      URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  if (!editor) {
    return null;
  }

  // Estimated reading time: 200 words per minute
  const readTime =
    wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / 200));

  // Convert comma-separated tags into an array
  const tagsArray = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  // Toolbar button styling
  const toolbarButton = (active = false) =>
    `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 transition ${
      active
        ? "border-[#202020] bg-[#F2CB57] shadow-[2px_2px_0_#202020]"
        : "border-transparent hover:border-[#202020] hover:bg-[#FDFDF1]"
    }`;

  // Insert an image inside the article using its URL
  const insertImage = () => {
    const imageUrl = window.prompt("Enter the image URL:");

    if (imageUrl?.trim()) {
      editor.chain().focus().setImage({ src: imageUrl.trim() }).run();
    }
  };

  // Cover image selection and validation
  const handleCoverImageChange = (event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later
    event.target.value = "";

    if (!file) return;

    setImageError("");
    setFormError("");
    setFormSuccess("");

    // Only allow image files
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      return;
    }

    // Limit image size to 5 MB
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image size must be 5 MB or less.");
      return;
    }

    // Store the actual file for backend integration
    setCoverImage(file);

    // Create a temporary preview URL for the browser
    setCoverPreview(URL.createObjectURL(file));
  };

  // Remove selected cover image - using crosss button
  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverPreview("");
    setImageError("");
  };

  // Frontend validation only — no API request
  const handlePublish = async (event) => {
    event.preventDefault();

    setFormError("");
    setFormSuccess("");

    if (!title.trim()) {
      setFormError("Please enter a title for your article.");
      return;
    }

    const articleText = editor.getText().trim();

    if (!articleText) {
      setFormError("Please write some article content before publishing.");
      return;
    }

    if (title.trim().length < 3) {
      setFormError("Your title must contain at least 3 characters.");
      return;
    }

    if (articleText.length < 10) {
      setFormError("Your article content must contain at least 10 characters.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("category", category.trim());
    formData.append("content", editor.getHTML());
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("readTime", String(readTime));
    if (coverImage) {
      formData.append("image", coverImage);
    }

    try {
      setIsPublishing(true);
      const response = await api.post("/blog/create-blog", formData);
      toast.success(response.data.message || "Article published successfully!");

      // empty input feilds after successful submission
      setTitle("");
      setCategory("");
      setTags("");
      setCoverImage(null);
      setCoverPreview(null);
      setImageError("");
      editor?.commands.clearContent();
      setWordCount(0);
      
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to publish your article. Please try again.",
      );
    } finally {
      setIsPublishing(false);
    }
  };

  // To give code blocks color in the article
  const insertCodeBlock = () => {
    if (!editor) return;

    const language = window.prompt(
      "Enter language: javascript, typescript, python, html, css, json, bash, plaintext",
      "javascript",
    );

    if (language === null) return;

    const supportedLanguages = [
      "javascript",
      "typescript",
      "python",
      "html",
      "css",
      "json",
      "bash",
      "plaintext",
    ];

    const selectedLanguage = language.trim().toLowerCase();

    if (!supportedLanguages.includes(selectedLanguage)) {
      window.alert("Please enter a supported language.");
      return;
    }

    editor
      .chain()
      .focus()
      .toggleCodeBlock({
        language: selectedLanguage,
      })
      .run();
  };

  return (
    <div className="mx-auto max-w-6xl pb-12 text-[#202020]">
      {/* Page heading */}
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#F2CB57] px-3 py-1.5 text-xs font-black uppercase tracking-wider">
          <Sparkles size={14} />
          Writora Studio
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Create a Story<span className="text-[#EC5E27]">.</span>
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#777]">
          Write your ideas, share your knowledge, and tell your story.
        </p>
      </div>

      <form onSubmit={handlePublish}>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
          {/* Main form */}
          <div className="min-w-0">
            <section className="overflow-hidden rounded-2xl border-2 border-[#202020] bg-white shadow-[4px_4px_0_#202020]">
              {/* Section heading */}
              <div className="border-b-2 border-[#202020] bg-[#F2CB57] px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileText size={19} />

                  <h2 className="font-black">Your article</h2>
                </div>

                <p className="mt-1 text-xs text-[#555]">
                  Add your details and start writing.
                </p>
              </div>

              <div className="space-y-7 p-5 sm:p-7">
                {/* Blog title */}
                <div>
                  <label
                    htmlFor="blog-title"
                    className="mb-2 block text-sm font-black"
                  >
                    Blog title <span className="text-[#EC5E27]">*</span>
                  </label>

                  <input
                    id="blog-title"
                    type="text"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      setFormError("");
                      setFormSuccess("");
                    }}
                    placeholder="Give your story a great title..."
                    className="w-full rounded-xl border-2 border-[#202020] bg-[#FDFDF1] px-4 py-3 text-lg font-bold outline-none transition placeholder:font-normal placeholder:text-[#999] focus:bg-white focus:shadow-[3px_3px_0_#F2CB57]"
                  />

                  <div className="mt-2 flex justify-end">
                    <span className="text-xs text-[#888]">
                      {title.length} characters
                    </span>
                  </div>
                </div>

                {/* Category and tags */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="blog-category"
                      className="mb-2 flex items-center gap-2 text-sm font-black"
                    >
                      <FolderOpen size={16} />
                      Category
                    </label>

                    <input
                      id="blog-category"
                      type="text"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      placeholder="e.g. Programming, Comics..."
                      className="w-full rounded-xl border-2 border-[#202020] bg-[#FDFDF1] px-4 py-3 text-sm outline-none transition placeholder:text-[#999] focus:bg-white focus:shadow-[3px_3px_0_#F2CB57]"
                    />

                    <p className="mt-2 text-xs text-[#888]">
                      Create your own category.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="blog-tags"
                      className="mb-2 flex items-center gap-2 text-sm font-black"
                    >
                      <Tag size={16} />
                      Tags
                    </label>

                    <input
                      id="blog-tags"
                      type="text"
                      value={tags}
                      onChange={(event) => setTags(event.target.value)}
                      placeholder="react, coding, web dev"
                      className="w-full rounded-xl border-2 border-[#202020] bg-[#FDFDF1] px-4 py-3 text-sm outline-none transition placeholder:text-[#999] focus:bg-white focus:shadow-[3px_3px_0_#F2CB57]"
                    />

                    <p className="mt-2 text-xs text-[#888]">
                      Separate tags with commas.
                    </p>

                    {/* Tag preview */}
                    {tagsArray.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tagsArray.map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="rounded-md border border-[#202020] bg-[#D8E8D2] px-2 py-1 text-xs font-bold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover image upload */}
                <div>
                  <div className="mb-3">
                    <h3 className="flex items-center gap-2 text-sm font-black">
                      <ImagePlus size={17} />
                      Cover image
                      <span className="text-xs font-normal text-[#888]">
                        (Optional)
                      </span>
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#888]">
                      Choose the main image that represents your article.
                    </p>
                  </div>

                  {coverPreview ? (
                    /* Image preview */
                    <div className="overflow-hidden rounded-xl border-2 border-[#202020]">
                      <div className="relative">
                        <img
                          src={coverPreview}
                          alt="Selected article cover preview"
                          className="h-52 w-full object-cover sm:h-64"
                        />

                        <button
                          type="button"
                          onClick={removeCoverImage}
                          aria-label="Remove cover image"
                          title="Remove cover image"
                          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#202020] bg-white shadow-[2px_2px_0_#202020] transition hover:bg-[#F2CB57]"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FDFDF1] px-4 py-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2
                            size={17}
                            className="shrink-0 text-green-700"
                          />

                          <span className="truncate text-xs font-bold">
                            {coverImage?.name}
                          </span>
                        </div>

                        <span className="text-xs text-[#777]">
                          {(coverImage.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Image upload area */
                    <label
                      htmlFor="cover-image"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#202020] bg-[#FDFDF1] px-5 py-8 text-center transition hover:bg-[#D8E8D2]"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#202020] bg-[#F2CB57] shadow-[3px_3px_0_#202020]">
                        <Upload size={22} />
                      </div>

                      <span className="text-sm font-black">
                        Click to upload cover image
                      </span>

                      <span className="mt-2 text-xs text-[#777]">
                        Image files only · Maximum size 5 MB
                      </span>

                      <input
                        id="cover-image"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="sr-only"
                      />
                    </label>
                  )}

                  {imageError && (
                    <p className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                      <AlertCircle size={15} />
                      {imageError}
                    </p>
                  )}
                </div>

                {/* Editor toolbar */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black">Article content</h3>

                      <p className="mt-1 text-xs text-[#888]">
                        Format text, insert images, or add code snippets.
                      </p>
                    </div>

                    <span className="rounded-lg border border-[#202020] bg-[#D8E8D2] px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                      Rich text editor
                    </span>
                  </div>

                  <div className="rounded-xl border-2 border-[#202020] bg-[#F8F8F2] p-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {/* Bold */}
                      <button
                        type="button"
                        title="Bold"
                        aria-label="Bold"
                        aria-pressed={editor.isActive("bold")}
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        className={toolbarButton(editor.isActive("bold"))}
                      >
                        <Bold size={18} />
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        title="Italic"
                        aria-label="Italic"
                        aria-pressed={editor.isActive("italic")}
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        className={toolbarButton(editor.isActive("italic"))}
                      >
                        <Italic size={18} />
                      </button>

                      {/* Inline code */}
                      <button
                        type="button"
                        title="Inline code"
                        aria-label="Inline code"
                        aria-pressed={editor.isActive("code")}
                        onClick={() =>
                          editor.chain().focus().toggleCode().run()
                        }
                        className={toolbarButton(editor.isActive("code"))}
                      >
                        <Code2 size={18} />
                      </button>

                      <div className="mx-1 h-6 w-px bg-[#D5D5CC]" />

                      {/* Heading 1 */}
                      <button
                        type="button"
                        title="Heading 1"
                        aria-label="Heading 1"
                        aria-pressed={editor.isActive("heading", {
                          level: 1,
                        })}
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                        }
                        className={toolbarButton(
                          editor.isActive("heading", { level: 1 }),
                        )}
                      >
                        <Heading1 size={19} />
                      </button>

                      {/* Heading 2 */}
                      <button
                        type="button"
                        title="Heading 2"
                        aria-label="Heading 2"
                        aria-pressed={editor.isActive("heading", {
                          level: 2,
                        })}
                        onClick={() =>
                          editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                        }
                        className={toolbarButton(
                          editor.isActive("heading", { level: 2 }),
                        )}
                      >
                        <Heading2 size={19} />
                      </button>

                      <div className="mx-1 h-6 w-px bg-[#D5D5CC]" />

                      {/* Bullet list */}
                      <button
                        type="button"
                        title="Bullet list"
                        aria-label="Bullet list"
                        aria-pressed={editor.isActive("bulletList")}
                        onClick={() =>
                          editor.chain().focus().toggleBulletList().run()
                        }
                        className={toolbarButton(editor.isActive("bulletList"))}
                      >
                        <List size={19} />
                      </button>

                      {/* Ordered list */}
                      <button
                        type="button"
                        title="Numbered list"
                        aria-label="Numbered list"
                        aria-pressed={editor.isActive("orderedList")}
                        onClick={() =>
                          editor.chain().focus().toggleOrderedList().run()
                        }
                        className={toolbarButton(
                          editor.isActive("orderedList"),
                        )}
                      >
                        <ListOrdered size={19} />
                      </button>

                      {/* Blockquote */}
                      <button
                        type="button"
                        title="Blockquote"
                        aria-label="Blockquote"
                        aria-pressed={editor.isActive("blockquote")}
                        onClick={() =>
                          editor.chain().focus().toggleBlockquote().run()
                        }
                        className={toolbarButton(editor.isActive("blockquote"))}
                      >
                        <Quote size={18} />
                      </button>

                      {/* Code block with language selection + syntax highlighting */}
                      <button
                        type="button"
                        title="Insert code block with syntax highlighting"
                        aria-label="Insert code block with syntax highlighting"
                        aria-pressed={editor.isActive("codeBlock")}
                        onClick={insertCodeBlock}
                        className={toolbarButton(editor.isActive("codeBlock"))}
                      >
                        <Braces size={18} />
                      </button>

                      {/* Insert image inside article */}
                      <button
                        type="button"
                        title="Insert image by URL"
                        aria-label="Insert image"
                        onClick={insertImage}
                        className={toolbarButton(false)}
                      >
                        <ImagePlus size={18} />
                      </button>

                      {/* Undo / redo */}
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          type="button"
                          title="Undo"
                          aria-label="Undo"
                          disabled={!editor.can().undo()}
                          onClick={() => editor.chain().focus().undo().run()}
                          className={`${toolbarButton()} disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          <Undo2 size={18} />
                        </button>

                        <button
                          type="button"
                          title="Redo"
                          aria-label="Redo"
                          disabled={!editor.can().redo()}
                          onClick={() => editor.chain().focus().redo().run()}
                          className={`${toolbarButton()} disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          <Redo2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 border-t border-[#DEDED5] px-2 pt-2">
                      <Braces size={14} className="text-[#EC5E27]" />

                      <p className="text-[11px] leading-5 text-[#777]">
                        Select text for formatting. Use the {"</>"} button to
                        create a multi-line code block.
                      </p>
                    </div>
                  </div>

                  {/* Writing canvas */}
                  <div className="mt-3 overflow-hidden rounded-xl border-2 border-[#202020] bg-white">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#202020] bg-[#FDFDF1] px-4 py-3">
                      <span className="text-xs font-black tracking-wider">
                        WRITING CANVAS
                      </span>

                      <span className="text-[10px] font-bold text-[#888]">
                        YOUR STORY STARTS HERE
                      </span>
                    </div>

                    <div className="min-h-[450px] px-5 py-5 sm:px-8 sm:py-7">
                      <EditorContent editor={editor} />
                    </div>
                  </div>

                  {/* Word count and reading time */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-[#202020] bg-[#FDFDF1] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={17} className="text-[#EC5E27]" />

                      <span className="text-sm font-bold">
                        {wordCount} {wordCount === 1 ? "word" : "words"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={17} />

                      <span className="text-sm font-bold">
                        {readTime} min read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form feedback */}
                {formError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border-2 border-red-700 bg-red-50 p-4 text-sm font-semibold text-red-700"
                  >
                    <AlertCircle size={19} className="mt-0.5 shrink-0" />

                    <p>{formError}</p>
                  </div>
                )}

                {formSuccess && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border-2 border-green-800 bg-[#D8E8D2] p-4 text-sm font-semibold text-green-900"
                  >
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

                    <p>{formSuccess}</p>
                  </div>
                )}

                {/* Publish action */}
                <div className="border-t-2 border-dashed border-[#D5D5CC] pt-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm font-black">
                        Ready to share your story?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#777]">
                        Review your article before publishing.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isPublishing}
                      onClick={handlePublish}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#202020] bg-[#EC5E27] px-6 py-3 font-black text-white shadow-[4px_4px_0_#202020] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#202020] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                    >
                      {isPublishing ? (
                        <>
                          <Loader text="Publishing..." />
                        </>
                      ) : (
                        <>
                          <BookOpen size={18} />
                          Publish Story
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 text-xs leading-5 text-[#888]">
                    Publishing is not connected yet. Your article will not be
                    sent to the server until you integrate the backend.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <section className="rounded-2xl border-2 border-[#202020] bg-white p-5 shadow-[4px_4px_0_#202020]">
              <div className="flex items-center gap-2">
                <Sparkles size={19} className="text-[#EC5E27]" />

                <h2 className="font-black">Editor guide</h2>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#F2CB57]">
                    <Bold size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black">Text formatting</p>

                    <p className="mt-1 text-xs leading-5 text-[#777]">
                      Emphasize ideas with bold, italic, and headings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#D8E8D2]">
                    <Braces size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black">Code snippets</p>

                    <p className="mt-1 text-xs leading-5 text-[#777]">
                      Use inline code for short expressions and code blocks for
                      complete examples.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#FDFDF1]">
                    <ImagePlus size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black">Article images</p>

                    <p className="mt-1 text-xs leading-5 text-[#777]">
                      Use the image button to insert an image into your article
                      using its URL.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#D8E8D2]">
                    <Clock3 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-black">Reading time</p>

                    <p className="mt-1 text-xs leading-5 text-[#777]">
                      Estimated reading time updates as you write.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Writing tip */}
            <section className="rounded-2xl border-2 border-[#202020] bg-[#D8E8D2] p-5 shadow-[4px_4px_0_#202020]">
              <div className="flex items-center gap-2">
                <FileText size={19} />

                <h3 className="font-black">A writing tip</h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#555]">
                Break your article into sections. Use headings to organize your
                ideas and code blocks to make technical examples easier to read.
              </p>
            </section>

            {/* Current article stats */}
            <section className="rounded-2xl border-2 border-[#202020] bg-[#F2CB57] p-5 shadow-[4px_4px_0_#202020]">
              <h3 className="font-black">Your article at a glance</h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Words</span>

                  <span className="font-black">{wordCount}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Reading time</span>

                  <span className="font-black">{readTime} min</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Tags</span>

                  <span className="font-black">{tagsArray.length}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">Cover image</span>

                  <span className="font-black">
                    {coverImage ? "Added" : "Not added"}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </form>

      {/* Tiptap styles */}
      <style>{`
        .tiptap-content {
          min-height: 390px;
          outline: none;
          color: #202020;
          line-height: 1.85;
          overflow-wrap: anywhere;
        }

        .tiptap-content p {
          margin: 0 0 1rem;
        }

        .tiptap-content h1 {
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 900;
          margin: 1.5rem 0 1rem;
        }

        .tiptap-content h2 {
          font-size: 1.5rem;
          line-height: 1.35;
          font-weight: 800;
          margin: 1.4rem 0 0.8rem;
        }

        .tiptap-content h3 {
          font-size: 1.2rem;
          font-weight: 800;
          margin: 1.2rem 0 0.7rem;
        }

        .tiptap-content ul,
        .tiptap-content ol {
          padding-left: 1.5rem;
          margin: 0 0 1rem;
        }

        .tiptap-content ul {
          list-style: disc;
        }

        .tiptap-content ol {
          list-style: decimal;
        }

        .tiptap-content blockquote {
          border-left: 4px solid #EC5E27;
          padding-left: 1rem;
          margin: 1.25rem 0;
          color: #666;
          font-style: italic;
        }

        .tiptap-content code {
          background: #F2CB57;
          border: 1px solid #202020;
          border-radius: 5px;
          padding: 2px 5px;
          font-family: monospace;
          font-size: 0.9em;
        }

        /* Multi-line code block: dark surface + syntax token colors from highlight.js */
        .tiptap-content pre {
          background: #282c34;
          color: #abb2bf;
          border: 2px solid #202020;
          border-radius: 12px;
          padding: 1rem;
          margin: 1.25rem 0;
          overflow-x: auto;
          white-space: pre;
          tab-size: 2;
        }

        .tiptap-content pre code,
        .tiptap-content pre code.hljs {
          display: block;
          background: transparent;
          color: inherit;
          border: none;
          border-radius: 0;
          padding: 0;
          font-family: "Fira Code", "Courier New", monospace;
          font-size: 0.875rem;
          line-height: 1.8;
          white-space: pre;
        }

        /* Keep inline code visually distinct without affecting code-block tokens. */
        .tiptap-content :not(pre) > code {
          background: #F2CB57;
          border: 1px solid #202020;
          border-radius: 5px;
          padding: 2px 5px;
          font-family: "Fira Code", "Courier New", monospace;
          font-size: 0.9em;
        }

        .tiptap-content img {
          display: block;
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.25rem auto;
        }

        .tiptap-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #aaa;
          pointer-events: none;
          height: 0;
        }

        @media (max-width: 640px) {
          .tiptap-content h1 {
            font-size: 1.7rem;
          }

          .tiptap-content h2 {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;
