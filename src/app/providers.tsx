
"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PlannerProvider } from "@/context/PlannerContext";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider value={defaultSystem}>
      <PlannerProvider>
        {children}
      </PlannerProvider>
    </ChakraProvider>
  );
}
