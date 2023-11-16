import * as yup from "yup";

export type ProductFormValues = {
  name: string;
  price: number;
  quantity: number;
  description: string | undefined;
  unit: string;
  category: string;
};

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .max(30, "Product must be less than 30 characters!"),
  description: yup
    .string()
    .optional()
    .max(30, "Description must be less than 30 characters!"),
  price: yup
  .number()
  .required("Price is required")
  .typeError("Price must be a number"),
  quantity: yup
    .number()
    .required("Product quantiy is required")
    .typeError("Quantity must be a number"),
  unit: yup.string().required("Product unit is required"),
  category: yup.string().required("Product category is required"),
});
