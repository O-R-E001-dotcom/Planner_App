
"use client";

import {
  Box,
  Flex,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Home,
  Calendar,
  Profile2User,
  Setting2,
  ClipboardText,
} from "iconsax-reactjs";

interface NavItemProps {
  label: string;
  icon: any;
  active?: boolean;
}

const NavItem = ({ label, icon, active }: NavItemProps) => {
  return (
    <Flex
      align="center"
      gap={3}
      px={4}
      py={3}
      cursor="pointer"
      borderRadius="md"
      bg={active ? "blue.50" : "transparent"}
      color={active ? "blue.600" : "gray.600"}
      _hover={{ bg: "gray.100" }}
      transition="0.2s"
    >
      <Icon as={icon} size="20" />
      <Text fontSize="sm" fontWeight={active ? "semibold" : "normal"}>
        {label}
      </Text>
    </Flex>
  );
};

export default function Sidebar() {
  return (
    <Box
      w="260px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
    >
      <Flex align="center" gap={2} mb={8}>
        <Box w="32px" h="32px" bg="blue.500" borderRadius="full" />
        <Text fontWeight="bold" fontSize="sm">
          excellent care clinics
        </Text>
      </Flex>

      <VStack align="stretch" spacing={2}>
        <NavItem label="Startpagina" icon={Home} />
        <NavItem label="Roster" icon={Profile2User} />
        <NavItem label="Planner" icon={Calendar} active />
        <NavItem label="Instellingen" icon={Setting2} />
        <NavItem label="My to do Protocols" icon={ClipboardText} />
        <NavItem label="Document Management" icon={ClipboardText} />
        <NavItem label="Department News" icon={ClipboardText} />
        <NavItem label="Knowledge Base" icon={ClipboardText} />
        <NavItem label="General News" icon={ClipboardText} />
      </VStack>
    </Box>
  );
}
