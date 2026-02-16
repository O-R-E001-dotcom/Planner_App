
"use client";

import {
  Flex,
  Text,
  Badge,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Calendar } from "iconsax-reactjs";
import { usePlanner } from "@/hooks/usePlanner";

export default function PlannerHeader() {
  const { mode, setMode } = usePlanner();

  return (
    <Flex
      justify="space-between"
      align="center"
      bg="white"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
        <Text fontSize="lg" fontWeight="semibold">
          Planner
        </Text>
        <HStack spacing={5}>
        <Button
          size="sm"
          borderRadius="full"
          variant={mode === "live" ? "solid" : "outline"}
          onClick={() => setMode("live")}
        >
          Live
        </Button>

        <Button
          size="sm"
          borderRadius="full"
          variant={mode === "plan" ? "solid" : "outline"}
          onClick={() => setMode("plan")}
        >
          Description of the planner view
        </Button>

        <Calendar size="20" />
      </HStack>

      

      
    </Flex>
  );
}
