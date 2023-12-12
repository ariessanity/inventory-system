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
import {
  CategoryFormValues,
  categorySchema,
} from "../../../schema/category/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/category/api";
import { Category } from "@/store/category/types";
import { DeleteIcon } from "@chakra-ui/icons";
import PrimaryButton from "@/components/Button/PrimaryButton";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deleteCategory: (id: string | undefined) => void;
  isEdit: boolean | undefined;
  editData: Category | undefined;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  isOpen,
  onClose,
  isEdit,
  editData,
  deleteCategory,
}) => {
  const [
    createCategory,
    {
      isSuccess: isSuccessCreateCategory,
      isError: isErrorCreateCategory,
      error: errorCreateCategory,
    },
  ] = useCreateCategoryMutation();

  const [
    updateCategory,
    {
      isSuccess: isSuccessEditCategory,
      isError: isErrorEditCategory,
      error: errorEditCategory,
    },
  ] = useUpdateCategoryMutation();

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({ resolver: yupResolver(categorySchema) });

  useEffect(() => {
    if (isEdit && editData) {
      const { name, description } = editData;
      setValue("name", name);
      setValue("description", description);
    } else {
      reset();
    }
  }, [isEdit, editData, setValue, reset]);

  useEffect(() => {
    if (isSuccessCreateCategory) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorCreateCategory) {
      toast({
        title: (errorCreateCategory as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [
    isSuccessCreateCategory,
    isErrorCreateCategory,
    errorCreateCategory,
    toast,
  ]);

  useEffect(() => {
    if (isSuccessEditCategory) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorEditCategory) {
      toast({
        title: (errorEditCategory as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [isSuccessEditCategory, isErrorEditCategory, errorEditCategory, toast]);

  useEffect(() => {
    if (isEdit && isSuccessEditCategory) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessEditCategory, onClose, reset]);

  useEffect(() => {
    if (!isEdit && isSuccessCreateCategory) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessCreateCategory, onClose, reset]);

  const handleOnSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    if (isEdit) {
      await updateCategory({ ...data, _id: editData?._id });
    } else {
      await createCategory(data);

      // reset();
      // onClose();
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
          <DrawerHeader fontWeight={"700"}>
            {isEdit ? "Update Category" : "Create Category"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={!!errors?.name} mb={5}>
              <FormLabel htmlFor="name">Category</FormLabel>
              <Input
                id="name"
                {...register("name")}
                placeholder="Keyboard"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.description} mb={5}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                {...register("description")}
                placeholder="Description"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter justifyContent={"space-between"}>
            <Flex>
              <DeleteIcon
                onClick={() => deleteCategory(editData?._id)}
                color="red.500"
                cursor="pointer"
              />
            </Flex>
            <Flex>
              <PrimaryButton variant="outline" mr={3} onClick={onClose}>
                Cancel
              </PrimaryButton>
              <PrimaryButton type={"submit"}>
                {isEdit ? "Update" : "Create"}
              </PrimaryButton>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default CategoryDrawer;
