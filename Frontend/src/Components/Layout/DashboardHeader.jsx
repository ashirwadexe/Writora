import { useLocation, Link } from "react-router-dom";
import {
  Menu,
  Plus,
  Search,
  Bell,
  ChevronRight,
  UserRound,
} from "lucide-react";

const pageTitles = {
  "/dashboard": "Overview",
  "/dashboard/blogs": "My Blogs",
  "/dashboard/blogs/new": "Create Blog",
  "/dashboard/ai": "AI Blog Writer",
  "/dashboard/ai": "AI Summary",
  "/dashboard/settings": "Settings",
  "/dashboard/delete": "Delete Account",
};

const DashboardHeader = ({ onMenuClick = () => {} }) => {
  const location = useLocation();

  const currentTitle = pageTitles[location.pathname] || "Workspace";

  return (
    <header className="sticky top-0 z-30 border-b-2 border-[#202020] bg-[#FDFDF1]">
      <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#202020] bg-white transition hover:bg-[#F2CB57] md:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <div className="mb-1 hidden items-center gap-2 text-xs font-semibold text-[#888] sm:flex">
              <Link to="/" className="pointer-cursor">
                <span>Writora</span>
              </Link>
              <ChevronRight size={13} />
              <span>Workspace</span>
            </div>

            <h2 className="truncate text-lg font-black tracking-tight text-[#202020] sm:text-xl">
              {currentTitle}
            </h2>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* SEARCH BUTTON */}
          <div className="hidden items-center gap-2 rounded-xl border-2 border-[#202020] bg-white px-3 py-2 lg:flex">
            <Search size={17} className="text-[#888]" />
            <input
              type="text"
              placeholder="Search workspace..."
              className="w-36 bg-transparent text-sm outline-none placeholder:text-[#999] xl:w-48"
            />
            <kbd className="rounded border border-[#ddd] px-1.5 py-0.5 text-[10px] text-[#888]">
              /
            </kbd>
          </div>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#202020] bg-white transition hover:bg-[#F2CB57]"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-[#202020] bg-[#EC5E27]" />
          </button>

          <Link
            to="/dashboard/blogs/new"
            className="flex h-10 items-center gap-2 rounded-xl border-2 border-[#202020] bg-[#EC5E27] px-3 text-sm font-black text-white shadow-[3px_3px_0_#202020] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#202020] sm:px-4"
          >
            <Plus size={18} strokeWidth={3} />
            <span className="hidden sm:inline">New Blog</span>
            <span className="sm:hidden">New</span>
          </Link>

          <Link
            to="/dashboard/settings"
            type="button"
            aria-label="User profile"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border-2 border-[#202020] bg-[#D8E8D2] transition hover:bg-[#F2CB57] sm:flex"
          >
            <UserRound size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;