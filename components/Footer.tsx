"use client";

import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: "https://github.com/Sameedshah", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/muhammad-sameed-shah", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com/Sameeddev", label: "Twitter" },
        { icon: Mail, href: "mailto:sameedshahdev@gmail.com", label: "Email" },
    ];

    const quickLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Resume", href: "#resume" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="relative w-full bg-black text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Sameed Shah
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
                            Building scalable, AI-automated, and intelligent web solutions with Next.js, n8n and Supabase — powered by Agentic AI.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="group relative p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border-white/20"
                                >
                                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
                        <div className="space-y-3 text-sm md:text-base">
                            <p className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                                sameedshahdev@gmail.com
                            </p>
                            <p className="text-gray-400">
                                Available for freelance opportunities
                            </p>
                            <Button
                                onClick={() => {
                                    const contactSection = document.getElementById('contact');
                                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-300"
                            >
                                Let&apos;s Collaborate
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="bg-black px-4">
                            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © {currentYear} Sameed Shah. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            Terms of Service
                        </a>
                    </div>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border-white/20"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300 group-hover:-translate-y-1 transform" />
                    </button>
                </div>

                {/* Crafted with love
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs md:text-sm">
                        Crafted with <span className="text-red-500 animate-pulse">♥</span> using Next.js & Tailwind CSS
                    </p>
                </div> */}
            </div>
        </footer>
    );
}
