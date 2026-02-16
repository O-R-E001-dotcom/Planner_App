
"use client";

import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { Schedule } from "@/types/schedule";
import DetailsDrawer from "./DetailsDrawer";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  schedule: Schedule;
  top: number;
  height: number;
  left: string;
  width: string;
}

export default function ScheduleCard({
  schedule,
  top,
  height,
  left,
  width,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const colorMap: Record<string, string> = {
    surgery: "orange.400",
    specialist: "green.400",
    finance: "yellow.400",
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: schedule.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <>
      <Box
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        position="absolute"
        top={`${top}px`}
        left={left}
        width={width}
        height={`${height}px`}
        bg="white"
        borderLeft="4px solid"
        borderColor={colorMap[schedule.type] ?? "blue.400"}
        borderRadius="md"
        boxShadow="sm"
        p={3}
        cursor={isDragging ? "grabbing" : "grab"}
        transition="top 0.2s ease, height 0.2s ease"

        _hover={{
          boxShadow: "md",
        }}
        style={style}
        onClick={(e) => {
          if (!isDragging) onOpen();
        }}
      >
        <Text fontWeight="semibold" fontSize="sm">
          {schedule.title}
        </Text>
        <Text fontSize="xs" color="gray.600">
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
