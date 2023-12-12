import { Button } from "@chakra-ui/react";
import { color } from "chart.js/helpers";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: string;
  onClick?: () => void;
  [key: string]: any;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick,
  ...props
}) => {
  return (
    <Button
      variant={variant || "solid"}
      colorScheme="brand"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
