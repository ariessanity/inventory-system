import * as yup from "yup";

export type SupplierFormValues = {
  companyName: string;
  contactName: string;
  contactNumber: string;
  email: string;
  remarks: string | undefined;
 };

export const supplierSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Supplier name is required")
    .max(30, "Supplier must be less than 30 characters!"),
  contactName: yup
    .string()
    .required("Contact name is required")
    .max(30, "Contact name must be less than 30 characters!"),
  contactNumber: yup.string().required("Contact number is required"),
  email: yup.string().required("Email is required"),
  remarks: yup
    .string()
    .max(30, "Supplier must be less than 30 characters!"),
});
