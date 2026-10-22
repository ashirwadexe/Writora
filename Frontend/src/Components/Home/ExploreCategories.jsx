
import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Heart,
  Palette,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Technology",
    description: "Ideas shaping our digital future.",
    icon: Code2,
    color: "#F2CB57",
    count: "01",
  },
  {
    name: "Stories",
    description: "Stories that stay with you.",
    icon: BookOpen,
    color: "#EC5E27",
    count: "02",
  },
  {
    name: "Education",
    description: "Learn something new every day.",
    icon: GraduationCap,
    color: "#D8E8D2",
    count: "03",
  },
  {
    name: "Lifestyle",
    description: "Little things. Meaningful living.",
    icon: Heart,
    color: "#F2CB57",
    count: "04",
  },
  {
    name: "Business",
    description: "Ideas, work and entrepreneurship.",
    icon: BriefcaseBusiness,
    color: "#D8E8D2",
    count: "05",
  },
  {
    name: "Creative",
    description: "Art, design and imagination.",
    icon: Palette,
    color: "#EC5E27",
    count: "06",
  },
];

const ExploreCategories = ({
  onCategorySelect,
  blogSectionId = "blog-section",
}) => {
  const handleCategoryClick = (category) => {
    // Select category first so the blog section can filter results
    onCategorySelect?.(category);

    // Scroll to the existing blog section
    const blogSection = document.getElementById(blogSectionId);

    if (blogSection) {
      blogSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="overflow-hidden bg-[#FDFDF1] px-4 py-12 text-[#202020] sm:px-6 sm:py-16 md:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-7 flex flex-col gap-4 border-b-2 border-[#202020] pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-7">
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5 border-2 border-[#202020] bg-[#F2CB57] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#202020] sm:mb-4 sm:gap-2 sm:px-3 sm:text-xs sm:shadow-[3px_3px_0px_#202020]">
              <Sparkles size={13} />
              Find your corner
            </div>

            <h2 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              EXPLORE
              <br />
              <span className="text-[#EC5E27]">CATEGORIES.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium leading-6 text-[#55554D] sm:text-base">
            From big ideas to little stories, discover something worth
            reading in every corner of Writora.
          </p>
        </div>

        {/* Responsive category grid: 2 columns on phones, 3 on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategoryClick(category.name)}
                aria-label={`Explore ${category.name} blogs`}
                className="group flex min-h-[158px] min-w-0 flex-col justify-between border-2 border-[#202020] bg-white p-3 text-left shadow-[3px_3px_0px_#202020] transition-all duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0px_#202020] active:translate-y-0 active:shadow-[1px_1px_0px_#202020] sm:min-h-[195px] sm:p-5 sm:shadow-[5px_5px_0px_#202020] sm:hover:shadow-[8px_8px_0px_#202020] md:min-h-[210px] md:p-6"
              >
                {/* Icon and number */}
                <div className="flex items-start justify-between gap-1">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#202020] transition-transform duration-200 group-hover:rotate-[-6deg] sm:h-12 sm:w-12 md:h-14 md:w-14"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2.5}
                      className="sm:h-6 sm:w-6"
                    />
                  </span>

                  <span className="pt-1 text-[9px] font-black tracking-wider text-[#77776D] sm:text-xs sm:tracking-widest">
                    /{category.count}
                  </span>
                </div>

                {/* Category title and description */}
                <div className="mt-5 min-w-0 sm:mt-7">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="break-words text-[15px] font-black leading-tight tracking-tight min-[390px]:text-lg sm:text-2xl md:text-3xl">
                      {category.name}
                    </h3>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={2.5}
                      className="shrink-0 transition-transform duration-200 group-hover:rotate-45 sm:h-5 sm:w-5"
                    />
                  </div>

                  <p className="mt-1.5 text-[10px] font-medium leading-[1.4] text-[#66665D] min-[390px]:text-[11px] sm:mt-2 sm:text-sm sm:leading-5">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col gap-4 border-2 border-[#202020] bg-[#F2CB57] p-4 shadow-[3px_3px_0px_#202020] sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 sm:shadow-[5px_5px_0px_#202020] md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#202020] bg-[#FDFDF1] sm:h-10 sm:w-10">
              <BookOpen size={19} />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-black leading-tight sm:text-base">
                Every interest has a story.
              </p>
              <p className="mt-1 text-[11px] font-medium leading-4 text-[#49432F] sm:text-sm">
                Find your next favourite read.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCategoryClick("")}
            className="inline-flex w-full items-center justify-center gap-2 border-2 border-[#202020] bg-[#202020] px-4 py-3 text-xs font-black text-[#FDFDF1] transition-colors hover:bg-[#EC5E27] sm:w-auto sm:self-auto sm:text-sm"
          >
            Explore all blogs
            <ArrowDownRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
