
export type ViewMode = "live" | "plan";
export type CalendarView = "day" | "month";

export interface Schedule {
  id: string;
  title: string;
  doctor: string;
  startTime: string;
  endTime: string;
  date: string;
  type: "surgery" | "specialist" | "finance";
}
