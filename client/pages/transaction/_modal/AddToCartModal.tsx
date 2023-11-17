import useAuth from "@/hooks/useAuth";
import { Product } from "@/store/product/types";
import { CheckIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DeleteProps {
  isOpen: boolean;
  productData: Product | undefined;
  onClose: () => void;
  onClick: () => void;
}

const AddToCartModal: React.FC<DeleteProps> = ({
  isOpen,
  productData,
  onClose,
  onClick,
}) => {
  const [quantity, setQuantity] = useState<number | undefined>(1);

  useEffect(() => {
    setQuantity(1);
  }, [isOpen]);

  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack fontWeight={"300"} pt={4}>
              <Text>Product: {productData?.name}</Text>
              <Text>
                Description:{" "}
                {productData?.description ? productData?.description : "-"}
              </Text>
              <Text>Price: ₱{productData?.price}</Text>
              <Text>Unit: {productData?.unit}</Text>
              <Text>Category: {productData?.category}</Text>
              <Text>Quantity: </Text>
              <NumberInput defaultValue={1} min={0}>
                <NumberInputField
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  placeholder="Enter Quantity"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>
          </ModalBody>
          <ModalFooter >
            <Button fontWeight={'300'} variant="solid" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button fontWeight={'300'} colorScheme="teal" onClick={onClick}>
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToCartModal;
