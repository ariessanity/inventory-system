import * as yup from "yup";

export type LoginFormValues = {
  username: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
  password: yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
});
