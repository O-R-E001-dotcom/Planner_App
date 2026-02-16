
export type ScheduleType = "surgery" | "specialist" | "finance";

export interface Schedule {
  id: string;
  title: string;
  doctor: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  type: ScheduleType;
}
