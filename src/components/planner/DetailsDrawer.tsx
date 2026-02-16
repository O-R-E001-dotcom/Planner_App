
"use client";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
} from "@chakra-ui/react";
import { Schedule } from "@/types/schedule";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schedule: Schedule;
}

export default function DetailsDrawer({
  isOpen,
  onClose,
  schedule,
}: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>{schedule.title}</DrawerHeader>
        <DrawerBody>
          <Text>Doctor: {schedule.doctor}</Text>
          <Text mt={2}>
            Time: {schedule.startTime} - {schedule.endTime}
          </Text>
          <Text mt={2}>Date: {schedule.date}</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
