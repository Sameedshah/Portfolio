"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarWithTimePresetsProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  time: string | undefined
  setTime: (time: string) => void
}

export function CalendarWithTimePresets({
  date,
  setDate,
  time,
  setTime,
}: CalendarWithTimePresetsProps) {
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg">
      <div className="flex-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div className="flex flex-col gap-2 sm:w-48">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2">
          Available Times
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {timeSlots.map((slot) => (
            <Button
              key={slot}
              variant={time === slot ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                time === slot && "bg-primary text-primary-foreground"
              )}
              onClick={() => setTime(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
