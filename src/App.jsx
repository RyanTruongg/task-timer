import {
  Container,
  ColorModeScript,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Header from "./containers/Header";
import theme from "./theme";
import TaskList from "./containers/TaskList";

function App() {
  const appBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box bg={appBg} minH="100vh" pb={6}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box marginBottom={4}>
        <Header />
      </Box>
      <Container maxW="container.md">
        <TaskList />
      </Container>
    </Box>
  );
}

export default App;
