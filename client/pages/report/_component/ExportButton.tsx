import PrimaryButton from "@/components/Button/PrimaryButton";
import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineExport } from "react-icons/ai";

interface ExportButtonProps {
  handleDownload: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ handleDownload }) => {
  return (
    <PrimaryButton
      variant={"outline"}
      onClick={handleDownload}
    >
      <AiOutlineExport /> Export
    </PrimaryButton>
  );
};

export default ExportButton;
