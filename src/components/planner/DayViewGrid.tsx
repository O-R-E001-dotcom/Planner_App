
"use client";

import { Grid, Box, Text, Center } from "@chakra-ui/react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import dayjs from "dayjs";
import { usePlanner } from "@/hooks/usePlanner";
import ScheduleCard from "./ScheduleCard";
import { Schedule } from "@/types/schedule";

const START_HOUR = 8;
const END_HOUR = 18;
const HOUR_HEIGHT = 80;
const SNAP_MINUTES = 15;

function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return dayjs().hour(h).minute(m).format("HH:mm");
}

function snapToGrid(minutes: number) {
  return Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
}

function calculatePosition(schedule: Schedule) {
  const startMinutes = timeToMinutes(schedule.startTime);
  const endMinutes = timeToMinutes(schedule.endTime);
  const dayStartMinutes = START_HOUR * 60;

  const top =
    ((startMinutes - dayStartMinutes) / 60) * HOUR_HEIGHT;

  const height =
    ((endMinutes - startMinutes) / 60) * HOUR_HEIGHT;

  return { top, height };
}

function getCollisionColumns(schedules: Schedule[]) {
  const sorted = [...schedules].sort(
    (a, b) =>
      timeToMinutes(a.startTime) -
      timeToMinutes(b.startTime)
  );

  const columns: Schedule[][] = [];

  sorted.forEach((event) => {
    let placed = false;

    for (const column of columns) {
      const last = column[column.length - 1];

      if (
        timeToMinutes(event.startTime) >=
        timeToMinutes(last.endTime)
      ) {
        column.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) {
      columns.push([event]);
    }
  });

  return columns;
}

export default function DayViewGrid() {
  const {
    schedulesForDay,
    currentDate,
    schedules,
    updateScheduleTime,
  } = usePlanner();

  /* DRAG LOGIC */

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;

    if (!delta.y) return;

    const schedule = schedules.find(
      (s) => s.id === active.id
    );

    if (!schedule) return;

    const movedMinutes =
      (delta.y / HOUR_HEIGHT) * 60;

    const start = timeToMinutes(schedule.startTime);
    const end = timeToMinutes(schedule.endTime);
    const duration = end - start;

    const snappedStart = snapToGrid(start + movedMinutes);

    const newStart = Math.max(
      START_HOUR * 60,
      snappedStart
    );

    const newEnd = newStart + duration;

    updateScheduleTime(
      schedule.id,
      minutesToTime(newStart),
      minutesToTime(newEnd)
    );
  }


  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, i) => START_HOUR + i
  );

  const now = dayjs();
  const currentMinutes =
    now.hour() * 60 + now.minute();
  const dayStartMinutes = START_HOUR * 60;

  const currentTop =
    ((currentMinutes - dayStartMinutes) / 60) *
    HOUR_HEIGHT;

  const columns = getCollisionColumns(schedulesForDay);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Grid templateColumns="80px 1fr" flex="1">
        {/* TIME COLUMN */}
        <Box
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          {hours.map((hour) => (
            <Box
              key={hour}
              h={`${HOUR_HEIGHT}px`}
              borderBottom="1px solid"
              borderColor="gray.100"
              px={2}
              pt={1}
            >
              <Text fontSize="xs" color="gray.500">
                {dayjs()
                  .hour(hour)
                  .minute(0)
                  .format("HH:mm")}
              </Text>
            </Box>
          ))}
        </Box>

        {/* GRID */}
        <Box position="relative" bg="white">
          {/* Hour lines */}
          {hours.map((hour) => (
            <Box
              key={hour}
              position="absolute"
              top={`${
                (hour - START_HOUR) * HOUR_HEIGHT
              }px`}
              left={0}
              right={0}
              height="1px"
              bg="gray.100"
            />
          ))}

          {/* Current Time Indicator */}
          {now.isSame(currentDate, "day") && (
            <>
              <Box
                position="absolute"
                top={`${currentTop}px`}
                left="0"
                right="0"
                height="2px"
                bg="red.400"
                zIndex={10}
              />
              <Box
                position="absolute"
                top={`${currentTop - 4}px`}
                left="-4px"
                w="8px"
                h="8px"
                bg="red.500"
                borderRadius="full"
                zIndex={11}
              />
            </>
          )}

          {/* Empty state */}
          {schedulesForDay.length === 0 && (
            <Center
              position="absolute"
              inset={0}
              color="gray.400"
            >
              <Text>No schedules for this day</Text>
            </Center>
          )}

          {/* Render events */}
          {columns.map((column, colIndex) =>
            column.map((schedule) => {
              const { top, height } =
                calculatePosition(schedule);

              const widthPercent =
                100 / columns.length;

              return (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  top={top}
                  height={height}
                  left={`${
                    colIndex * widthPercent
                  }%`}
                  width={`${widthPercent}%`}
                />
              );
            })
          )}
        </Box>
      </Grid>
    </DndContext>
  );
}
