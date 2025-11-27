import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function Resume() {
    const data = [
        {
            title: "2025",
            content: (
                <div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        Presidential Initiative of Artificial Intelligence and Computing
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-normal mb-4">
                        Certified Agentic AI & Robotics Engineering - Continue
                    </p>
                    <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                        <li>Mastering Agentic AI systems and autonomous workflows</li>
                        <li>Deep dive into Large Language Models (LLMs) and their applications</li>
                        <li>Integrating AI with physical robotics for real-world automation</li>
                        <li>Advanced Python programming for AI and Robotics</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        Diploma of Associate Engineering in Computer Information Technology
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-normal mb-4">
                        Memon Industrial & Technical Institute
                    </p>
                    <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                        <li>Hands-on experience with database management and data structures.</li>
                        <li>Introduction to web development using HTML, CSS, and JavaScript.</li>
                        <li>Basic understanding of computer networks and cybersecurity.</li>
                        <li>Introduction to software development methodologies and version control.</li>                      
                    </ul>
                </div>
            ),
        },
        {
            title: "2023 - 2024",
            content: (
                <div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                        Presidential Initiative of Artificial Intelligence and Computing
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-normal mb-4">
                        Web 3.0 and Metaverse Development
                    </p>
                    <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                        <li>Comprehensive study of Blockchain technology and Smart Contracts</li>
                        <li>Development of Decentralized Applications (dApps) using Solidity</li>
                        <li>Building immersive Metaverse experiences and 3D environments</li>
                        <li>Full-stack development with Next.js and modern web technologies</li>
                    </ul>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <Timeline
                data={data}
                title="Education"
                description="My academic journey and certifications in advanced technologies."
            />
        </div>
    );
}
