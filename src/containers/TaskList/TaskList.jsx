import {
  Box,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import TaskCard from "./TaskCard";
import { AddIcon } from "@chakra-ui/icons";

import { tasksSelectors } from "../../features/tasks/tasksSelector";
import { createTask } from "../../features/tasks/tasksSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";

function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => tasksSelectors.selectAll(state));

  const toast = useToast();
  const modal = useDisclosure();

  const onSubmit = (data) => {
    const duration = (data["hours"] * 60 + data["minutes"]) * 60;

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

    modal.onClose();
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
        onClick={modal.onOpen}
        leftIcon={<AddIcon />}
      >
        Create
      </Button>

      {/* Modal */}

      <Modal
        isOpen={modal.isOpen}
        onClose={() => {
          modal.onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create task</ModalHeader>
          <ModalCloseButton />
          <TaskForm
            onSubmit={onSubmit}
            submitBtnRender={
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
            }
          />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TaskList;
