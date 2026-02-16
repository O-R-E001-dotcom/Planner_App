
"use client";

import {
  Drawer,
  Portal,
  Text,
  Button,
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
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              {schedule.title}
            </Drawer.Header>

            <Drawer.Body>
              <Text mb={2}>
                Doctor: {schedule.doctor}
              </Text>

              <Text mb={2}>
                Time: {schedule.startTime} -{" "}
                {schedule.endTime}
              </Text>

              <Text mb={4}>
                Type: {schedule.type}
              </Text>

              <Button onClick={onClose}>
                Close
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
