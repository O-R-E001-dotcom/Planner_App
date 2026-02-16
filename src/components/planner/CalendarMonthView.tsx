
"use client";

import { Grid, Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { usePlanner } from "@/hooks/usePlanner";

export default function CalendarMonthView() {
  const { currentDate } = usePlanner();

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();

  return (
    <Grid
      templateColumns="repeat(7, 1fr)"
      gap={2}
      p={4}
      bg="white"
    >
      {Array.from({ length: daysInMonth }).map(
        (_, i) => {
          const day = startOfMonth.add(i, "day");

          return (
            <Box
              key={i}
              border="1px solid"
              borderColor="gray.200"
              p={3}
              minH="100px"
              borderRadius="md"
            >
              <Text fontSize="sm" fontWeight="medium">
                {day.format("D")}
              </Text>
            </Box>
          );
        }
      )}
    </Grid>
  );
}
