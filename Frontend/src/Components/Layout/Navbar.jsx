
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "AI Studio", path: "/dashboard/ai", ai: true },
    { name: "About", path: "/" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative inline-flex min-h-10 items-center gap-1.5 text-sm font-bold transition-colors
    ${
      isActive
        ? "text-[#EC5E27] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[#EC5E27]"
        : "text-[#202020] hover:text-[#EC5E27]"
    }`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#202020] bg-[#FDFDF1]">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-8"
      >
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] bg-[#EC5E27] text-[#202020]">
              <BookOpen size={22} strokeWidth={2.5} />
            </span>

            <span className="text-2xl font-black tracking-[-1.5px] text-[#202020]">
              writora<span className="text-[#EC5E27]">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
                className={navLinkClass}
              >
                {link.ai && (
                  <Sparkles
                    size={16}
                    strokeWidth={2.5}
                    className="text-[#EC5E27]"
                  />
                )}
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              to="/login"
              className="text-sm font-bold text-[#202020] hover:text-[#EC5E27]"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="group inline-flex min-h-11 items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-4 text-sm font-extrabold text-[#202020] shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Get started
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[#202020] bg-[#FDFDF1] text-[#202020] transition-colors hover:bg-[#EC5E27] sm:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t-2 border-[#202020] py-4 sm:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center justify-between border-b border-[#202020]/15 px-2 text-base font-bold ${
                      isActive
                        ? "text-[#EC5E27]"
                        : "text-[#202020]"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    {link.ai && <Sparkles size={17} />}
                    {link.name}
                  </span>
                  {link.ai && (
                    <span className="border border-[#202020] bg-[#EC5E27] px-2 py-1 text-xs text-[#202020]">
                      AI
                    </span>
                  )}
                </NavLink>
              ))}

              <Link
                to="/login"
                onClick={closeMenu}
                className="flex min-h-12 items-center px-2 font-bold text-[#202020]"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="mt-3 flex min-h-12 items-center justify-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-4 font-extrabold text-[#202020] shadow-[4px_4px_0px_#202020] active:translate-y-1 active:shadow-none"
              >
                Get started <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
