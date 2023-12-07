import { chakra } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PagButtonProps {
    active?: any,
    disabled?: boolean,
    children?: ReactNode
    onClick: () => void
}
const PagButton: React.FC<PagButtonProps> = ({ active, disabled, children, onClick}) => {
  const activeStyle = {
    bg: "primary",
    color: "gray.200",
  };

  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="gray.700"
      onClick={onClick}
      opacity={disabled && 0.6}
      _hover={!disabled && activeStyle}
      cursor={disabled && "not-allowed"}
      disabled={disabled}
      {...(active && activeStyle)}
    >
      {children}
    </chakra.button>
  );
};

export default PagButton;