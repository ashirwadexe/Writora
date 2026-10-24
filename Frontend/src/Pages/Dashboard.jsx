import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Code2,
  FileText,
  Heart,
  Lightbulb,
  PenLine,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const stats = [
  {
    title: "Total Stories",
    value: "12",
    subtitle: "Articles you've written",
    icon: BookOpen,
    bg: "bg-white",
    iconBg: "bg-[#FCE4D9]",
  },
  {
    title: "Total Likes",
    value: "248",
    subtitle: "Love from your readers",
    icon: Heart,
    bg: "bg-[#D8E8D2]",
    iconBg: "bg-white",
  },
  {
    title: "Active Writers",
    value: "08",
    subtitle: "Writers in the community",
    icon: Users,
    bg: "bg-[#F2CB57]",
    iconBg: "bg-white",
  },
  {
    title: "Reading Time",
    value: "36 min",
    subtitle: "Across all your stories",
    icon: Clock3,
    bg: "bg-white",
    iconBg: "bg-[#D8E8D2]",
  },
];

const recentStories = [
  {
    id: 1,
    title: "My Journey into Web Development",
    category: "Technology",
    date: "Oct 22, 2026",
    readTime: "5 min read",
    likes: 24,
    icon: Code2,
    bg: "bg-[#D8E8D2]",
  },
  {
    id: 2,
    title: "Lessons I Learned from Failure",
    category: "Personal Growth",
    date: "Oct 20, 2026",
    readTime: "4 min read",
    likes: 18,
    icon: Lightbulb,
    bg: "bg-[#F2CB57]",
  },
  {
    id: 3,
    title: "Building Better Habits Every Day",
    category: "Lifestyle",
    date: "Oct 18, 2026",
    readTime: "6 min read",
    likes: 32,
    icon: FileText,
    bg: "bg-[#FCE4D9]",
  },
];

