
import React from "react";
import { Link } from "react-router-dom";

// Reusable inline SVG icons
const Icon = ({ name, size = 20, className = "" }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    book: (
      <>
        <path d="M12 7v14" />
        <path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4a3 3 0 0 0-3 2 3 3 0 0 0-3-2H5a2 2 0 0 1-2-2Z" />
      </>
    ),
    arrowUpRight: (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    pen: (
      <>
        <path d="m16 4 4 4" />
        <path d="M4 20 8.5 19 20 7.5a2.83 2.83 0 0 0-4-4L4.5 15 4 20Z" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    github: (
      <path
        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.6 1.2 15 3a13.4 13.4 0 0 0-6 0C6.4 1.2 5.2 1.5 5.2 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 18v4"
        transform="translate(1 0)"
      />
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const Footer = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSectionLink = (event, id) => {
    event.preventDefault();
    scrollToSection(id);
  };

  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t-2 border-[#202020] bg-[#FDFDF1] px-4 pb-6 pt-12 text-[#202020] sm:px-6 sm:pt-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 border-b-2 border-[#202020]/20 pb-10 sm:gap-x-8 md:grid-cols-4 lg:gap-12 lg:pb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-11 w-11 items-center justify-center border-2 border-[#202020] bg-[#EC5E27] shadow-[3px_3px_0px_#202020]">
                <Icon name="book" size={24} />
              </span>

              <span className="text-3xl font-black tracking-tight">
                writora<span className="text-[#EC5E27]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm font-medium leading-6 text-[#55554D] sm:text-base sm:leading-7">
              A home for ideas, stories, and perspectives. Read
              something interesting today, or write something
              worth remembering.
            </p>

            <Link
              to="/signup"
              className="mt-5 inline-flex items-center gap-2 text-sm font-black underline decoration-2 underline-offset-4 transition-colors hover:text-[#EC5E27]"
            >
              Become a writer
              <Icon name="arrowUpRight" size={17} />
            </Link>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] transition-colors hover:bg-[#F2CB57]"
              >
                <Icon name="instagram" size={19} />
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] transition-colors hover:bg-[#F2CB57]"
              >
                <Icon name="github" size={19} />
              </a>

              <a
                href="mailto:hello@writora.in"
                aria-label="Email Writora"
                className="flex h-10 w-10 items-center justify-center border-2 border-[#202020] transition-colors hover:bg-[#F2CB57]"
              >
                <Icon name="mail" size={19} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.16em] sm:text-sm">
              Explore
            </h3>

            <ul className="space-y-3.5 text-sm font-semibold text-[#55554D]">
              <li>
                <a
                  href="#blog-section"
                  onClick={(e) => handleSectionLink(e, "blog-section")}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  All Stories <Icon name="arrowUpRight" size={13} />
                </a>
              </li>

              <li>
                <a
                  href="#explore-categories"
                  onClick={(e) =>
                    handleSectionLink(e, "explore-categories")
                  }
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  Categories <Icon name="arrowUpRight" size={13} />
                </a>
              </li>

              <li>
                <Link
                  to="/"
                  onClick={handleHomeClick}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  Home <Icon name="arrowUpRight" size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Create */}
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.16em] sm:text-sm">
              Create
            </h3>

            <ul className="space-y-3.5 text-sm font-semibold text-[#55554D]">
              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  Start Writing <Icon name="pen" size={14} />
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  Log In <Icon name="arrowUpRight" size={13} />
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
                >
                  Join Writora <Icon name="arrowUpRight" size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="text-xs font-medium leading-5 text-[#66665D] sm:text-sm">
            © {new Date().getFullYear()} Writora. Made for the love of words.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-[#55554D] sm:text-sm">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-[#EC5E27]"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="transition-colors hover:text-[#EC5E27]"
            >
              Terms
            </Link>

            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="inline-flex items-center gap-1 transition-colors hover:text-[#EC5E27]"
            >
              Back to top
              <Icon name="arrowUpRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
