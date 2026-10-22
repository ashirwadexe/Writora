
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "AI Studio", path: "/dashboard/ai", ai: true },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-1.5 py-2 text-sm font-bold transition-colors duration-200 ${
      isActive
        ? "text-[#EC5E27]"
        : "text-[#202020] hover:text-[#EC5E27]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[#202020] bg-[#FDFDF1]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex shrink-0 items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] bg-[#EC5E27] shadow-[3px_3px_0px_#202020] transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#202020]">
            <BookOpen size={22} strokeWidth={2.5} color="#FDFDF1" />
          </div>

          <span className="text-2xl font-black tracking-tight text-[#202020] sm:text-3xl">
            writora<span className="text-[#EC5E27]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={navLinkClass}
            >
              {link.ai && (
                <Sparkles
                  size={15}
                  strokeWidth={2.5}
                  className="text-[#EC5E27]"
                />
              )}

              {link.name}

              {link.name === "AI Studio" && (
                <span className="ml-1 border border-[#202020] bg-[#EC5E27] px-1.5 py-0.5 text-[9px] font-black uppercase text-[#202020]">
                  AI
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        {user ? <><div className="hidden items-center gap-3 md:flex">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-4 py-2.5 text-sm font-black text-[#202020] shadow-[4px_4px_0px_#202020] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Go to Dashboard
            <ArrowUpRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform group-hover:rotate-45"
            />
          </Link>
        </div></> : <><div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="px-3 py-2 text-sm font-bold text-[#202020] transition-colors hover:text-[#EC5E27]"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-4 py-2.5 text-sm font-black text-[#202020] shadow-[4px_4px_0px_#202020] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Get Started
            <ArrowUpRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform group-hover:rotate-45"
            />
          </Link>
        </div></>}
        

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] bg-[#FDFDF1] text-[#202020] shadow-[3px_3px_0px_#202020] transition-all hover:bg-[#EC5E27] md:hidden"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X size={23} strokeWidth={2.5} />
          ) : (
            <Menu size={23} strokeWidth={2.5} />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t-2 border-[#202020] bg-[#FDFDF1] px-4 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center gap-2 border-b border-[#202020]/15 px-3 py-3.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-[#EC5E27]/10 text-[#EC5E27]"
                      : "text-[#202020] hover:bg-[#EC5E27]/10"
                  }`
                }
              >
                {link.ai && (
                  <Sparkles
                    size={17}
                    strokeWidth={2.5}
                    className="text-[#EC5E27]"
                  />
                )}

                {link.name}

                {link.name === "AI Studio" && (
                  <span className="ml-auto border border-[#202020] bg-[#EC5E27] px-1.5 py-0.5 text-[9px] font-black uppercase text-[#202020]">
                    AI
                  </span>
                )}
              </NavLink>
            ))}

            {/* Simple Mobile About Button
            <button
              type="button"
              className="border-b border-[#202020]/15 px-3 py-3.5 text-left text-sm font-bold text-[#202020] transition-colors hover:bg-[#EC5E27]/10 hover:text-[#EC5E27]"
            >
              About
            </button> */}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-center border-2 border-[#202020] bg-[#FDFDF1] px-4 py-3 text-sm font-black text-[#202020] transition-colors hover:bg-[#EC5E27]/10"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-4 py-3 text-sm font-black text-[#202020] shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020]"
            >
              Get Started
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
