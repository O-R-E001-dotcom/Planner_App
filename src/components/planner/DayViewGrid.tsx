
"use client";

import { Grid, Box, Text } from "@chakra-ui/react";
import { usePlanner } from "@/hooks/usePlanner";
import ScheduleCard from "./ScheduleCard";

const hours = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
];

export default function DayViewGrid() {
  const { schedulesForDay } = usePlanner();

  return (
    <Grid templateColumns="80px 1fr" flex="1" bg="gray.50">
      {/* Time Column */}
      <Box bg="white" borderRight="1px solid" borderColor="gray.200">
        {hours.map((hour) => (
          <Box key={hour} h="100px" borderBottom="1px solid" borderColor="gray.100" p={2}>
            <Text fontSize="xs" color="gray.500">
              {hour}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Schedule Column */}
      <Box position="relative">
        {schedulesForDay.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </Box>
    </Grid>
  );
}
