
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
      <HStack spacing={4}>
        <Badge
          colorScheme={mode === "live" ? "red" : "gray"}
          borderRadius="full"
          px={3}
          py={1}
        >
          {mode.toUpperCase()}
        </Badge>

        <Text fontSize="lg" fontWeight="semibold">
          Planner
        </Text>
      </HStack>

      <HStack spacing={3}>
        <Button
          size="sm"
          variant={mode === "live" ? "solid" : "outline"}
          onClick={() => setMode("live")}
        >
          Live
        </Button>

        <Button
          size="sm"
          variant={mode === "plan" ? "solid" : "outline"}
          onClick={() => setMode("plan")}
        >
          Plan
        </Button>

        <Calendar size="20" />
      </HStack>
    </Flex>
  );
}
    