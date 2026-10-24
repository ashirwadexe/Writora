import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  RefreshCw,
  Tag,
  Zap,
} from "lucide-react";
import api from "../api/axios";

const BlogDetails = () => {
  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // to provide colors to code snippet
  const contentRef = useRef(null);
  useEffect(() => {
    const codeBlocks = contentRef.current?.querySelectorAll("pre code");

    codeBlocks?.forEach((block) => {
      delete block.dataset.highlighted;
      hljs.highlightElement(block);
    });
  }, [blog?.content]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get(`/blog/${blogId}`);
        setBlog(response.data.blog);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "We couldn't load this article. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    } else {
      setError("Invalid article URL.");
      setIsLoading(false);
    }
  }, [blogId]);

  const publishedDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const authorName =
    typeof blog?.author === "object"
      ? blog.author?.name || blog.author?.username
      : null;

  // Refresh button
  const retryFetch = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await api.get(`/blog/${blogId}`);
      setBlog(response.data.blog);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load this article.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state UI
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FDFDF1] px-5 py-12 text-[#202020]">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-12 h-10 w-36 border-2 border-[#202020] bg-white shadow-[4px_4px_0px_#202020]" />
          <div className="mb-6 h-7 w-32 border-2 border-[#202020] bg-[#F2CB57]" />
          <div className="mb-4 h-12 max-w-3xl bg-[#E9E7D8]" />
          <div className="mb-8 h-12 max-w-xl bg-[#E9E7D8]" />
          <div className="mb-10 aspect-[16/8] border-2 border-[#202020] bg-[#E9E7D8] shadow-[7px_7px_0px_#202020]" />
          <div className="mb-4 h-4 bg-[#E9E7D8]" />
          <div className="mb-4 h-4 bg-[#E9E7D8]" />
          <div className="h-4 w-4/5 bg-[#E9E7D8]" />
        </div>
      </main>
    );
  }

  // Error state UI
  if (error || !blog) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#FDFDF1] px-5 py-16 text-[#202020]">
        <div className="w-full max-w-md border-2 border-[#202020] bg-white p-8 text-center shadow-[7px_7px_0px_#202020]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
            <BookOpen size={26} />
          </div>

          <h1 className="text-3xl font-black tracking-tight">
            {error ? "Oops! Story missing." : "Story not found."}
          </h1>

          <p className="mt-3 text-sm font-medium leading-6 text-[#68645B]">
            {error || "This article may have been removed."}
          </p>

          {error && (
            <button
              onClick={retryFetch}
              className="mt-6 inline-flex items-center gap-2 border-2 border-[#202020] bg-[#F2CB57] px-5 py-3 font-black shadow-[3px_3px_0px_#202020] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#202020]"
            >
              <RefreshCw size={17} />
              Try again
            </button>
          )}

          <div>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-black underline decoration-[#EC5E27] decoration-2 underline-offset-4"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FDFDF1] text-[#202020]">
      {/* Top navigation */}
      <header className="border-b-2 border-[#202020]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
              <BookOpen size={21} strokeWidth={2.5} color="#FDFDF1" />
            </span>
            <span className="text-2xl font-black tracking-tight">
              writora<span className="text-[#EC5E27]">.</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 border-2 border-[#202020] bg-white px-4 py-2.5 text-sm font-black shadow-[3px_3px_0px_#202020] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#202020]"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">All stories</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      {/* Article heading */}
      <section className="border-b-2 border-[#202020]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          {/* Category, date and reading time ABOVE title */}
          <div className="mb-5 flex w-full flex-nowrap items-center gap-1.5 sm:mb-6 sm:gap-3">
            <span
              title={blog.category || "Featured story"}
              className="inline-flex min-w-0 max-w-[42%] shrink items-center gap-1 overflow-hidden border-2 border-[#202020] bg-[#F2CB57] px-1.5 py-2 text-[9px] font-black uppercase tracking-tight shadow-[2px_2px_0px_#202020] sm:max-w-none sm:shrink-0 sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-wider sm:shadow-[3px_3px_0px_#202020]"
            >
              <Zap
                size={12}
                strokeWidth={2.5}
                className="shrink-0 sm:h-[14px] sm:w-[14px]"
              />
              <span className="truncate">
                {blog.category || "Featured story"}
              </span>
            </span>

            {publishedDate && (
              <span className="inline-flex shrink-0 items-center gap-1 border-2 border-[#202020] bg-white px-1.5 py-2 text-[9px] font-black whitespace-nowrap sm:gap-2 sm:px-3 sm:text-[11px]">
                <CalendarDays
                  size={12}
                  className="shrink-0 sm:h-[14px] sm:w-[14px]"
                />
                {publishedDate}
              </span>
            )}

            {blog.readTime && (
              <span className="inline-flex shrink-0 items-center gap-1 border-2 border-[#202020] bg-white px-1.5 py-2 text-[9px] font-black whitespace-nowrap sm:gap-2 sm:px-3 sm:text-[11px]">
                <Clock3
                  size={12}
                  className="shrink-0 sm:h-[14px] sm:w-[14px]"
                />
                {blog.readTime} min
              </span>
            )}
          </div>

          {/* Existing Writora reads badge */}
          <h1 className="max-w-5xl break-words text-4xl font-black leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[76px]">
            {blog.title}
          </h1>

          {/* Author information only */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t-2 border-dashed border-[#202020]/30 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-[#202020] bg-[#EC5E27] text-md font-black text-white">
                {authorName?.charAt(0).toUpperCase() || "W"}
              </div>

              <div>
                <p className="text-xs font-bold text-[#68645B]">Written by</p>
                <p className="text-sm font-black">
                  {authorName || "Writora Author"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {blog.image && (
        <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10">
          <div className="relative border-2 border-[#202020] bg-[#F2CB57] p-2 shadow-[6px_6px_0px_#202020] sm:p-3 sm:shadow-[9px_9px_0px_#202020]">
            <img
              src={blog.image}
              alt={blog.title || "Blog cover"}
              className="aspect-[4/3] max-h-[580px] min-h-0 w-full border border-[#202020]/20 object-cover sm:aspect-[16/9] sm:max-h-[580px]"
            />
            <span className="absolute bottom-5 left-5 border-2 border-[#202020] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider sm:bottom-7 sm:left-7">
              The story starts here
            </span>
          </div>
        </section>
      )}

      {/* Reading area */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:px-10">
        <article className="min-w-0">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
              <BookOpen size={18} strokeWidth={2.5} color="#FDFDF1" />
            </span>
            <span className="text-xs font-black uppercase tracking-[0.18em]">
              Into the story
            </span>
            <span className="h-0 flex-1 border-t-2 border-dashed border-[#202020]/30" />
          </div>

          <article
            ref={contentRef}
            className="tiptap-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.content || ""),
            }}
          />
          {/* Content CSS for tiptap editor */}
          <style>
            {`.tiptap-content {
              line-height: 1.85;
              overflow-wrap: anywhere;
            }

            .tiptap-content p {
              margin-bottom: 1.25rem;
            }

            .tiptap-content pre {
              overflow-x: auto;
              padding: 1.25rem;
              margin: 1.5rem 0;
              border: 2px solid #202020;
              border-radius: 12px;
              background: #202020;
              color: #fdfdf1;
            }

            .tiptap-content pre code {
              background: transparent;
              color: inherit;
              border: none;
              padding: 0;
            }

            .tiptap-content blockquote {
              margin: 1.5rem 0;
              padding: 0.75rem 1rem;
              border-left: 4px solid #ec5e27;
              background: #fdf5e9;
            }

            .tiptap-content img {
              max-width: 100%;
              height: auto;
              border-radius: 12px;
            }`}
          </style>

          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="mt-12 border-t-2 border-[#202020] pt-6">
              <div className="mb-4 flex items-center gap-2">
                <Tag size={18} strokeWidth={2.5} />
                <h2 className="text-sm font-black uppercase tracking-wider">
                  Topics covered
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="border-2 border-[#202020] bg-white px-3 py-2 text-sm font-bold shadow-[3px_3px_0px_#202020] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#F2CB57] hover:shadow-[1px_1px_0px_#202020]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Compact reading info */}
        <aside className="h-fit border-2 border-[#202020] bg-white p-5 shadow-[5px_5px_0px_#202020] lg:sticky lg:top-8">
          <div className="flex items-center gap-2 border-b-2 border-[#202020] pb-4">
            <span className="flex h-8 w-8 items-center justify-center border-2 border-[#202020] bg-[#F2CB57]">
              <BookOpen size={17} strokeWidth={2.5} />
            </span>
            <h2 className="font-black">The quick read</h2>
          </div>

          <div className="space-y-4 py-5">
            {blog.category && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#77736A]">
                  Category
                </p>
                <p className="mt-1 text-sm font-bold">{blog.category}</p>
              </div>
            )}

            {blog.readTime && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#77736A]">
                  Reading time
                </p>
                <p className="mt-1 text-sm font-bold">
                  {blog.readTime} minutes
                </p>
              </div>
            )}

            {publishedDate && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#77736A]">
                  Published
                </p>
                <p className="mt-1 text-sm font-bold">{publishedDate}</p>
              </div>
            )}
          </div>

          <div className="border-2 border-[#202020] bg-[#F2CB57] p-4">
            <p className="text-lg font-black leading-tight">Got an idea?</p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#4D4634]">
              Turn your thoughts into your next story.
            </p>
            <Link
              to="/signup"
              className="mt-4 inline-flex items-center gap-2 text-xs font-black underline decoration-[#EC5E27] decoration-2 underline-offset-4"
            >
              Start writing <ArrowUpRight size={15} />
            </Link>
          </div>
        </aside>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t-2 border-[#202020] bg-[#202020] text-[#FDFDF1]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div>
            <p className="text-2xl font-black tracking-tight">
              writora<span className="text-[#EC5E27]">.</span>
            </p>
            <p className="mt-2 text-sm font-medium text-white/65">
              Ideas worth reading. Stories worth writing.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 border-2 border-[#FDFDF1] bg-[#EC5E27] px-5 py-3 text-sm font-black text-[#202020] transition hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Explore more stories
            <ArrowUpRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default BlogDetails;
