import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineExport } from "react-icons/ai";

interface ExportButtonProps {
  handleDownload: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ handleDownload }) => {
  return (
    <Button
      
      variant={"outline"}
      colorScheme="teal"
      onClick={handleDownload}
    >
      <AiOutlineExport /> Export
    </Button>
  );
};

export default ExportButton;
