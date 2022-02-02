import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalBody,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function TaskForm(props) {
  const { onSubmit, submitBtnRender, defaultValues = {} } = props;

  const { duration } = defaultValues;

  const form = useForm({ defaultValues });
  const formFields = {
    name: form.register("name", { required: true }),
    hours: form.register("hours", {
      valueAsNumber: true,
      min: 0,
      value: parseInt(duration / 3600) || 0,
      onBlur: (e) => form.setValue("hours", e.target.value || 0),
      validate: () => form.getValues("hours") + form.getValues("minutes") > 0,
    }),
    minutes: form.register("minutes", {
      valueAsNumber: true,
      min: 0,
      max: 59,
      value: parseInt(duration / 60) % 60 || 0,
      onBlur: (e) => form.setValue("minutes", e.target.value || 0),
      validate: () => form.getValues("hours") + form.getValues("minutes") > 0,
    }),
  };

  const inputBg = useColorModeValue("white", "gray.700");

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        form.handleSubmit(onSubmit, console.log)(e).catch();
      }}
    >
      <ModalBody>
        <Stack>
          <Input
            size="lg"
            type="text"
            placeholder="Task name"
            isInvalid={form.formState.errors["name"]}
            bg={inputBg}
            {...formFields["name"]}
          />

          <HStack>
            <InputGroup>
              <InputLeftAddon children="Hours" />
              <Input
                type="number"
                placeholder="0"
                isInvalid={form.formState.errors["hours"]}
                bg={inputBg}
                {...formFields["hours"]}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Minutes" />
              <Input
                type="number"
                placeholder="0"
                isInvalid={form.formState.errors["minutes"]}
                step={1}
                bg={inputBg}
                {...formFields["minutes"]}
              />
            </InputGroup>
          </HStack>
        </Stack>
      </ModalBody>
      {submitBtnRender}
    </form>
  );
}
