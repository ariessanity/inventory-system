import useAuth from "@/hooks/useAuth";
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
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DeleteProps {
  isOpen: boolean;
  totalPrice: number;
  onClose: () => void;
  handleTransaction: (paymentReceived: number | undefined) => void;
}

const TransactionModal: React.FC<DeleteProps> = ({
  isOpen,
  totalPrice,
  onClose,
  handleTransaction,
}) => {
  const [payment, setPayment] = useState<number | undefined>(0);

  useEffect(() => {
    setPayment(0);
  }, [isOpen]);

  const handlePayment = () => {
    handleTransaction(payment);
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
          <ModalHeader fontWeight={"400"}>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"lg"} fontWeight={"300"}>
              Cash
            </Text>
            <Input
              id="cash"
              my={2}
              fontSize={"lg"}
              fontWeight={"300"}
              value={payment}
              onChange={(e) => setPayment(parseInt(e.target.value) || 0)}
              placeholder="Enter payment . . ."
              step={"any"}
            />
            <Flex justifyContent={"space-between"}>
              <Text fontSize={"lg"} fontWeight={"300"}>
                Total Price: {totalPrice.toFixed(2)}
              </Text>
              <Text fontSize={"lg"} fontWeight={"300"}>
                Change:{" "}
                {(payment || 0) - totalPrice < 0
                  ? 0
                  : ((payment || 0) - totalPrice).toFixed(2)}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button fontWeight={"300"} variant="solid" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight={"300"}
              colorScheme="teal"
              onClick={handlePayment}
            >
              Paid
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionModal;
