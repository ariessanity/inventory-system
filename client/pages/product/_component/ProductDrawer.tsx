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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductFormValues, productSchema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/store/product/api";
import { Product } from "@/store/product/types";
import { categories } from "../_data/category";
import { units } from "../_data/unit";

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean | undefined;
  editData: Product | undefined;
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
  isOpen,
  onClose,
  isEdit,
  editData,
}) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({ resolver: yupResolver(productSchema) });

  useEffect(() => {
    if (isEdit && editData) {
      const { name, price, description, quantity, unit, category } = editData;
      setValue("name", name);
      setValue("price", price);
      setValue("quantity", quantity);
      setValue("description", description);
      setValue("unit", unit);
      setValue("category", category);
    } else {
      reset();
    }
  }, [isEdit, editData, setValue, reset]);

  const handleOnSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      if (isEdit) {
        await updateProduct({ ...data, _id: editData?._id });
      } else {
        await createProduct(data);
      }

      reset();
      onClose();
    } catch (error) {
      console.log({ error });
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
          <DrawerHeader>
            {isEdit ? "Update Product" : "Create Product"}
          </DrawerHeader>

          <DrawerBody>
            <FormControl isInvalid={!!errors?.name} mb={5}>
              <FormLabel htmlFor="name">Product</FormLabel>
              <Input
                id="name"
                {...register("name")}
                placeholder="Electrical Tape"
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

            <FormControl isInvalid={!!errors?.price} mb={5}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Input
                id="price"
                {...register("price")}
                placeholder="₱50.00"
                
              />
              <FormErrorMessage>
                {errors.price && errors.price.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.quantity} mb={5}>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <Input
                id="quantity"
                {...register("quantity")}
                placeholder="1"
                type="number"
              />
              <FormErrorMessage>
                {errors.quantity && errors.quantity.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.unit} mb={5}>
              <FormLabel htmlFor="unit">Unit</FormLabel>
              <Select
                id="unit"
                placeholder="Select unit"
                {...register("unit")}
              >
                {units?.map((unit, index) => (
                  <option key={index} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.unit && errors.unit.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.category} mb={5}>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select
                id="category"
                placeholder="Select category"
                {...register("category")}
              >
                {categories?.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type={"submit"} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default ProductDrawer;
