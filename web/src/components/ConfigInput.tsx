import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as React from "react";

type ConfigInputProps = {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  helpText?: React.ReactNode;
  type?: "text" | "password" | "number";
  required?: boolean;
  editable?: boolean;
};

export const ConfigInput = ({
  label,
  placeholder,
  value,
  setValue,
  helpText,
  type = "text",
  required = false,
  editable,
}: ConfigInputProps) => (
  <FormControl>
    <FormLabel mb={1} fontSize="xs" fontWeight="bold" textTransform="uppercase">
      {label}
    </FormLabel>
    <Input
      size="sm"
      required={required}
      borderRadius="6px"
      _focus={{ borderColor: "#553ACF" }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      isReadOnly={editable}
    />
    {helpText ? (
      <FormHelperText fontSize="xs">{helpText}</FormHelperText>
    ) : null}
  </FormControl>
);
