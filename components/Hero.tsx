'use client'
import { useState } from 'react';
import BlurText from "./BlurText";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import TextType from './TextType';
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShimmerButton } from "@/components/ui/shimmer-button"



export function Hero() {
    const [showTextType, setShowTextType] = useState(false);

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
        setShowTextType(true);
    };

    return (
        <Card className="w-full min-h-screen bg-black/[0.96] relative overflow-hidden snap-start">

            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left content */}
                <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 relative z-10 flex flex-col justify-center">
                    <BlurText
                        text="Hi, I'm Sameed Shah"
                        delay={200}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-white font-bold leading-tight"
                    />

                    {showTextType && (
                        <div className="mt-2 sm:mt-4 text-neutral-300 max-w-none lg:max-w-lg font-medium text-base sm:text-lg lg:text-xl leading-relaxed">
                            <TextType
                                text={["Building scalable, AI-automated, and intelligent web solutions with Next.js, n8n and Supabase — powered by Agentic AI."]}
                                typingSpeed={40}
                                pauseDuration={2000}
                                showCursor={true}
                                cursorCharacter="_"
                                loop={false}
                            />
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
                        <ShimmerButton className="shadow-2xl w-full sm:w-auto">
                            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 sm:text-base lg:text-lg px-2">
                                View My Work
                            </span>
                        </ShimmerButton>
                        <InteractiveHoverButton
                            text="Let's Collaborate"
                            className="w-full sm:w-48 h-12 border-white text-white bg-transparent hover:text-black"
                        />
                    </div>
                </div>

                {/* Right content */}
                <div className="flex-1 relative min-h-[300px] lg:min-h-full order-first lg:order-last">
                    <div
                        className="w-full h-full"
                        style={{
                            animation: 'fadeUpBot 2s ease-out 1s both'
                        }}
                    >
                        <SplineScene
                            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
