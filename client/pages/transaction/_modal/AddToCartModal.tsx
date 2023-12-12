import PrimaryButton from "@/components/Button/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { Product } from "@/store/product/types";
import { addToCart } from "@/store/slice/cartSlice";
import {
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
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DeleteProps {
  isOpen: boolean;
  productData: Product | undefined;
  onClose: () => void;
  searchReset: () => void
}

const LOW_STOCK_ALERT = 0.1;

const AddToCartModal: React.FC<DeleteProps> = ({
  isOpen,
  productData,
  onClose,
  searchReset
}) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: any) => state.cart);

  const [quantity, setQuantity] = useState<number>(1);

  const cartItem = cart.find(
    (cartItem: Product) => cartItem._id === productData?._id
  );

  const maxAvailableQuantity =
    (productData?.quantity || 0) - (cartItem?.quantity || 0);

  useEffect(() => {
    setQuantity(1);
  }, [isOpen]);

  useEffect(() => {
    if ((productData?.quantity || 1) <= quantity) {
      setQuantity(productData?.quantity || 1);
    }

    if (quantity > maxAvailableQuantity) {
      setQuantity(maxAvailableQuantity || 1);
    }
  }, [maxAvailableQuantity, productData?.quantity, quantity]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...productData, quantity, total: quantity * (productData?.price || 0) }));
    setQuantity(1);
    searchReset()
    onClose();
  };

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
            <Stack fontWeight={"500"} pt={4}>
              <Text>
                Product:{" "}
                <Text as={"span"} >
                  {productData?.name}
                </Text>{" "}
              </Text>
              <Text>
                Description:{" "}
                <Text as={"span"} >
                  {productData?.description ? productData?.description : "-"}
                </Text>
              </Text>
              <Text>
                Price:{" "}
                <Text as={"span"} >
                  ₱{productData?.price}
                </Text>
              </Text>
              <Text>
                Stock/s:{" "}
                <Text
                  as={"span"}
                  
                  color={
                    maxAvailableQuantity / (productData?.quantity || 1) <=
                    LOW_STOCK_ALERT
                      ? "red"
                      : ""
                  }
                >
                  {maxAvailableQuantity > 0
                    ? `${maxAvailableQuantity} items left`
                    : `Out of Stock`}
                </Text>
              </Text>
              <Text>
                Unit:{" "}
                <Text as={"span"} >
                  {productData?.unit}
                </Text>
              </Text>
              <Text>
                Category:{" "}
                {
                  <Badge variant="outline" colorScheme="brand">
                    {productData?.category}
                  </Badge>
                }
              </Text>
              <Text>Quantity: </Text>
              <NumberInput
                isDisabled={(productData?.quantity || 0) < quantity}
                defaultValue={1}
                min={0}
                value={quantity}
                onChange={(valueString, valueNumber) => {
                  setQuantity(valueNumber || 0);
                }}
              >
                <NumberInputField
                  id="quantity"
                  
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
          <ModalFooter>
            <PrimaryButton variant="outline" mr={3} onClick={onClose}>
              Cancel
            </PrimaryButton>
            <PrimaryButton
              onClick={handleAddToCart}
              isDisabled={
                (productData?.quantity || quantity) < cartItem?.quantity + 1 || productData?.quantity === 0
              }
            >
              Add to Cart
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToCartModal;
