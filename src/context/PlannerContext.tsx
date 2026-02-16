
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";
import { Schedule } from "@/types/schedule";

type Mode = "live" | "plan";
type View = "day" | "month";

interface PlannerContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;

  view: View;
  setView: (view: View) => void;

  currentDate: dayjs.Dayjs;
  setCurrentDate: (date: dayjs.Dayjs) => void;

  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;

  schedulesForDay: Schedule[];

  updateScheduleTime: (
    id: string,
    newStart: string,
    newEnd: string
  ) => void;
}

const PlannerContext = createContext<PlannerContextType | null>(null);

export function PlannerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("live");
  const [view, setView] = useState<View>("day");
  const [currentDate, setCurrentDate] = useState(dayjs());

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      title: "Heart Surgery",
      doctor: "Dr. Smith",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "09:00",
      endTime: "10:30",
      type: "surgery",
    },
    {
      id: "2",
      title: "Finance Review",
      doctor: "Admin",
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "09:30",
      endTime: "11:00",
      type: "finance",
    },
  ]);

  const schedulesForDay = useMemo(() => {
    return schedules.filter(
      (s) =>
        s.date === currentDate.format("YYYY-MM-DD")
    );
  }, [schedules, currentDate]);

  const updateScheduleTime = (
    id: string,
    newStart: string,
    newEnd: string
  ) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, startTime: newStart, endTime: newEnd }
          : s
      )
    );
  };

  return (
    <PlannerContext.Provider
      value={{
        mode,
        setMode,
        view,
        setView,
        currentDate,
        setCurrentDate,
        schedules,
        setSchedules,
        schedulesForDay,
        updateScheduleTime,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export { PlannerContext };
