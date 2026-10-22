"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------- config ---------------------------------- */

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

const TIME_SLOTS = ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"];

const features = [
  {
    title: "30 Min Call",
    description: "Project discussion",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "Calendar",
    description: "Pick a time that works",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2.5" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Confirmation",
    description: "Get a meeting link",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M9 12l2 2 4.5-5" />
        <path d="M21 12a9 9 0 1 1-4.2-7.6" />
      </svg>
    ),
  },
];

/* -------------------------------- component -------------------------------- */

export default function BookingCalendar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>("5:00 PM");
  const [confirmed, setConfirmed] = useState<null | boolean>(null);
  const [needsPick, setNeedsPick] = useState(false);

  /* ---- set today on client side only ---- */
  useEffect(() => {
    const now = new Date();
    setToday(now);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
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

    for (let i = 0; i < startPad; i++) {
      days.push({ date: null, dayNum: null, isToday: false, isPast: false });
    }

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

  /* ---- available dates (Mon-Fri, not past) ---- */
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
    setConfirmed(null);
    setNeedsPick(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setConfirmed(null);
    setNeedsPick(false);
  };

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setConfirmed(true);
      return;
    }
    setNeedsPick(true);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime("5:00 PM");
    setConfirmed(null);
    setNeedsPick(false);
  };

  /* ---- format helpers ---- */
  const formatDate = (date: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  return (
    <section ref={sectionRef} className="section bg-[#f6f6f3]">
      <div className="section-spacing">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[40%_1fr]">
            {/* ---------- Left: copy ---------- */}
            <div className="fade-in-on-scroll gap-1">
              <p className="text-[11.5px] uppercase tracking-[0.18em] text-[#8ba356]">
                Book a Call
              </p>
              <h2
                className="text-[clamp(29px,2.9vw,40px)] font-medium tracking-[-0.02em] text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Schedule a Call
              </h2>
              <p className="max-w-sm text-[13.5px] leading-relaxed text-neutral-500">
                Discuss your project, ask questions, or just say hello.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
                {features.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary">
                      {f.icon}
                    </span>
                    <span>
                      <p className="text-[12.5px] font-semibold leading-tight text-primary">{f.title}</p>
                      <p className="mt-1 text-[11.5px] leading-tight text-neutral-500">{f.description}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Right: calendar composition ---------- */}
            <div className="booking-card grid grid-cols-[1fr_260px] gap-6 items-center relative fade-in-on-scroll flex-1">
              {/* white calendar card */}
              <div className="rounded-2xl bg-white p-5 shadow-[0_30px_70px_rgba(20,38,28,0.14)]"> {/* taste-skill-ignore: floating mock card over the band */}
                <div className="grid gap-6 sm:grid-cols-[1fr_100px]">
                  {/* mini month calendar */}
                  <div>
                    <p className="text-[12.5px] font-semibold text-primary">Select a date &amp; time</p>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-[11px] text-neutral-500">
                        {MONTH_NAMES[currentMonth]} {currentYear}
                      </p>
                      <div className="flex gap-1.5">
                        <button
                          onClick={goToPrevMonth}
                          aria-label="Previous month"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-[#eef2ea] hover:text-primary"
                        >
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                            <path d="M10 3 5 8l5 5" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNextMonth}
                          aria-label="Next month"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-[#eef2ea] hover:text-primary"
                        >
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                            <path d="m6 3 5 5-5 5" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-7 gap-1">
                      {DAY_LETTERS.map((d, i) => (
                        <span key={`day-${i}`} className="text-center text-[10px] font-medium text-neutral-400">
                          {d}
                        </span>
                      ))}
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

                        return (
                          <button
                            key={`cal-${i}`}
                            onClick={() => handleDateSelect(date)}
                            disabled={!available}
                            className={`relative flex aspect-square items-center justify-center rounded-full text-[11px] font-medium transition-colors ${
                              isSelected
                                ? "bg-secondary font-semibold text-primary"
                                : available
                                  ? "text-primary hover:bg-[#edf2e7]"
                                  : "text-neutral-300"
                            }`}
                            aria-label={`${date.toDateString()}${available ? " - available" : " - unavailable"}`}
                          >
                            {dayNum}
                            {day.isToday && !isSelected && (
                              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-secondary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* time slot list */}
                  <div className="flex flex-col gap-1.5 sm:rounded-xl sm:px-2 sm:py-1.5">
                    {TIME_SLOTS.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`rounded-xl py-2 text-center text-[11px] font-medium transition-colors ${
                            isSelected
                              ? "bg-secondary font-semibold text-primary"
                              : "border border-neutral-200 text-neutral-600 hover:border-secondary hover:text-primary"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* dark promo card */}
              <aside className="relative mt-4 rounded-2xl bg-[#132b1e] p-5 shadow-[0_30px_70px_rgba(20,38,28,0.35)] sm:mt-0"> {/* taste-skill-ignore: overlapping floating promo card */}
                {confirmed ? (
                  <>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <h3 className="mt-3 text-[16px] font-semibold text-white">Call booked</h3>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#9db4a6]">
                      {selectedDate ? formatDate(selectedDate) : ""} at {selectedTime}. A calendar
                      invite with a video link is on its way.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-4 text-[11px] font-medium text-secondary underline underline-offset-2 hover:text-[#c9fa5e]"
                    >
                      Book another time
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-[16px] font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                      Free 30 min
                    </h3>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#9db4a6]">
                      Let&apos;s talk about your project.
                    </p>
                    {selectedDate && selectedTime && (
                      <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-[11px] text-[#c7d8cd]">
                        {formatDate(selectedDate)} · {selectedTime}
                      </p>
                    )}
                    {needsPick && !selectedDate && (
                      <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-[12px] text-[#c7d8cd]">
                        Pick a date on the calendar first.
                      </p>
                    )}
                    {needsPick && selectedDate && !selectedTime && (
                      <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-[12px] text-[#c7d8cd]">
                        Choose a time slot first.
                      </p>
                    )}
                    <button
                      onClick={handleBook}
                      className="mt-4 flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-[11.5px] font-semibold text-primary transition-colors hover:bg-[#c9fa5e]"
                    >
                      Book a Call
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
