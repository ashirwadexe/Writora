const Navbar = () => {

  return (
    <nav className="sticky top-0 z-50 bg-[#FBF7EF]/90 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[76px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-[#161A22]">
          <span className="w-[11px] h-[11px] rounded-full bg-[#D9A441] -translate-y-[1px]" />
          Writora
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Star on GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border border-black/10 text-[#161A22] hover:border-[#161A22] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.478 5.92.43.372.814 1.103.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Login */}
          <a
            href="#"
            className="text-xs font-semibold px-4 sm:px-5 py-2.5 rounded-full border border-black/10 text-[#161A22] hover:border-[#161A22] transition-colors"
          >
            Log in
          </a>

          {/* Sign up - hidden on mobile */}
          <a
            href="#"
            className="hidden sm:inline-block text-xs font-semibold px-5 py-2.5 rounded-full bg-[#D9A441] text-[#161A22] hover:bg-[#B9822C] hover:shadow-lg hover:shadow-[#B9822C]/30 hover:-translate-y-0.5 transition-all"
          >
            Sign up free
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;