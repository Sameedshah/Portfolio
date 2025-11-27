"use client"

import { Home, User, Briefcase, FileText, Mail } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
    const navItems = [
        { name: 'Home', url: '#hero', icon: Home },
        { name: 'About', url: '#about', icon: User },
        { name: 'Projects', url: '#projects', icon: Briefcase },
        { name: 'Resume', url: '#resume', icon: FileText },
        { name: 'Contact', url: '#contact', icon: Mail },
    ]

    return <NavBar items={navItems} />
}