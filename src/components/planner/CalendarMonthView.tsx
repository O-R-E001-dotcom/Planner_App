
"use client";

import {
  Grid,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { usePlanner } from "@/hooks/usePlanner";

export default function CalendarMonthView() {
  const {
    currentDate,
    setCurrentDate,
    schedules,
  } = usePlanner();

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const startDay = startOfMonth.startOf("week");
  const endDay = endOfMonth.endOf("week");

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay)) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      autoRows="120px"
      gap={2}
      p={4}
    >
      {days.map((d) => {
        const daySchedules = schedules.filter(
          (s) =>
            s.date === d.format("YYYY-MM-DD")
        );

        return (
          <Box
            key={d.toString()}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            p={2}
            cursor="pointer"
            onClick={() => setCurrentDate(d)}
          >
            <Text
              fontSize="sm"
              fontWeight={
                d.isSame(currentDate, "day")
                  ? "bold"
                  : "normal"
              }
            >
              {d.date()}
            </Text>

            <VStack
              align="start"
              spacing={1}
              mt={1}
            >
              {daySchedules.slice(0, 2).map((s) => (
                <Box
                  key={s.id}
                  fontSize="xs"
                  bg="gray.100"
                  px={1}
                  borderRadius="sm"
                >
                  {s.title}
                </Box>
              ))}
            </VStack>
          </Box>
        );
      })}
    </Grid>
  );
}
