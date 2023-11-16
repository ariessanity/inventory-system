import useAuth from "@/hooks/useAuth";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const Login: NextPage = () => {
  const { handleLogin } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(loginSchema) });

  const handleOnSubmit: SubmitHandler<LoginFormValues> = async (data: any) => {
    try {
      await handleLogin(data.username, data.password);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormControl id="username" isInvalid={!!errors?.username}>
              <FormLabel>Username</FormLabel>
              <Input type="username" {...register("username")} />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={!!errors?.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password")} />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
              <Text my={"2"} color={"red.500"} fontSize={"sm"}>
                {errorMessage}
              </Text>
            </FormControl>

            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
              <Button colorScheme={"blue"} variant={"solid"} type={"submit"}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;
