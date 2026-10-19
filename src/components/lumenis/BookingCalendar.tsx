"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------- types ----------------------------------- */

type BookingDetails = {
  date: Date;
  time: string;
};

/* --------------------------------- config ---------------------------------- */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const TIME_SLOTS = [
  "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am",
  "10:00am", "10:15am", "10:30am", "10:45am", "11:00am", "11:15am",
];

/* -------------------------------- component -------------------------------- */

export default function BookingCalendar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [confirmed, setConfirmed] = useState<BookingDetails | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ---- set today on client side only ---- */
  useEffect(() => {
    setToday(new Date());
  }, []);

  /* ---- entrance animation ---- */
  useEffect(() => {
    if (!today) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".booking-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".booking-card", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [today]);

  /* ---- calendar math ---- */
  const todayOrFallback = today ?? new Date(2026, 9, 19); // fallback to Oct 19, 2026

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startPad = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: Date | null; dayNum: number | null; isToday: boolean; isPast: boolean }[] = [];

    // Padding for the first week
    for (let i = 0; i < startPad; i++) {
      days.push({ date: null, dayNum: null, isToday: false, isPast: false });
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      const isToday =
        d === todayOrFallback.getDate() &&
        currentMonth === todayOrFallback.getMonth() &&
        currentYear === todayOrFallback.getFullYear();
      const isPast = date < new Date(todayOrFallback.getFullYear(), todayOrFallback.getMonth(), todayOrFallback.getDate());
      days.push({ date, dayNum: d, isToday, isPast });
    }

    return days;
  }, [currentMonth, currentYear, todayOrFallback]);

  /* ---- available dates (Mon–Fri, not past) ---- */
  const isAvailable = useCallback(
    (date: Date) => {
      const day = date.getDay();
      const todayStart = new Date(todayOrFallback.getFullYear(), todayOrFallback.getMonth(), todayOrFallback.getDate());
      return day !== 0 && day !== 6 && date >= todayStart;
    },
    [todayOrFallback]
  );

  /* ---- navigation ---- */
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  /* ---- selection ---- */
  const handleDateSelect = (date: Date) => {
    if (!isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setConfirmed(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setConfirmed(null);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setConfirmed({ date: selectedDate, time: selectedTime });
    }
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setConfirmed(null);
  };

  /* ---- format helpers ---- */
  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const formatTime24h = (time: string) => {
    const [hour, min] = time.split(":").map(Number);
    const isPm = time.includes("pm");
    let h = hour;
    if (isPm && h !== 12) h += 12;
    if (!isPm && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  };

  /* ---- next 5 available days for quick pick ---- */
  const availableDays = useMemo(() => {
    const days: Date[] = [];
    const cursor = new Date(todayOrFallback.getFullYear(), todayOrFallback.getMonth(), todayOrFallback.getDate());
    while (days.length < 5) {
      if (isAvailable(cursor)) days.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    return days;
  }, [isAvailable, todayOrFallback]);

  return (
    <section ref={sectionRef} id="booking-section" className="section bg-[#f4f4f2]">
      <div className="section-spacing">
        <div className="container">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="paragraph-title text-neutral-400">Book a meeting</p>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-black md:text-5xl">
              Schedule a Call
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-500">
              Pick a time that works. I&apos;ll send a calendar invite with a video link.
            </p>
          </div>

          {/* Booking card */}
          <div
            ref={cardRef}
            className="booking-card mx-auto grid overflow-hidden rounded-xl border border-[#e0e0de] bg-white lg:grid-cols-[240px_1fr_300px]"
          >
            {/* ---- Left sidebar ---- */}
            <div className="hidden border-r border-[#e0e0de] p-6 lg:block">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  M
                </span>
                <span className="text-sm font-semibold text-black">Mehfil</span>
              </div>

              {/* Meeting type */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-black">15 Min Meeting</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Welcome to my calendar. Pick a time to chat.
                </p>
              </div>

              {/* Meta */}
              <div className="mt-6 flex flex-col gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>15m</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                    <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
                  </svg>
                  <span>Video Call</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Asia / Karachi</span>
                </div>
              </div>
            </div>

            {/* ---- Center: calendar ---- */}
            <div className="p-6">
              {/* Month header */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={goToPrevMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100"
                    aria-label="Previous month"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100"
                    aria-label="Next month"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Day names */}
              <div className="mb-2 grid grid-cols-7 text-center">
                {DAY_NAMES.map((d) => (
                  <span key={d} className="text-xs font-medium text-neutral-400">
                    {d}
                  </span>
                ))}
              </div>

              {/* Date grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  const date = day.date;
                  const dayNum = day.dayNum;
                  if (!date || !dayNum) {
                    return <div key={`pad-${i}`} className="aspect-square" />;
                  }

                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();

                  const available = isAvailable(date);
                  const isPast = day.isPast;

                  return (
                    <button
                      key={`day-${i}`}
                      onClick={() => handleDateSelect(date)}
                      disabled={!available}
                      className={`relative flex aspect-square items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-black text-white"
                          : available
                            ? "bg-[#f0f0ee] text-black hover:bg-[#e4e4e2]"
                            : isPast
                              ? "cursor-default text-neutral-300"
                              : "cursor-default text-neutral-300"
                      }`}
                      aria-label={`${date.toDateString()}${available ? " - available" : " - unavailable"}`}
                    >
                      {dayNum}
                      {day.isToday && !isSelected && (
                        <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick pick */}
              <div className="mt-6 flex flex-wrap gap-2">
                {availableDays.map((date) => {
                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- Right: time slots ---- */}
            <div className="border-l border-[#e0e0de] p-6">
              {/* Selected date */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">
                  {selectedDate ? formatDate(selectedDate) : "Select a date"}
                </h3>
                <div className="flex rounded-full border border-neutral-200 p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setIs24Hour(false)}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      !is24Hour ? "bg-black text-white" : "text-neutral-500"
                    }`}
                  >
                    12h
                  </button>
                  <button
                    onClick={() => setIs24Hour(true)}
                    className={`rounded-full px-2.5 py-1 transition-colors ${
                      is24Hour ? "bg-black text-white" : "text-neutral-500"
                    }`}
                  >
                    24h
                  </button>
                </div>
              </div>

              {/* Time slots */}
              <div className="mt-4 flex max-h-[320px] flex-col gap-1.5 overflow-y-auto pr-1">
                {selectedDate ? (
                  TIME_SLOTS.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                        }`}
                      >
                        {is24Hour ? formatTime24h(time) : time}
                      </button>
                    );
                  })
                ) : (
                  <div className="flex h-[280px] flex-col items-center justify-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f0ee]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </div>
                    <p className="mt-3 text-sm text-neutral-400">
                      Pick a date to see
                      <br />
                      available times
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm button */}
              {selectedDate && selectedTime && !confirmed && (
                <button
                  onClick={handleConfirm}
                  className="mt-4 w-full rounded-full bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Confirm — {formatDate(selectedDate)} at {is24Hour ? formatTime24h(selectedTime) : selectedTime}
                </button>
              )}

              {/* Confirmation state */}
              {confirmed && (
                <div className="mt-4 rounded-lg border border-[#e0e0de] bg-[#f4f4f2] p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-black">Meeting confirmed</p>
                      <p className="text-xs text-neutral-500">
                        {formatDate(confirmed.date)} at {is24Hour ? formatTime24h(confirmed.time) : confirmed.time}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500">
                    A calendar invite with a video link will be sent to you.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-xs font-medium text-neutral-500 underline underline-offset-2 hover:text-black"
                  >
                    Book another time
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom note */}
          <p className="mt-6 text-center text-xs text-neutral-400">
            All times shown in Asia / Karachi (UTC+5). Free 15-minute introductory call.
          </p>
        </div>
      </div>
    </section>
  );
}
