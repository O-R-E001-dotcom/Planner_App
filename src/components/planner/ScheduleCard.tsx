
"use client";

import { Box, Text } from "@chakra-ui/react";
import { Schedule } from "@/types/schedule";
import { useDisclosure } from "@chakra-ui/react";
import DetailsDrawer from "./DetailsDrawer";

interface Props {
  schedule: Schedule;
}

export default function ScheduleCard({ schedule }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorMap = {
    surgery: "orange.400",
    specialist: "green.400",
    finance: "yellow.400",
  };

  return (
    <>
      <Box
        position="absolute"
        top="40px"
        left="40px"
        w="220px"
        p={3}
        bg="white"
        borderLeft="4px solid"
        borderColor={colorMap[schedule.type]}
        borderRadius="md"
        boxShadow="md"
        cursor="pointer"
        _hover={{ transform: "scale(1.02)" }}
        transition="0.2s"
        onClick={onOpen}
      >
        <Text fontWeight="semibold">{schedule.title}</Text>
        <Text fontSize="sm" color="gray.600">
          {schedule.doctor}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {schedule.startTime} - {schedule.endTime}
        </Text>
      </Box>

      <DetailsDrawer
        isOpen={isOpen}
        onClose={onClose}
        schedule={schedule}
      />
    </>
  );
}
