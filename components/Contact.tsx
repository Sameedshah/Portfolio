"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarWithTimePresets } from "@/components/calendar-with-time-pressets";
import ScrollReveal from "@/components/ScrollReveal";

export function Contact() {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState<string | undefined>();

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<null | string>(null); // Notification text

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const meetingSchedule =
        date && time
            ? `${date.toDateString()} at ${time}`
            : "No meeting scheduled";

    const templateParams = {
        name,
        company,
        message,
        meeting: meetingSchedule,
    };

    try {
        const result = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            templateParams,
            {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
            }
        );

        console.log("EMAILJS SUCCESS:", result);

        setToast("Message Sent!");
        setTimeout(() => setToast(null), 3000);

        setName("");
        setCompany("");
        setMessage("");

    } catch (error) {
        console.error("EMAILJS ERROR:", error);

        setToast("Failed to send message");
        setTimeout(() => setToast(null), 3000);
    } finally {
        setLoading(false);
    }
};

    return (
        <section className="dark w-full min-h-screen bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden">

            {/* TOAST NOTIFICATION */}
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] bg-white text-black px-6 py-3 rounded-lg shadow-lg font-semibold transition-all duration-500">
                    {toast}
                </div>
            )}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex justify-center mb-12">
                    <ScrollReveal textClassName="text-white text-center font-bold text-4xl md:text-5xl lg:text-6xl">
                        Let&apos;s Collab
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* FORM SECTION */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>

                            {/* Company */}
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-gray-200">Company</Label>
                                <Input
                                    id="company"
                                    placeholder="Acme Inc."
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-200">Message</Label>
                                <Textarea
                                    id="message"
                                    required
                                    placeholder="Tell me about your project..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="min-h-[150px] bg-black/20 border-white/10 text-white placeholder:text-gray-500"
                                />
                            </div>

                            <Button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold py-6 text-lg"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>

                    {/* CALENDAR SECTION */}
                    <div className="space-y-6">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
                            <h3 className="text-xl font-semibold text-white mb-4">Schedule a Meeting (Optional)</h3>
                            <p className="text-gray-400 text-sm mb-6">Pick a date and time that works for you.</p>

                            <CalendarWithTimePresets
                                date={date}
                                setDate={setDate}
                                time={time}
                                setTime={setTime}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
