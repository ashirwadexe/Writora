import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  Sparkles,
  PenLine,
} from "lucide-react";

const WriterCTA = ({ isAuthenticated = false }) => {
  return (
    <section className="overflow-hidden bg-[#FDFDF1] px-4 py-14 text-[#202020] sm:px-6 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative border-2 border-[#202020] bg-[#EC5E27] p-6 shadow-[6px_6px_0px_#202020] sm:p-10 sm:shadow-[9px_9px_0px_#202020] lg:p-14">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-8 -top-8 rotate-12 opacity-20 sm:right-4 sm:top-4">
            <BookOpen
              size={120}
              strokeWidth={1.2}
              className="sm:h-40 sm:w-40"
            />
          </div>

          <div className="pointer-events-none absolute bottom-5 right-6 hidden rotate-[-12deg] sm:block">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-[#202020] bg-[#F2CB57] shadow-[4px_4px_0px_#202020]">
              <PenLine size={30} />
            </div>
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border-2 border-[#202020] bg-[#F2CB57] px-3 py-2 text-[10px] font-black uppercase tracking-wider shadow-[3px_3px_0px_#202020] sm:text-xs">
              <Sparkles size={15} />
              Made for curious minds
            </div>

            <h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              YOUR IDEAS
              <br />
              DESERVE TO
              <br />
              <span className="text-[#FDFDF1]">BE READ.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm font-semibold leading-6 text-[#202020]/90 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
              Every great article begins with a thought. Turn yours
              into a story, share your perspective, and give your
              ideas a place to live on Writora.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Link
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#202020] bg-[#FDFDF1] px-5 py-3 text-sm font-black shadow-[4px_4px_0px_#202020] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#202020] sm:min-h-14 sm:px-7 sm:text-base"
              >
                {isAuthenticated ? "Go to Dashboard" : "Start Writing"}
                <ArrowUpRight size={19} strokeWidth={2.5} />
              </Link>

              <Link
                to="/"
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("blog-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#202020] bg-transparent px-5 py-3 text-sm font-black transition-colors hover:bg-[#202020] hover:text-[#FDFDF1] sm:min-h-14 sm:px-7 sm:text-base"
              >
                Explore Stories
                <BookOpen size={18} />
              </Link>
            </div>
          </div>

          {/* Bottom label */}
          <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#202020]/40 pt-4 sm:mt-12">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] sm:text-xs">
              Think it. Write it. Share it.
            </span>

            <span className="border-2 border-[#202020] bg-[#F2CB57] px-3 py-1.5 text-xs font-black">
              WRITORA®
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WriterCTA;
