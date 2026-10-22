import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, PlusSquare, Sparkles, Settings, X, PenLine, LogOut, UserRound, ChevronRight } from "lucide-react";

const navigation = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "My Blogs",
    path: "/dashboard/blogs",
    icon: BookOpen,
  },
  {
    name: "Create Blog",
    path: "/dashboard/blogs/new",
    icon: PlusSquare,
  },
];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all ${
      isActive
        ? "border-[#202020] bg-[#F2CB57] text-[#202020] shadow-[3px_3px_0_#202020]"
        : "border-transparent text-[#626262] hover:border-[#202020] hover:bg-[#FDFDF1] hover:text-[#202020]"
    }`;

  return (
    <>
      {isOpen && (
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-[#202020] bg-[#FDFDF1] transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b-2 border-[#202020] px-5">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#202020] bg-[#EC5E27] shadow-[3px_3px_0_#202020]">
              <PenLine size={22} strokeWidth={2.5} />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-[#202020]">
                writora<span className="text-[#EC5E27]">.</span>
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#777]">
                Writer workspace
              </p>
            </div>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[#F2CB57] md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-black uppercase tracking-[2px] text-[#888]">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map(({ name, path, icon: Icon, end }) => (
              <NavLink
                key={name}
                to={path}
                end={end}
                onClick={onClose}
                className={linkClass}
              >
                <Icon size={19} strokeWidth={2.2} />
                <span>{name}</span>

                {name === "Create Blog" && (
                  <span className="ml-auto rounded-md bg-[#EC5E27] px-2 py-1 text-[9px] font-black text-white">
                    NEW
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* AI Studio */}
          <p className="mb-3 mt-8 px-3 text-[10px] font-black uppercase tracking-[2px] text-[#888]">
            Create with AI
          </p>

          <NavLink
            to="/dashboard/ai"
            onClick={onClose}
            className={linkClass}
          >
            <Sparkles size={19} strokeWidth={2.2} />
            <span>AI Studio</span>

            <span className="ml-auto rounded-md bg-[#EC5E27] px-2 py-1 text-[9px] font-black text-white">
              AI
            </span>
          </NavLink>

          {/* Preferences */}
          <p className="mb-3 mt-8 px-3 text-[10px] font-black uppercase tracking-[2px] text-[#888]">
            Preferences
          </p>

          <NavLink
            to="/dashboard/settings"
            onClick={onClose}
            className={linkClass}
          >
            <Settings size={19} strokeWidth={2.2} />
            <span>Settings</span>
          </NavLink>
        </div>

        {/* User section */}
        <div className="border-t-2 border-[#202020] p-4">
          <div className="flex items-center gap-3 rounded-xl border-2 border-[#202020] bg-white p-3 shadow-[3px_3px_0_#202020]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#D8E8D2]">
              <UserRound size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-[#202020]">
                Your Workspace
              </p>
              <p className="text-xs text-[#777]">Writer account</p>
            </div>

            <ChevronRight size={17} className="text-[#777]" />
          </div>

          <button
            type="button"
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-[#777] transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;