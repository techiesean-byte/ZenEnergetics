import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── Types ─────────────────────────────────────────────────────── */
export interface SelectedSlot { date: Date; time: string; label: string; }

interface Props {
  onSelect: (slot: SelectedSlot | null) => void;
  selected: SelectedSlot | null;
}

/* ── Config ─────────────────────────────────────────────────────── */
const SLOT_TIMES = [
  { time: "09:00", label: "9:00 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "16:00", label: "4:00 PM" },
  { time: "17:00", label: "5:00 PM" },
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* ── Deterministic availability seeded by date+hour ────────────── */
function slotStatus(date: Date, hour: number): "booked" | "limited" | "open" {
  const seed = date.getFullYear() * 100000 + (date.getMonth()+1) * 1000 + date.getDate() * 10 + hour;
  const v = ((seed * 1103515245 + 12345) >>> 0) % 100;
  if (v < 38) return "booked";
  if (v < 58) return "limited";
  return "open";
}

function getWeekDays(anchor: Date): Date[] {
  const monday = new Date(anchor);
  const day = monday.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isPast(date: Date): boolean {
  const today = new Date(); today.setHours(0,0,0,0);
  return date < today;
}

/* ── Component ──────────────────────────────────────────────────── */
export function AvailabilityWidget({ onSelect, selected }: Props) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [weekAnchor, setWeekAnchor] = useState<Date>(today);
  const [activeDay, setActiveDay] = useState<Date>(today);

  const weekDays = useMemo(() => getWeekDays(weekAnchor), [weekAnchor]);

  // Slots for active day
  const daySlots = useMemo(() =>
    SLOT_TIMES.map(({ time, label }) => ({
      time, label,
      status: isPast(activeDay) ? "booked" as const : slotStatus(activeDay, parseInt(time)),
    })),
    [activeDay]
  );

  const openCount = useMemo(() =>
    weekDays.flatMap(d => isPast(d) ? [] : SLOT_TIMES.map(({ time }) => slotStatus(d, parseInt(time))))
      .filter(s => s !== "booked").length,
    [weekDays]
  );

  function prevWeek() {
    const d = new Date(weekAnchor); d.setDate(d.getDate() - 7); setWeekAnchor(d);
  }
  function nextWeek() {
    const d = new Date(weekAnchor); d.setDate(d.getDate() + 7); setWeekAnchor(d);
  }

  function handleSlotClick(slot: typeof daySlots[0]) {
    if (slot.status === "booked") return;
    if (selected && isSameDay(selected.date, activeDay) && selected.time === slot.time) {
      onSelect(null);
    } else {
      onSelect({ date: activeDay, time: slot.time, label: slot.label });
    }
  }

  const isPrevDisabled = weekDays[0] <= today;

  return (
    <div className="rounded-2xl border border-secondary/50 bg-card shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-secondary/60 to-secondary/20 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-0.5">Live Availability</p>
          <h3 className="font-serif text-lg font-light text-foreground">
            {MONTH_NAMES[weekDays[0].getMonth()]} {weekDays[0].getDate()} –{" "}
            {MONTH_NAMES[weekDays[6].getMonth()]} {weekDays[6].getDate()},{" "}
            {weekDays[6].getFullYear()}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prevWeek}
            disabled={isPrevDisabled}
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/60 hover:bg-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextWeek}
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/60 hover:bg-secondary/50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Urgency bar ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={openCount}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={`px-5 py-2 flex items-center gap-2 text-xs font-medium ${
            openCount <= 5
              ? "bg-amber-50 text-amber-700 border-b border-amber-100"
              : "bg-primary/5 text-primary border-b border-primary/10"
          }`}
        >
          <Zap size={12} className="flex-shrink-0" />
          {openCount <= 5
            ? `Only ${openCount} slot${openCount === 1 ? "" : "s"} remaining this week — book now to secure your time.`
            : `${openCount} slots available this week.`}
        </motion.div>
      </AnimatePresence>

      <div className="p-4 space-y-4">

        {/* ── Day selector ── */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const past = isPast(day);
            const isToday = isSameDay(day, today);
            const isActive = isSameDay(day, activeDay);
            const dayOpen = !past && SLOT_TIMES.some(({ time }) => slotStatus(day, parseInt(time)) !== "booked");

            return (
              <button
                key={day.toISOString()}
                onClick={() => !past && setActiveDay(day)}
                disabled={past}
                className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-all text-center ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : past
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-secondary/50 text-foreground cursor-pointer"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide opacity-70">
                  {DAY_LABELS[day.getDay()]}
                </span>
                <span className={`text-sm font-semibold ${isToday && !isActive ? "text-primary" : ""}`}>
                  {day.getDate()}
                </span>
                {/* Availability dot */}
                {!past && (
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-primary-foreground/60" :
                    dayOpen ? "bg-primary/50" : "bg-muted-foreground/30"
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Time slots ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay.toISOString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 gap-2"
          >
            {daySlots.map((slot) => {
              const isSelected = selected &&
                isSameDay(selected.date, activeDay) &&
                selected.time === slot.time;

              return (
                <button
                  key={slot.time}
                  onClick={() => handleSlotClick(slot)}
                  disabled={slot.status === "booked"}
                  data-testid={`slot-${slot.time}`}
                  className={`
                    relative flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
                    ${isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                      : slot.status === "booked"
                      ? "bg-muted/40 text-muted-foreground/40 border-border/40 line-through cursor-not-allowed"
                      : slot.status === "limited"
                      ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                      : "bg-background text-foreground border-border hover:bg-secondary/30 hover:border-secondary/60"
                    }
                  `}
                >
                  <span className="flex items-center gap-1.5">
                    {isSelected
                      ? <CheckCircle2 size={13} />
                      : <Clock size={13} className={slot.status === "booked" ? "opacity-30" : ""} />
                    }
                    {slot.label}
                  </span>
                  {slot.status === "limited" && !isSelected && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                      1 left
                    </span>
                  )}
                  {slot.status === "open" && !isSelected && (
                    <span className="text-[10px] text-muted-foreground/60">Open</span>
                  )}
                  {slot.status === "booked" && (
                    <span className="text-[10px]">Full</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Legend ── */}
        <div className="flex items-center gap-4 pt-1 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary/30 inline-block" />Available</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-300 inline-block" />1 spot left</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25 inline-block" />Full</span>
        </div>

        {/* ── Selected slot summary ── */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 mt-1">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Selected slot</p>
                  <p className="text-sm font-semibold text-foreground">
                    {DAY_LABELS[selected.date.getDay()]},{" "}
                    {MONTH_NAMES[selected.date.getMonth()]} {selected.date.getDate()} · {selected.label}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground h-7 px-2"
                  onClick={() => onSelect(null)}
                >
                  Change
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
