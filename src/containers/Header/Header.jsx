import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Header() {
  const { toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue("white", "gray.800");
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      padding={4}
      height={16}
      boxShadow="base"
      bg={headerBg}
    >
      <Heading padding={"0 1rem"}>Task Timer</Heading>
      <Button onClick={toggleColorMode}>
        {useColorModeValue(<MoonIcon />, <SunIcon />)}
      </Button>
    </Flex>
  );
}

export default Header;
