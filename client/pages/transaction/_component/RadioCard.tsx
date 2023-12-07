import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        whiteSpace={"nowrap"}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "primary",
          color: "white",
          borderColor: "primary",
        }}
        _focus={
          {
            // boxShadow: "outline",
          }
        }
        px={3}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