const Dashboard = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FDFDF1] px-3 py-4 text-[#202020] sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-5 sm:space-y-7">

        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Good morning!
              <span className="ml-1">✍️</span>
            </h1>

            <p className="mt-1 text-xs text-[#686868] sm:mt-2 sm:text-sm lg:text-base">
              Your ideas deserve to be out in the world.
            </p>
          </div>
        </header>

        {/* Stats */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
            
            <span className="hidden rounded-md border-2 border-[#202020] bg-white px-3 py-1.5 text-xs font-bold sm:inline-block">
              OVERVIEW
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className={`min-w-0 rounded-lg border-2 border-[#202020] ${stat.bg} p-3 shadow-[3px_3px_0_#202020] sm:rounded-xl sm:p-5 sm:shadow-[4px_4px_0_#202020] sm:transition sm:hover:-translate-y-1 sm:hover:shadow-[6px_6px_0_#202020]`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md border-2 border-[#202020] sm:h-11 sm:w-11 sm:rounded-lg ${stat.iconBg}`}
                    >
                      <Icon size={17} className="sm:hidden" />
                      <Icon size={21} className="hidden sm:block" />
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="shrink-0 sm:h-[19px] sm:w-[19px]"
                    />
                  </div>

                  <p className="mt-3 text-xs font-semibold leading-tight text-[#555] sm:mt-5 sm:text-sm">
                    {stat.title}
                  </p>

                  <p className="mt-1 break-words text-2xl font-black tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 hidden text-xs text-[#686868] sm:mt-2 sm:block">
                    {stat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Stories + Quick Actions */}
        <section className="grid grid-cols-1 items-start gap-4 sm:gap-6 xl:grid-cols-[1.7fr_1fr]">

          {/* Recent Stories */}
          <div className="min-w-0 rounded-lg border-2 border-[#202020] bg-white p-3 shadow-[4px_4px_0_#202020] sm:rounded-xl sm:p-5 sm:shadow-[5px_5px_0_#202020] lg:p-6">
            <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
              <div className="min-w-0">
                <h2 className="text-lg font-black sm:text-2xl">
                  Recent stories
                </h2>
                <p className="mt-0.5 text-xs text-[#686868] sm:mt-1 sm:text-sm">
                  Pick up where you left off.
                </p>
              </div>

              <Link
                to="/dashboard/my-blogs"
                className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#EC5E27] hover:underline sm:text-sm"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {recentStories.map((story) => {
                const Icon = story.icon;

                return (
                  <article
                    key={story.id}
                    className="group flex min-w-0 items-start gap-2.5 rounded-lg border-2 border-[#202020] p-2.5 transition hover:bg-[#FDFDF1] sm:gap-4 sm:rounded-xl sm:p-4"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-[#202020] sm:h-16 sm:w-16 sm:rounded-lg lg:h-20 lg:w-20 ${story.bg}`}
                    >
                      <Icon size={21} strokeWidth={1.8} className="sm:hidden" />
                      <Icon
                        size={30}
                        strokeWidth={1.8}
                        className="hidden sm:block"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex min-w-0 flex-wrap items-center gap-1.5 sm:mb-2 sm:gap-2">
                        <span className="max-w-full truncate rounded border border-[#202020] bg-[#FDFDF1] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide sm:px-2 sm:py-1 sm:text-[10px]">
                          {story.category}
                        </span>

                        <span className="hidden text-xs text-[#777] sm:inline">
                          {story.date}
                        </span>
                      </div>

                      <h3 className="line-clamp-2 break-words text-sm font-black leading-snug sm:text-base lg:text-lg">
                        {story.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#686868] sm:mt-3 sm:gap-4 sm:text-xs">
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} className="sm:h-[14px] sm:w-[14px]" />
                          {story.readTime}
                        </span>

                        <span className="flex items-center gap-1">
                          <Heart
                            size={12}
                            className="text-[#EC5E27] sm:h-[14px] sm:w-[14px]"
                          />
                          {story.likes} likes
                        </span>

                        <span className="text-[#777] sm:hidden">
                          {story.date}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="mt-1 shrink-0 text-[#777] transition group-hover:text-[#EC5E27] sm:h-[19px] sm:w-[19px]"
                    />
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-1">

            {/* Quick Actions */}
            <div className="min-w-0 rounded-lg border-2 border-[#202020] bg-white p-3 shadow-[4px_4px_0_#202020] sm:rounded-xl sm:p-5 sm:shadow-[5px_5px_0_#202020] lg:p-6">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#202020] bg-[#F2CB57] sm:h-10 sm:w-10">
                  <Zap size={19} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-black sm:text-xl">
                    Quick actions
                  </h2>
                  <p className="text-xs text-[#686868] sm:text-sm">
                    Make your next move.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-3">
                <Link
                  to="/dashboard/create-blog"
                  className="flex min-w-0 items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#FDFDF1] p-2.5 transition hover:bg-[#F2CB57] sm:gap-3 sm:p-3"
                >
                  <PenLine size={17} className="shrink-0 sm:h-[21px] sm:w-[21px]" />
                  <span className="min-w-0 flex-1 text-xs font-bold leading-tight sm:text-sm">
                    Write a story
                  </span>
                  <ArrowUpRight size={15} className="shrink-0" />
                </Link>

                <Link
                  to="/dashboard/my-blogs"
                  className="flex min-w-0 items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#FDFDF1] p-2.5 transition hover:bg-[#D8E8D2] sm:gap-3 sm:p-3"
                >
                  <BookOpen size={17} className="shrink-0 sm:h-[21px] sm:w-[21px]" />
                  <span className="min-w-0 flex-1 text-xs font-bold leading-tight sm:text-sm">
                    Manage stories
                  </span>
                  <ArrowUpRight size={15} className="shrink-0" />
                </Link>

                <Link
                  to="/dashboard/ai"
                  className="col-span-2 flex min-w-0 items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#FDFDF1] p-2.5 transition hover:bg-[#FCE4D9] sm:col-span-1 sm:gap-3 sm:p-3"
                >
                  <Sparkles size={17} className="shrink-0 sm:h-[21px] sm:w-[21px]" />
                  <span className="min-w-0 flex-1 text-xs font-bold leading-tight sm:text-sm">
                    Explore Writora AI
                  </span>
                  <ArrowUpRight size={15} className="shrink-0" />
                </Link>
              </div>
            </div>

            {/* Writing Tip */}
            <div className="min-w-0 rounded-lg border-2 border-[#202020] bg-[#D8E8D2] p-3 shadow-[4px_4px_0_#202020] sm:rounded-xl sm:p-5 sm:shadow-[5px_5px_0_#202020] lg:p-6">
              <div className="flex items-center gap-2">
                <Lightbulb size={20} className="shrink-0 sm:h-[23px] sm:w-[23px]" />
                <h2 className="text-base font-black sm:text-lg">
                  A little writing tip
                </h2>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[#383838] sm:mt-4 sm:text-sm sm:leading-7">
                Don't wait for the perfect first sentence. Start with what you
                know, write freely, and polish your story later.
              </p>

              <div className="mt-3 flex items-center gap-2 border-t-2 border-[#202020]/20 pt-3 text-[10px] font-bold sm:mt-4 sm:pt-4 sm:text-xs">
                <Sparkles size={14} className="shrink-0" />
                Consistency beats perfection.
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col gap-1 border-t-2 border-[#202020]/15 pt-3 text-[10px] text-[#777] sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-5 sm:text-xs">
          <p>Made for storytellers. Made with Writora.</p>
          <p className="font-bold">Keep writing. Keep growing. ✦</p>
        </footer>
      </div>
    </main>
  );
};

export default Dashboard;