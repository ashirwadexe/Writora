const Hero = () => {
    
  return (
    <section className="py-[88px] pb-[100px]">
    
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
            {/* Left content */}
            <div>
                <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold bg-[#F1EAD9] border border-black/10 text-[#161A22] px-3.5 py-[7px] rounded-full opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.05s]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F6F63]" />
                    Now with AI writing assist
                </span>

                <h1 className="font-serif font-medium tracking-[-0.015em] text-[#161A22] text-[40px] leading-[1.04] sm:text-5xl lg:text-[64px] max-w-[11.5ch] mt-[22px] mb-[22px] opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.18s]">
                    Where thoughts <em className="italic font-normal text-[#B9822C]">find</em> their shape.
                </h1>

                <p className="text-lg text-[#6B6E76] leading-relaxed max-w-[46ch] mb-[34px] opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.30s]">
                    Write, publish and grow your ideas on Writora — a calmer place to blog, built with an AI co-writer that drafts, summarises and helps you finish what you started.
                </p>

                {/* CTAs */}
                <div className="flex gap-4 flex-wrap mb-11 opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.30s]">
                    <a href="#" className="bg-[#161A22] text-[#FBF7EF] font-semibold text-[15.5px] px-7 py-[15px] rounded-full hover:bg-black hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5 transition-all">
                    Start writing — it's free
                    </a>
                    <a href="#feed" className="border border-black/10 text-[#161A22] font-semibold text-[15.5px] px-7 py-[15px] rounded-full hover:border-[#161A22] transition-colors">
                    Explore stories
                    </a>
                </div>

                {/* Stats */}
                <div className="flex gap-9 flex-wrap opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.42s]">
                    <div>
                    <b className="font-serif text-[26px] font-semibold block text-[#161A22]">28,400</b>
                    <span className="text-[13px] text-[#6B6E76]">Stories published</span>
                    </div>
                    <div>
                    <b className="font-serif text-[26px] font-semibold block text-[#161A22]">9,600</b>
                    <span className="text-[13px] text-[#6B6E76]">Active writers</span>
                    </div>
                    <div>
                    <b className="font-serif text-[26px] font-semibold block text-[#161A22]">4.8 min</b>
                    <span className="text-[13px] text-[#6B6E76]">Avg. read time</span>
                    </div>
                </div>
            </div>

            {/* Right visual */}
            <div className="relative h-[380px] sm:h-[480px] opacity-0 [animation:riseIn_0.8s_cubic-bezier(0.19,1,0.22,1)_forwards] [animation-delay:0.42s]">
                <div className="absolute w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.28),transparent_70%)] -top-10 -right-16 blur-[4px] z-0" />

                {/* main card */}
                <div className="absolute w-[260px] sm:w-[290px] top-5 left-1/2 -translate-x-1/2 sm:left-[70px] sm:translate-x-0 bg-white rounded-[18px] border border-black/10 shadow-[0_30px_60px_-25px_rgba(22,26,34,0.28)] p-5 z-[3]">
                    <div className="h-[130px] rounded-xl mb-3.5 bg-[linear-gradient(135deg,#D9A441_0%,#C1495B_100%)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                    </div>
                    <h4 className="font-serif text-[17px] font-semibold mb-1.5 text-[#161A22]">
                    The quiet discipline of writing daily
                    </h4>
                    <p className="text-[12.5px] text-[#6B6E76]">
                    How a 15-minute habit changed the way I think about ideas.
                    </p>
                    <div className="flex items-center gap-2 mt-3.5 text-[11.5px] text-[#6B6E76]">
                    <span className="w-[22px] h-[22px] rounded-full bg-[#1F6F63]" />
                    Meera Kapoor · 6 min read
                    </div>
                </div>

                {/* AI card */}
                <div className="hidden sm:block absolute w-[210px] top-[290px] left-0 bg-white rounded-[18px] border border-black/10 shadow-[0_30px_60px_-25px_rgba(22,26,34,0.28)] p-4 z-[4] [animation:floatY_6s_ease-in-out_infinite]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1F6F63] bg-[#1F6F63]/10 px-2.5 py-1 rounded-full mb-2.5">
                    ✦ AI summary ready
                    </span>
                    <p className="text-xs text-[#161A22]/75 leading-relaxed">
                    "A short, honest take on building a consistent writing habit without burning out."
                    </p>
                </div>

                {/* floating tags */}
                <div className="hidden lg:block absolute top-[60px] right-[10px] bg-[#D9A441] text-[#161A22] font-semibold text-[13px] px-4 py-2.5 rounded-[18px] shadow-[0_30px_60px_-25px_rgba(22,26,34,0.28)] z-[5] [animation:floatY_7s_ease-in-out_infinite] [animation-delay:0.4s]">
                    #Design
                </div>
                <div className="hidden lg:block absolute bottom-10 right-10 bg-white text-[#C1495B] font-semibold text-[13px] px-[15px] py-[9px] rounded-[18px] border border-black/10 shadow-[0_30px_60px_-25px_rgba(22,26,34,0.28)] z-[5] [animation:floatY_5.5s_ease-in-out_infinite] [animation-delay:1s]">
                    #Startup
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;