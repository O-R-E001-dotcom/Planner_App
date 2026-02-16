
"use client";

import { Grid, Box, Text, Center } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import dayjs from "dayjs";
import { usePlanner } from "@/hooks/usePlanner";
import ScheduleCard from "./ScheduleCard";
import { Schedule } from "@/types/schedule";

const START_HOUR = 8;
const END_HOUR = 18;
const HOUR_HEIGHT = 80;

function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
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

function getOverlappingGroups(schedules: Schedule[]) {
  const sorted = [...schedules].sort(
    (a, b) =>
      timeToMinutes(a.startTime) -
      timeToMinutes(b.startTime)
  );

  const groups: Schedule[][] = [];

  sorted.forEach((schedule) => {
    let placed = false;

    for (const group of groups) {
      const overlaps = group.some((existing) => {
        const startA = timeToMinutes(schedule.startTime);
        const endA = timeToMinutes(schedule.endTime);
        const startB = timeToMinutes(existing.startTime);
        const endB = timeToMinutes(existing.endTime);

        return startA < endB && endA > startB;
      });

      if (overlaps) {
        group.push(schedule);
        placed = true;
        break;
      }
    }

    if (!placed) {
      groups.push([schedule]);
    }
  });

  return groups;
}

export default function DayViewGrid() {
  const { schedulesForDay, currentDate } = usePlanner();

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

  const overlappingGroups =
    getOverlappingGroups(schedulesForDay);

  return (
    <DndContext>
      <Grid
        templateColumns="80px 1fr"
        flex="1"
        bg="gray.50"
        overflow="hidden"
      >
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

        {/* SCHEDULE GRID */}
        <Box
          position="relative"
          overflowY="auto"
          bg="white"
        >
          {/* Hour separator lines */}
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

          {/* Empty State */}
          {schedulesForDay.length === 0 && (
            <Center
              position="absolute"
              inset={0}
              color="gray.400"
            >
              <Text>No schedules for this day</Text>
            </Center>
          )}

          {/* Render Overlapping Groups */}
          {overlappingGroups.map((group) =>
            group.map((schedule, index) => {
              const { top, height } =
                calculatePosition(schedule);
              const widthPercent =
                100 / group.length;

              return (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  top={top}
                  height={height}
                  left={`${index * widthPercent}%`}
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
