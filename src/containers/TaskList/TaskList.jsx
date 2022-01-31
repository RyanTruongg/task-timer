import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import TaskCard from "./TaskCard";
import { AddIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";
import { tasksSelectors } from "../../features/tasks/tasksSelector";
import { createTask } from "../../features/tasks/tasksSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => tasksSelectors.selectAll(state));

  const form = useForm();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputBg = useColorModeValue("white", "gray.700");

  const onSubmit = (data) => {
    const duration =
      (parseInt(data["hours"]) * 60 + parseInt(data["minutes"])) * 60;

    const newTask = {
      name: data["name"],
      id: Date.now(),
      duration: duration,
      elapsed: 0,
    };

    dispatch(createTask(newTask));

    toast({
      duration: 1000,
      isClosable: true,
      title: "Task created",
      status: "success",
    });

    form.reset();
    onClose();
  };
  return (
    <Box>
      <VStack spacing="16px" overflow="auto">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>
      <Button
        type="submit"
        colorScheme="green"
        size="lg"
        w="100%"
        mt={4}
        onClick={onOpen}
        leftIcon={<AddIcon />}
      >
        Create
      </Button>

      {/* Modal */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create task</ModalHeader>
          <ModalCloseButton />
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Task name"
                  required
                  bg={inputBg}
                  {...form.register("name")}
                />

                <InputGroup>
                  <InputLeftAddon children="Hours" />
                  <Input
                    type="number"
                    required
                    placeholder="Enter hours"
                    min={0}
                    step={1}
                    bg={inputBg}
                    {...form.register("hours")}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon children="Minutes" />
                  <Input
                    required
                    type="number"
                    placeholder="Enter minutes"
                    min={0}
                    max={59}
                    step={1}
                    bg={inputBg}
                    {...form.register("minutes")}
                  />
                </InputGroup>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                w="100%"
                leftIcon={<AddIcon />}
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TaskList;
