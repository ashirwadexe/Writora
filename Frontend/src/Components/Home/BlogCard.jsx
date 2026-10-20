import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Heart,
} from "lucide-react";

const BlogCard = ({ blog }) => {
  const category = blog.category || "General";

  return (
    <article className="group flex h-full flex-col border-2 border-[#202020] bg-white p-4 shadow-[4px_4px_0px_#202020] transition-transform duration-200 hover:-translate-y-1 sm:p-5 sm:shadow-[5px_5px_0px_#202020]">

      {/* Article Header */}
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex max-w-[80%] items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#202020] sm:text-[10px]">
          <BookOpen size={13} strokeWidth={2.5} />
          <span className="truncate">{category}</span>
        </span>
      </div>

      {/* Title */}
      <Link
        to={`/blogs/${blog._id}`}
        aria-label={`Read ${blog.title}`}
        className="mt-5 block sm:mt-6"
      >
        <h3 className="line-clamp-3 text-xl font-black leading-tight tracking-tight text-[#202020] transition-colors group-hover:text-[#EC5E27] sm:text-2xl">
          {blog.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-[#68645B] sm:mt-4">
        {blog.content}
      </p>

      {/* Read Article Link */}
      <Link
        to={`/blogs/${blog._id}`}
        className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-wider text-[#064E3B] transition-colors hover:text-[#EC5E27]"
      >
        Continue reading
        <ArrowUpRight
          size={16}
          strokeWidth={2.5}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>

      {/* Spacer keeps metadata aligned */}
      <div className="flex-1" />

      {/* Metadata */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-[#202020]/25 pt-4 sm:mt-6">
        <span className="flex items-center gap-2 text-xs font-bold text-[#55534E]">
          <Clock3
            size={16}
            strokeWidth={2.3}
            className="shrink-0"
          />
          {blog.readTime || 1} min read
        </span>

        <span
          className="flex items-center gap-1.5 text-xs font-black text-[#202020]"
          aria-label={`${blog.totalLikes ?? 0} likes`}
        >
          <Heart
            size={17}
            strokeWidth={2.3}
            className="text-[#EC5E27]"
          />
          {blog.totalLikes ?? 0}
        </span>
      </div>

      {/* Bottom Accent */}
      <div className="mt-4 flex h-1.5 w-full overflow-hidden border border-[#202020]">
        <div className="w-1/3 bg-[#064E3B]" />
        <div className="w-1/3 bg-[#F2CB57]" />
        <div className="w-1/3 bg-[#EC5E27]" />
      </div>

    </article>
  );
};

export default BlogCard;