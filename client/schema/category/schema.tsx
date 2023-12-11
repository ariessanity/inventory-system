import * as yup from "yup";

export type CategoryFormValues = {
  name: string;
  description: string | undefined;
};

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .min(3, "Category must be at least 3 characters"),
  description: yup.string(),
});
