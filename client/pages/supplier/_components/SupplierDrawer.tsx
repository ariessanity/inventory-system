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
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} from "@/store/supplier/api";
import { Supplier } from "@/store/supplier/types";
// import { categories } from "../_data/category";
// import { units } from "../_data/unit";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  SupplierFormValues,
  supplierSchema,
} from "../../../schema/supplier/schema";

interface SupplierDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deleteSupplier: (id: string | undefined) => void;
  isEdit: boolean | undefined;
  editData: Supplier | undefined;
}

const SupplierDrawer: React.FC<SupplierDrawerProps> = ({
  isOpen,
  onClose,
  isEdit,
  editData,
  deleteSupplier,
}) => {
  const [
    createSupplier,
    {
      isSuccess: isSuccessCreateSupplier,
      isError: isErrorCreateSupplier,
      error: errorCreateSupplier,
    },
  ] = useCreateSupplierMutation();

  const [
    updateSupplier,
    {
      isSuccess: isSuccessEditSupplier,
      isError: isErrorEditSupplier,
      error: errorEditSupplier,
    },
  ] = useUpdateSupplierMutation();

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SupplierFormValues>({ resolver: yupResolver(supplierSchema) });

  useEffect(() => {
    if (isEdit && editData) {
      const { companyName, contactName, contactNumber, email, remarks } =
        editData;
      setValue("companyName", companyName);
      setValue("contactName", contactName);
      setValue("contactNumber", contactNumber);
      setValue("email", email);
      setValue("remarks", remarks);
    } else {
      reset();
    }
  }, [isEdit, editData, setValue, reset]);

  useEffect(() => {
    if (isSuccessCreateSupplier) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorCreateSupplier) {
      toast({
        title: (errorCreateSupplier as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [
    isSuccessCreateSupplier,
    isErrorCreateSupplier,
    errorCreateSupplier,
    toast,
  ]);

  useEffect(() => {
    if (isSuccessEditSupplier) {
      toast({
        title: `Success`,
        variant: "left-accent",
        status: "success",
        position: "top",
        isClosable: true,
      });
    }

    if (isErrorEditSupplier) {
      toast({
        title: (errorEditSupplier as any)?.data?.response?.message,
        variant: "left-accent",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }, [isSuccessEditSupplier, isErrorEditSupplier, errorEditSupplier, toast]);

  useEffect(() => {
    if (isEdit && isSuccessEditSupplier) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessEditSupplier, onClose, reset]);

  useEffect(() => {
    if (!isEdit && isSuccessCreateSupplier) {
      onClose();
      reset();
    }
  }, [isEdit, isSuccessCreateSupplier, onClose, reset]);

  const handleOnSubmit: SubmitHandler<SupplierFormValues> = async (data) => {
    if (isEdit) {
      await updateSupplier({ ...data, _id: editData?._id });
    } else {
      await createSupplier(data);

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
            {isEdit ? "Update Supplier" : "Create Supplier"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={!!errors?.companyName} mb={5}>
              <FormLabel htmlFor="companyName" >
                Supplier
              </FormLabel>
              <Input
                id="companyName"
                {...register("companyName")}
                placeholder="ABC Company"
                
              />
              <FormErrorMessage>
                {errors.companyName && errors.companyName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.contactName} mb={5}>
              <FormLabel htmlFor="contactName" >
                Contact Name
              </FormLabel>
              <Input
                id="contactName"
                {...register("contactName")}
                placeholder="Juan Dela Cruz"
                
              />
              <FormErrorMessage>
                {errors.contactName && errors.contactName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.contactNumber} mb={5}>
              <FormLabel htmlFor="contactNumber" >
                Contact Number
              </FormLabel>
              <Input
                id="contactNumber"
                {...register("contactNumber")}
                placeholder=""
                type="number"
                
              />
              <FormErrorMessage>
                {errors.contactNumber && errors.contactNumber.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.email} mb={5}>
              <FormLabel htmlFor="email" >
                Email
              </FormLabel>
              <Input
                id="email"
                {...register("email")}
                placeholder="juandelacruz@gmail.com"
                type="email"
                
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.remarks} mb={5}>
              <FormLabel htmlFor="remarks" >
                Remarks
              </FormLabel>
              <Textarea
                id="remarks"
                {...register("remarks")}
                
              />
              <FormErrorMessage>
                {errors.remarks && errors.remarks.message}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter justifyContent={"space-between"}>
            <Flex>
              <DeleteIcon
                onClick={() => deleteSupplier(editData?._id)}
                color="red.500"
                cursor="pointer"
              />
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

export default SupplierDrawer;
