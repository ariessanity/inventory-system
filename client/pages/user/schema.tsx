import * as yup from "yup";

export type UserFormValues = {
  username: string;
  password: string | undefined;
  email: string | undefined;
  role: string;
  firstname: string;
  lastname: string | undefined;
  mobileNumber: string | undefined;
};

export const userSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(30, "Username must be less than 30 characters!"),
  password: yup.string().max(20, "Password be less than 20 characters!"),
  email: yup.string(),
  firstname: yup
    .string()
    .required("First name is required")
    .max(30, "First name must be less than 30 characters!"),
  lastname: yup.string().max(30, "Last name must be less than 30 characters!"),
  role: yup.string().required("Role is required"),
  mobileNumber: yup.string().optional(),
});
