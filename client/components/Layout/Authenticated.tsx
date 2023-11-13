import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export const AuthenticatedLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <Sidebar>{children}</Sidebar>;
};
