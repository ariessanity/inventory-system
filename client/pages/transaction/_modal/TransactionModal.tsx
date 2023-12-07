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

interface TransactionModalProps {
  isOpen: boolean;
  totalPrice: number;
  onClose: () => void;
  handleTransaction: (paymentReceived: number | undefined, customerName: string) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  totalPrice,
  onClose,
  handleTransaction,
}) => {
  const [payment, setPayment] = useState<number | undefined>(0);
  const [customerName, setCustomerName] = useState<string>('');

  useEffect(() => {
    setPayment(0);
  }, [isOpen]);

  const handlePayment = () => {
    handleTransaction(payment, customerName);
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
          <ModalHeader fontWeight={"700"}>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems={"center"}>
              <Text mr={2} fontSize={"lg"} >
                Name
              </Text>
              <Input
                id="name"
                my={2}
                fontSize={"lg"}
                
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name . . ."
              />
            </Flex>
            <Flex alignItems={"center"} mb={4}>
              <Text fontSize={"lg"}  mr={3.5}>
                Cash
              </Text>
              <Input
                id="cash"
                my={2}
                fontSize={"lg"}
                
                value={payment}
                onChange={(e) => setPayment(parseInt(e.target.value) || 0)}
                placeholder="Enter payment . . ."
                step={"any"}
              />
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text fontSize={"lg"} >
                Total Price: ₱{totalPrice.toFixed(2)}
              </Text>
              <Text fontSize={"lg"} >
                Change:{" "}
                {(payment || 0) - totalPrice < 0
                  ? `₱0`
                  : `₱${((payment || 0) - totalPrice).toFixed(2)}`}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button  variant="solid" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              
              colorScheme="teal"
              onClick={handlePayment}
              isDisabled={totalPrice > (payment || 0)}
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
