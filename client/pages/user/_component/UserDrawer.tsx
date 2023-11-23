import React, { useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserFormValues, userSchema } from "../../../schema/user/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignupMutation, useUpdateUserMutation } from "@/store/user/api";
import { User } from "@/store/user/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { roles } from "@/constants";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deleteUser: (id: string | undefined) => void;
  isEdit: boolean | undefined;
  editData: User | undefined;
}

const UserDrawer: React.FC<UserDrawerProps> = ({
  isOpen,
  onClose,
  isEdit,
  editData,
  deleteUser,
}) => {
  const [
    createUser,
    {
      isSuccess: isSuccessCreateUser,
      isError: isErrorCreateUser,
      error: errorCreateUser,
    },
  ] = useSignupMutation();

  const [
    updateUser,
    {
      isSuccess: isSuccessEditUser,
      isError: isErrorEditUser,
      error: errorEditUser,
    },
  ] = useUpdateUserMutation();

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: yupResolver(userSchema) });

  useEffect(() => {
    if (isEdit && editData) {
      const { username, email, role, firstname, lastname, mobileNumber } =
        editData;
      setValue("username", username);
      setValue("email", email);
      setValue("role", role);
      setValue("firstname", firstname);
      setValue("lastname", lastname);
      setValue("mobileNumber", mobileNumber);
    } else {
      reset();
    }
  }, [isEdit, editData, setValue, reset]);

  useEffect(() => {
    if (isSuccessCreateUser) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorCreateUser) {
      toast({
        title: (errorCreateUser as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [isSuccessCreateUser, isErrorCreateUser, errorCreateUser]);

  useEffect(() => {
    if (isSuccessEditUser) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorEditUser) {
      toast({
        title: (errorEditUser as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [isSuccessEditUser, isErrorEditUser, errorEditUser]);

  useEffect(() => {
    if (isEdit && isSuccessEditUser) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessEditUser, onClose, reset]);

  useEffect(() => {
    if (!isEdit && isSuccessCreateUser) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessCreateUser, onClose, reset]);

  const handleOnSubmit: SubmitHandler<UserFormValues> = async (data) => {
    if (isEdit) {
      await updateUser({ ...data, _id: editData?._id });
    } else {
      await createUser(data);
    }
  };

  const handleOnCloseDrawer = () => {
    if (!isEdit) {
      reset();
    }

    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleOnCloseDrawer}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight={"400"}>
            {isEdit ? "Update User" : "Create User"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={!!errors?.username} mb={5} isRequired>
              <FormLabel htmlFor="username" fontWeight={"300"}>
                Username
              </FormLabel>
              <Input
                id="username"
                {...register("username")}
                placeholder="username"
                fontWeight={"300"}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!errors?.password}
              mb={5}
              isDisabled={isEdit}
              isRequired={!isEdit}
            >
              <FormLabel htmlFor="password" fontWeight={"300"}>
                Password
              </FormLabel>
              <Input
                id="password"
                {...register("password")}
                placeholder="********"
                fontWeight={"300"}
                type="password"
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.firstname} mb={5} isRequired>
              <FormLabel htmlFor="firstname" fontWeight={"300"}>
                First name
              </FormLabel>
              <Input
                id="firstname"
                {...register("firstname")}
                placeholder="Juan"
                fontWeight={"300"}
              />
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.lastname} mb={5}>
              <FormLabel htmlFor="lastname" fontWeight={"300"}>
                Last Name
              </FormLabel>
              <Input
                id="lastname"
                {...register("lastname")}
                placeholder="Dela Cruz"
                fontWeight={"300"}
              />
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.email} mb={5} isRequired>
              <FormLabel htmlFor="email" fontWeight={"300"}>
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="juan@gmail.com"
                fontWeight={"300"}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.mobileNumber} mb={5} isRequired>
              <FormLabel htmlFor="mobileNumber" fontWeight={"300"}>
                Mobile Number
              </FormLabel>
              <Input
                id="mobileNumber"
                {...register("mobileNumber")}
                type="number"
                fontWeight={"300"}
              />
              <FormErrorMessage>
                {errors.mobileNumber && errors.mobileNumber.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.role} mb={5} isRequired>
              <FormLabel htmlFor="role" fontWeight={"300"}>
                Role
              </FormLabel>
              <Select
                id="role"
                placeholder="Select role"
                {...register("role")}
                fontWeight={"300"}
              >
                {roles?.map((role, index) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.role && errors.role.message}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter justifyContent={"space-between"}>
            <Flex>
              {editData?.role !== "Super Admin" && (
                <DeleteIcon
                  onClick={() => deleteUser(editData?._id)}
                  color="red.500"
                  cursor="pointer"
                />
              )}
            </Flex>
            <Flex>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type={"submit"} colorScheme="teal">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default UserDrawer;
