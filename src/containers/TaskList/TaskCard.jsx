import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaClock, FaPause, FaPlay } from "react-icons/fa";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../features/tasks/tasksSlice";
import { setCurrentTask } from "../../features/taskTimer/taskTimerSlice";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteSelf: () => dispatch(deleteTask(ownProps.task.id)),
    updateSelf: (task) => {
      dispatch(
        updateTask({
          id: ownProps.task.id,
          changes: {
            ...task,
          },
        })
      );
    },
    startTask: () => dispatch(setCurrentTask(ownProps.task.id)),
    pauseTask: () => dispatch(setCurrentTask(null)),
  };
};

function TaskCard(props) {
  const { task, deleteSelf, updateSelf, startTask, pauseTask, ...rest } = props;
  const currentTaskId = useSelector((state) => state.taskTimer.currentTaskId);

  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("1px solid", "none");

  useEffect(() => {
    let timer;
    if (task?.id === currentTaskId) {
      timer = setInterval(() => {
        if (task.elapsed < task.duration) {
          updateSelf({ elapsed: task.elapsed + 1 });
        }
      }, 1000);

      if (task.elapsed >= task.duration) {
        clearInterval(timer);
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, [task, updateSelf, currentTaskId]);

  const remainingTime = task.duration - task.elapsed;

  if (!task) return null;

  return (
    <Box
      w="100%"
      bg={cardBg}
      border={cardBorder}
      borderColor="blue.100"
      borderRadius={8}
      overflow="hidden"
      {...rest}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p={4}
        width="100%"
        gap="4"
        flexDirection={["column", "row"]}
      >
        <Text
          contentEditable
          suppressContentEditableWarning
          minW={["100%", "0"]}
          maxW="100%"
          flex="1 0 0"
          outline="none"
          onBlur={(e) => updateSelf({ name: e.target.innerText })}
          _focus={{
            shadow: "outline",
          }}
        >
          {task.name}
        </Text>

        <ButtonGroup justifyContent="end" variant="outline">
          {task.id === currentTaskId ? (
            <IconButton
              colorScheme="red"
              onClick={pauseTask}
              icon={<FaPause />}
            />
          ) : (
            <IconButton
              colorScheme="green"
              onClick={startTask}
              icon={<FaPlay />}
            />
          )}

          <Button colorScheme="orange" leftIcon={<FaClock />}>
            {(remainingTime / 3600) | 0}:{((remainingTime / 60) | 0) % 60}:
            {remainingTime % 60}
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="link"
            />
            <MenuList>
              <MenuItem icon={<EditIcon />}>Edit</MenuItem>
              <MenuItem onClick={deleteSelf} icon={<DeleteIcon />}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Flex>
      <Progress
        isAnimated
        sx={{
          "&>[role=progressbar]": {
            animationDirection: "reverse",
          },
        }}
        hasStripe
        size="sm"
        value={(task.elapsed / task.duration) * 100}
      />
    </Box>
  );
}

export default connect(null, mapDispatchToProps)(TaskCard);
