'use client'
import { useEffect, useRef, useState } from 'react';
import { LogoLoop } from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase, SiDocker, SiGithub, SiPython } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
];



const ScrollRevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0px) rotateX(0deg)'
          : 'translateY(40px) rotateX(10deg)',
        transitionDelay: `${delay}ms`,
        transformOrigin: 'center',
        perspective: '1000px'
      }}
    >
      {children}
    </div>
  );
};

export function About() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-black via-black to-black/95 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Tech Stack Logo Loop */}
        <div className="relative overflow-hidden py-8  border-white/10 bg-black/40 backdrop-blur-sm">
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
          />
        </div>

        {/* About Heading */}
        <div className="flex items-center justify-center pt-20 px-4 pb-12">
          <ScrollRevealText
            className="text-center"
            delay={0}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              About
            </h1>
          </ScrollRevealText>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto space-y-32 px-4 sm:px-6 md:px-8 pb-40">

          {/* Introduction */}
          <ScrollRevealText delay={100} className="text-center">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium hover:text-white transition-colors duration-300">
              I&apos;m Muhammad Sameed Shah, an <span className="text-white font-semibold">AI-Driven Full Stack Developer</span> who blends modern web development with intelligent automation.
            </p>
          </ScrollRevealText>

          {/* What I Do */}
          <div className="space-y-8">
            <ScrollRevealText delay={50} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                What I Do
              </h2>
            </ScrollRevealText>
            <ScrollRevealText delay={150} className="text-center">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                I craft scalable web apps using <span className="text-white font-semibold">Next.js</span>, <span className="text-white font-semibold">Supabase</span>, and <span className="text-white font-semibold">Tailwind CSS</span>, and integrate smart automation flows with <span className="text-white font-semibold">n8n</span>.
              </p>
            </ScrollRevealText>
          </div>

          {/* What Makes Me Different */}
          <div className="space-y-8">
            <ScrollRevealText delay={50} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                What Makes Me Different
              </h2>
            </ScrollRevealText>
            <ScrollRevealText delay={150} className="text-center">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                My workflow is powered by <span className="text-white font-semibold">Specs-Driven Development</span> using <span className="text-white font-semibold">Agentic AI</span>, allowing me to design, build, and optimize systems faster and more reliably.
              </p>
            </ScrollRevealText>
          </div>

          {/* Future Vision */}
          <div className="space-y-8">
            <ScrollRevealText delay={50} className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Future Vision
              </h2>
            </ScrollRevealText>
            <ScrollRevealText delay={150} className="text-center">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                Currently diving deep into <span className="text-white font-semibold">OpenAI SDK</span>, <span className="text-white font-semibold">multi-agent orchestration</span>, and <span className="text-white font-semibold">Python</span> — aiming to build the next generation of autonomous web systems.
              </p>
            </ScrollRevealText>
          </div>

        </div>
      </div>
    </section>
  );
}