
"use client";

import { Box, Flex } from "@chakra-ui/react";
import { usePlanner } from "@/hooks/usePlanner";
import PlannerHeader from "./PlannerHeader";
import DayViewGrid from "./DayViewGrid";
import CalendarMonthView from "./CalendarMonthView";

export default function PlannerPage() {
  const { view } = usePlanner(); // <- make sure this exists in your context

  return (
    <Flex direction="column" height="100vh" bg="gray.50">
      <PlannerHeader />

      <Box flex="1" position="relative" overflow="hidden">
        {view === "day" ? (
          <DayViewGrid />
        ) : (
          <CalendarMonthView />
        )}
      </Box>
    </Flex>
  );
}
