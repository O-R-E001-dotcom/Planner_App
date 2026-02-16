
"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { liveSchedules, plannedSchedules } from "@/data/mockSchedules";
import { ViewMode, CalendarView } from "@/types/schedule";

export function usePlanner() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [mode, setMode] = useState<ViewMode>("live");
  const [view, setView] = useState<CalendarView>("day");

  const schedules =
    mode === "live" ? liveSchedules : plannedSchedules;

  const schedulesForDay = schedules.filter((s) =>
    dayjs(s.date).isSame(currentDate, "day")
  );

  const nextDay = () => setCurrentDate((prev) => prev.add(1, "day"));
  const prevDay = () => setCurrentDate((prev) => prev.subtract(1, "day"));

  return {
    currentDate,
    mode,
    view,
    setMode,
    setView,
    schedulesForDay,
    nextDay,
    prevDay,
  };
}
