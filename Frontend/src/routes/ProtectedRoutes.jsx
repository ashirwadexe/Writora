
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import {
  BookOpen,
  Sparkles,
  Feather,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const ProtectedRoutes = ({ children }) => {
  const { loading, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error("Please login to access the dashboard!");
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFDF1] px-4 py-10 text-[#202020]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rotate-12 rounded-[40px] border-[3px] border-[#202020]/10 bg-[#F2CB57]/20 sm:h-72 sm:w-72" />

        <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full border-[3px] border-[#202020]/10 bg-[#D8E8D2]/40 sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute left-[12%] top-[23%] hidden animate-bounce text-[#EC5E27] sm:block">
          <Sparkles size={25} />
        </div>

        <div className="pointer-events-none absolute bottom-[22%] right-[13%] hidden animate-pulse text-[#202020] sm:block">
          <Feather size={26} />
        </div>

        {/* Loader card */}
        <div className="relative z-10 w-full max-w-md animate-[fadeIn_0.6s_ease-out]">
          <div className="overflow-hidden rounded-[28px] border-[3px] border-[#202020] bg-white shadow-[8px_8px_0_#202020] sm:shadow-[10px_10px_0_#202020]">
            {/* Top strip */}
            <div className="flex items-center justify-between border-b-[3px] border-[#202020] bg-[#F2CB57] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-[#202020] bg-white">
                  <BookOpen size={15} strokeWidth={2.5} />
                </div>

                <span className="text-sm font-black tracking-[2px]">
                  WRITORA
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border-2 border-[#202020] bg-white px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EC5E27] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EC5E27]" />
                </span>

                <span className="text-[10px] font-black uppercase tracking-wider">
                  Loading
                </span>
              </div>
            </div>

            {/* Main content */}
            <div className="px-6 pb-8 pt-9 text-center sm:px-10 sm:pb-10 sm:pt-11">
              {/* Animated logo */}
              <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
                {/* Rotating dashed ring */}
                <div className="absolute inset-0 animate-spin rounded-[30px] border-[3px] border-dashed border-[#EC5E27]" />

                {/* Outer pulse ring */}
                <div className="absolute inset-2 animate-pulse rounded-[25px] border-2 border-[#F2CB57]" />

                {/* Main logo tile */}
                <div className="relative flex h-[76px] w-[76px] animate-[float_2.5s_ease-in-out_infinite] items-center justify-center rounded-[20px] border-[3px] border-[#202020] bg-[#F2CB57] shadow-[4px_4px_0_#202020]">
                  <BookOpen
                    size={37}
                    strokeWidth={2.2}
                    className="text-[#202020]"
                  />

                  {/* Tiny sparkle */}
                  <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-[#202020] bg-[#EC5E27] text-white">
                    <Sparkles size={16} />
                  </div>
                </div>

                {/* Orbiting dot */}
                <div className="absolute right-1 top-5 h-3 w-3 animate-ping rounded-full bg-[#EC5E27]" />
                <div className="absolute bottom-2 left-2 h-3 w-3 rounded-full border-2 border-[#202020] bg-[#D8E8D2]" />
              </div>

              {/* Heading */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-lg border-2 border-[#202020] bg-[#D8E8D2] px-3 py-1.5">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-[1.5px]">
                  Secure workspace
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Preparing your
                <br />
                <span className="text-[#EC5E27]">workspace.</span>
              </h1>

              <p className="mx-auto mt-3 max-w-[270px] text-sm leading-6 text-[#777]">
                Getting your writing desk ready. Great stories are worth the wait.
              </p>

              {/* Animated loading bar */}
              <div className="mt-8">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#777]">
                    Checking your session
                  </span>

                  <span className="text-xs font-black text-[#EC5E27]">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EC5E27]" />
                      Please wait
                    </span>
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full border-2 border-[#202020] bg-[#FDFDF1]">
                  <div className="h-full w-2/5 animate-[loadingBar_1.5s_ease-in-out_infinite] rounded-full border-r-2 border-[#202020] bg-[#EC5E27]" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t-2 border-dashed border-[#E5E5E5] pt-5">
                <Feather size={15} className="text-[#EC5E27]" />

                <p className="text-[11px] font-bold text-[#888]">
                  Your next great story starts here.
                </p>

                <ArrowUpRight size={14} className="text-[#202020]" />
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[10px] font-black uppercase tracking-[3px] text-[#999]">
            Think it. Write it. Writora.
          </p>
        </div>

        {/* Animation definitions */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes loadingBar {
            0% {
              transform: translateX(-110%);
            }
            100% {
              transform: translateX(270%);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
