
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import api from "../../api/axios";
import BlogCard from "./BlogCard";

const BlogSection = ({ search, page, onPageChange }) => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get("/blog", {
          params: {
            page,
            search,
          },
        });

        setBlogs(response.data.blogs);
        setPagination(response.data.pagination);
      } catch (err) {
        setError("We couldn't load the stories. Please try again.");
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [search, page, retryCount]);

  const totalPages = pagination?.totalPages || 0;

  return (
    <section
      id="blogs"
      className="border-b-2 border-[#202020] bg-[#FDFDF1] px-4 py-14 text-[#202020] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section intro */}
        <div className="flex flex-col justify-between gap-6 border-b-2 border-[#202020] pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border-2 border-[#202020] bg-[#F2CB57] px-3 py-2 shadow-[3px_3px_0px_#202020]">
              <Sparkles size={15} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                Explore the journal
              </span>
            </div>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl md:text-6xl">
              Stories worth
              <br />
              <span className="text-[#EC5E27]">your time.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm font-medium leading-6 text-[#55534E] sm:text-base sm:leading-7">
              Discover fresh perspectives, explore ideas that matter,
              and find your next favourite read.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:pb-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
              <BookOpen size={21} strokeWidth={2.5} color="#FDFDF1" />
            </div>

            <div>
              <p className="text-sm font-black">
                {pagination
                  ? `${pagination.totalBlogs} stories`
                  : "The Writora Journal"}
              </p>
              <p className="mt-0.5 text-xs font-semibold text-[#68645B]">
                Ideas to read and share
              </p>
            </div>
          </div>
        </div>

        {/* Results heading */}
        <div className="flex flex-wrap items-end justify-between gap-3 py-7">
          <div>
            <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
              {search ? "Search results." : "Freshly published."}
            </h3>

            {search && (
              <p className="mt-2 text-sm font-medium text-[#68645B]">
                Showing stories for "{search}"
              </p>
            )}
          </div>

          {!isLoading && !error && blogs.length > 0 && (
            <span className="border-2 border-[#202020] bg-white px-3 py-2 text-xs font-black shadow-[3px_3px_0px_#202020]">
              PAGE {page}{totalPages > 0 ? ` / ${totalPages}` : ""}
            </span>
          )}
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[16/10] border-2 border-[#202020]/20 bg-[#F2CB57]/40" />
                <div className="mt-5 h-6 w-24 border border-[#202020]/10 bg-[#EC5E27]/30" />
                <div className="mt-4 h-6 w-full bg-[#202020]/10" />
                <div className="mt-2 h-6 w-4/5 bg-[#202020]/10" />
                <div className="mt-4 h-4 w-full bg-[#202020]/10" />
                <div className="mt-2 h-4 w-2/3 bg-[#202020]/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <div className="border-2 border-[#202020] bg-white p-8 text-center shadow-[5px_5px_0px_#202020] sm:p-12">
            <RefreshCw
              size={32}
              className="mx-auto text-[#EC5E27]"
              strokeWidth={2.5}
            />

            <h3 className="mt-4 text-2xl font-black">
              Something went wrong.
            </h3>

            <p className="mt-2 text-sm font-medium text-[#68645B]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-6 inline-flex items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-5 py-3 text-sm font-black shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020]"
            >
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && blogs.length === 0 && (
          <div className="border-2 border-dashed border-[#202020]/40 px-5 py-14 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-[#202020] bg-[#F2CB57] shadow-[4px_4px_0px_#202020]">
              <BookOpen size={29} strokeWidth={2.2} />
            </div>

            <h3 className="mt-6 text-2xl font-black sm:text-3xl">
              No stories found.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-6 text-[#68645B]">
              {search
                ? "Try another keyword. Your next great read might be just one search away."
                : "No stories are available on this page yet. Check back soon."}
            </p>
          </div>
        )}

        {/* Blog cards */}
        {!isLoading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t-2 border-dashed border-[#202020]/25 pt-8">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center border-2 border-[#202020] bg-white shadow-[3px_3px_0px_#202020] transition-all hover:bg-[#F2CB57] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  aria-current={page === pageNumber ? "page" : undefined}
                  onClick={() => onPageChange(pageNumber)}
                  className={`h-11 min-w-11 border-2 border-[#202020] px-3 text-sm font-black transition-all ${
                    page === pageNumber
                      ? "translate-x-0.5 translate-y-0.5 bg-[#EC5E27] shadow-none"
                      : "bg-white shadow-[3px_3px_0px_#202020] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#F2CB57] hover:shadow-[1px_1px_0px_#202020]"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center border-2 border-[#202020] bg-white shadow-[3px_3px_0px_#202020] transition-all hover:bg-[#F2CB57] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Bottom divider / note */}
        <div className="mt-12 flex items-center gap-3 border-t-2 border-[#202020]/20 pt-5">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-[#202020] bg-[#F2CB57]">
            <Sparkles size={16} strokeWidth={2.5} />
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.15em] sm:text-xs">
            Read something inspiring. Write something meaningful.
          </span>

          <div className="flex-1 border-t-2 border-dashed border-[#202020]/25" />
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
