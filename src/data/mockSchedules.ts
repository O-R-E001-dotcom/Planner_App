
import { Schedule } from "@/types/schedule";

export const liveSchedules: Schedule[] = [
  {
    id: "1",
    title: "Surgery",
    doctor: "Hao de Gast",
    startTime: "11:00",
    endTime: "13:00",
    date: "2026-09-08",
    type: "surgery",
  },
  {
    id: "2",
    title: "Pijnspecialist",
    doctor: "Diane Lane",
    startTime: "11:00",
    endTime: "12:00",
    date: "2025-09-08",
    type: "specialist",
  },
];

export const plannedSchedules: Schedule[] = [
  {
    id: "3",
    title: "Finance Review",
    doctor: "Diane Lane",
    startTime: "12:00",
    endTime: "14:00",
    date: "2025-09-09",
    type: "finance",
  },
];
