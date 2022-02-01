import React, { useEffect } from "react";
import { DeleteIcon, HamburgerIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Badge,
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
  useToast,
} from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";

import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../features/tasks/tasksSlice";
import { setCurrentTask } from "../../features/taskTimer/taskTimerSlice";
import secondsToTime from "../../utils/secondToTime";
import alarmSound from "../../utils/alarmSound";

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

  const toast = useToast();

  const currentTaskId = useSelector((state) => state.taskTimer.currentTaskId);
  const isCurrentTask = task.id === currentTaskId;
  const remainingTime = task.duration - task.elapsed;

  const cardBg = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (isCurrentTask && task.elapsed >= task.duration) {
      pauseTask();

      alarmSound.currentTime = 0;
      alarmSound.play();

      toast({
        title: "Time up!",
        onCloseComplete: () => alarmSound.pause(),
        isClosable: true,
        status: "warning",
        position: "top",
      });
    }
  }, [isCurrentTask, pauseTask, task.duration, task.elapsed, toast]);

  if (!task) return null;

  return (
    <Box w="100%" bg={cardBg} borderRadius={8} overflow="hidden" {...rest}>
      <Badge
        textTransform="none"
        colorScheme={isCurrentTask ? "orange" : "gray"}
        marginLeft={4}
      >
        {secondsToTime(task.duration)}
      </Badge>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={4}
        mb={4}
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

        <ButtonGroup
          w={["100%", "auto"]}
          justifyContent="end"
          variant="outline"
        >
          {isCurrentTask && (
            <IconButton
              colorScheme="red"
              onClick={pauseTask}
              icon={<FaPause />}
            />
          )}

          {!isCurrentTask && remainingTime > 0 && (
            <IconButton
              colorScheme="green"
              disabled={task.elapsed >= task.duration}
              onClick={startTask}
              icon={<FaPlay />}
            />
          )}

          {remainingTime <= 0 && (
            <IconButton
              colorScheme="orange"
              onClick={() => updateSelf({ elapsed: 0 })}
              icon={<RepeatClockIcon />}
            />
          )}

          <Button
            colorScheme={isCurrentTask ? "orange" : "black"}
            leftIcon={<BsHourglassSplit />}
          >
            {secondsToTime(remainingTime)}
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="link"
            />
            <MenuList>
              <MenuItem onClick={deleteSelf} icon={<DeleteIcon />}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Flex>
      <Progress
        isAnimated={isCurrentTask}
        sx={{
          "&>[role=progressbar]": {
            animationDirection: "reverse",
          },
        }}
        colorScheme={isCurrentTask ? "blue" : "gray"}
        hasStripe={isCurrentTask}
        size="sm"
        value={(task.elapsed / task.duration) * 100}
      />
    </Box>
  );
}

export default connect(null, mapDispatchToProps)(TaskCard);
