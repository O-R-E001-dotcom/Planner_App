
"use client";

import { Flex } from "@chakra-ui/react";
import Sidebar from "@/components/layout/Sidebar";
import PlannerPage from "@/components/planner/PlannerPage";

export default function Home() {
  return (
    <Flex h="100vh">
      <Sidebar />
      <PlannerPage />
    </Flex>
  );
}
