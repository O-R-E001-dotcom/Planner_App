
"use client";

import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { usePlanner } from "@/hooks/usePlanner";

export default function DateNavigation() {
  const { currentDate, nextDay, prevDay } = usePlanner();

  return (
    <Flex
      align="center"
      justify="space-between"
      bg="white"
      px={6}
      py={3}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex align="center" gap={3}>
        <IconButton
          aria-label="Previous Day"
          icon={<ArrowLeft2 size="18" />}
          size="sm"
          variant="ghost"
          onClick={prevDay}
        />

        <Text fontWeight="medium">
          {currentDate.format("dddd, MMM D YYYY")}
        </Text>

        <IconButton
          aria-label="Next Day"
          icon={<ArrowRight2 size="18" />}
          size="sm"
          variant="ghost"
          onClick={nextDay}
        />
      </Flex>
    </Flex>
  );
}
