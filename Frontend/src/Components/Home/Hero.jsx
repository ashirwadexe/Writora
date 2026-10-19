
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  PenLine,
  BookOpen,
  Zap,
} from "lucide-react";

const topics = [
  "Technology",
  "Artificial Intelligence",
  "Programming",
  "Business",
  "Creativity",
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("");

  const handleTopicClick = (topic) => {
    setActiveTopic((current) => (current === topic ? "" : topic));
    setSearchQuery((current) => (activeTopic === topic ? "" : topic));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Search API integration will be added later.
    // For now, the search UI and topic selection are ready.
  };

  return (
    <section className="relative overflow-hidden border-b-2 border-[#202020] bg-[#FDFDF1] text-[#202020]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* Top announcement */}
        <div className="mb-8 flex justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 border-2 border-[#202020] bg-white px-3 py-2 shadow-[3px_3px_0px_#202020]">
            <Sparkles
              size={16}
              strokeWidth={2.5}
              className="text-[#EC5E27]"
            />

            <span className="text-[10px] font-black uppercase tracking-[0.15em] sm:text-xs">
              A home for curious minds
            </span>

            <span className="h-2 w-2 rounded-full bg-[#EC5E27]" />
          </div>
        </div>

        {/* Main hero layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">

          {/* Left: Hero content */}
          <div className="relative z-10">

            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl xl:text-[84px]">
              Ideas worth
              <br />

              <span className="relative inline-block">
                reading.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-[#EC5E27] sm:h-4"
                />
              </span>

              <br />

              <span className="text-[#EC5E27]">
                Stories worth
              </span>

              <br />

              writing.
            </h1>

            <p className="mt-7 max-w-xl text-base font-medium leading-7 text-[#55534E] sm:text-lg sm:leading-8">
              Discover fresh perspectives, explore ideas that matter,
              and turn your thoughts into stories worth sharing.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="mt-8 max-w-xl"
            >
              {/* <label
                htmlFor="hero-search"
                className="mb-2 block text-xs font-black uppercase tracking-wider"
              >
                Find your next read
              </label> */}

              <div className="flex flex-col gap-2 border-2 border-[#202020] bg-white p-2 shadow-[5px_5px_0px_#202020] transition-shadow focus-within:shadow-[3px_3px_0px_#EC5E27] sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
                  <Search
                    size={21}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#202020]"
                  />

                  <input
                    id="hero-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveTopic("");
                    }}
                    placeholder="Search articles, topics, stories..."
                    className="min-w-0 w-full bg-transparent py-3 text-sm font-semibold text-[#202020] outline-none placeholder:font-medium placeholder:text-[#858178] sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex shrink-0 items-center justify-center gap-2 border-2 border-[#202020] bg-[#EC5E27] px-5 py-3 font-black transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#202020] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Search
                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>

            {/* Popular topics */}
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <Zap size={15} strokeWidth={2.5} />

                <span className="text-xs font-black uppercase tracking-wider">
                  Popular topics
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => {
                  const isActive = activeTopic === topic;

                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleTopicClick(topic)}
                      className={`border-2 border-[#202020] px-3 py-2 text-xs font-bold transition-all duration-150 sm:text-sm ${
                        isActive
                          ? "translate-x-0.5 translate-y-0.5 bg-[#EC5E27] shadow-none"
                          : "bg-white shadow-[3px_3px_0px_#202020] hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#EC5E27] hover:shadow-[1px_1px_0px_#202020]"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Writing CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-3 border-2 border-[#202020] bg-[#202020] px-5 py-3.5 text-sm font-black text-[#FDFDF1] shadow-[4px_4px_0px_#EC5E27] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#EC5E27] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <PenLine size={18} strokeWidth={2.5} />

                Start writing

                <ArrowUpRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:rotate-45"
                />
              </Link>

              <span className="text-xs font-bold text-[#68645B] sm:text-sm">
                Your ideas deserve a voice.
              </span>
            </div>
          </div>

          {/* Right: Neo-brutalist visual */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto lg:mr-0 hidden md:block">

            {/* Decorative shapes */}
            <div
              aria-hidden="true"
              className="absolute -right-2 -top-5 h-16 w-16 rotate-12 border-2 border-[#202020] bg-[#EC5E27] sm:-right-4 sm:-top-7 sm:h-20 sm:w-20"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-3 h-14 w-14 rounded-full border-2 border-[#202020] bg-[#F2CB57] sm:-bottom-6 sm:-left-5 sm:h-16 sm:w-16"
            />

            {/* Main illustration card */}
            <div className="relative z-10 rotate-[-1deg] border-2 border-[#202020] bg-white p-4 shadow-[7px_7px_0px_#202020] sm:p-6 sm:shadow-[10px_10px_0px_#202020]">

              <div className="flex items-center justify-between border-b-2 border-[#202020] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
                    <BookOpen
                      size={19}
                      strokeWidth={2.5}
                      color="#FDFDF1"
                    />
                  </div>

                  <span className="text-lg font-black tracking-tight">
                    writora<span className="text-[#EC5E27]">.</span>
                  </span>
                </div>

                <span className="border-2 border-[#202020] bg-[#F2CB57] px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                  The idea lab
                </span>
              </div>

              {/* Featured writing card */}
              <div className="relative mt-5 border-2 border-[#202020] bg-[#FDFDF1] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="border-2 border-[#202020] bg-[#EC5E27] px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                    Featured idea
                  </span>

                  <Sparkles
                    size={20}
                    strokeWidth={2.5}
                    className="shrink-0"
                  />
                </div>

                <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                  Every great story starts with{" "}
                  <span className="underline decoration-[#EC5E27] decoration-4 underline-offset-4">
                    one idea.
                  </span>
                </h2>

                <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-[#68645B]">
                  Read something inspiring today. Write something meaningful
                  tomorrow.
                </p>

                <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-[#202020]/30 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center border-2 border-[#202020] bg-[#F2CB57]">
                      <PenLine size={17} strokeWidth={2.5} />
                    </div>

                    <div>
                      <p className="text-xs font-black">Your next chapter</p>
                      <p className="text-[10px] font-semibold text-[#68645B]">
                        Starts with you
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={23}
                    strokeWidth={2.5}
                    className="text-[#EC5E27]"
                  />
                </div>
              </div>

              {/* Bottom visual blocks */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex min-h-[94px] flex-col justify-between border-2 border-[#202020] bg-[#EC5E27] p-3">
                  <BookOpen size={21} strokeWidth={2.5} />

                  <span className="text-sm font-black leading-tight">
                    Read beyond
                    <br />
                    the ordinary.
                  </span>
                </div>

                <div className="flex min-h-[94px] flex-col justify-between border-2 border-[#202020] bg-[#F2CB57] p-3">
                  <Sparkles size={21} strokeWidth={2.5} />

                  <span className="text-sm font-black leading-tight">
                    Create beyond
                    <br />
                    the expected.
                  </span>
                </div>
              </div>
            </div>

            {/* Floating note */}
            <div className="absolute -bottom-7 right-3 z-20 flex -rotate-3 items-center gap-2 border-2 border-[#202020] bg-white px-3 py-2 shadow-[3px_3px_0px_#202020] sm:right-5">
              <span className="flex h-7 w-7 items-center justify-center border-2 border-[#202020] bg-[#F2CB57]">
                <PenLine size={15} strokeWidth={2.5} />
              </span>

              <span className="text-xs font-black">
                Think it. Write it.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="mt-16 flex items-center justify-center gap-3 border-t-2 border-[#202020]/20 pt-6 sm:mt-20 sm:justify-start">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[#202020] bg-[#EC5E27]">
            <ArrowDown size={17} strokeWidth={2.5} />
          </span>

          <span className="text-xs font-black uppercase tracking-[0.16em]">
            Scroll less. Discover more.
          </span>

          <div className="h-0 flex-1 border-t-2 border-dashed border-[#202020]/25" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
