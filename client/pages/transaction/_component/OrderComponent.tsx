import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Product } from "@/store/product/types";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import OrderCard from "./OrderCard";
import { clearCart } from "@/store/slice/cartSlice";
import TransactionModal from "../_modal/TransactionModal";
import { useCreateTransactionMutation } from "@/store/transaction/api";

const OrderComponent = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state: any) => state.cart);

  const [createTransaction, { isSuccess: isSuccessCreateTransaction }] =
    useCreateTransactionMutation();

  const {
    isOpen: isOpenTransactionModal,
    onClose: onCloseTransactionModal,
    onOpen: onOpenTransactionModal,
  } = useDisclosure();

  const handlePayment = (paymentReceived: number | undefined) => {
    createTransaction({
      cartData: cart as Product[],
      totalPrice,
      paymentReceived,
      paymentChange: totalPrice - (paymentReceived || 0),
    });
    dispatch(clearCart());
    onCloseTransactionModal();
  };

  useEffect(() => {
    if (isSuccessCreateTransaction) {
      if (isSuccessCreateTransaction) {
        toast({
          title: `Payment Successful`,
          variant: "left-accent",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    }
  }, [isSuccessCreateTransaction]);

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb={5}>
        <Text fontSize={30} fontWeight={"300"}>
          Current Order
        </Text>
        {cart.length !== 0 && (
          <Button
            size={"sm"}
            fontWeight={"300"}
            colorScheme="red"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        )}
      </Flex>

      <Stack overflowY={"auto"} maxH={"40em"} mb={5}>
        {cart.map((cartItem: Product, index: number) => (
          <OrderCard
            key={cartItem?._id + index}
            name={cartItem?.name}
            quantity={cartItem?.quantity}
            price={cartItem?.price}
            unit={cartItem?.unit}
            category={cartItem?.category}
            description={cartItem?.description}
            productId={cartItem?._id}
          />
        ))}
      </Stack>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        bottom={0}
        position={"sticky"}
      >
        <Box fontSize={"lg"} fontWeight={"300"}>
          Total Price: <Text fontWeight={"semibold"}>₱{totalPrice.toFixed(2)}</Text>
        </Box>
        <Button
          isDisabled={cart.length === 0}
          colorScheme="teal"
          fontWeight={"300"}
          onClick={onOpenTransactionModal}
          whiteSpace={'pre-line'}
        >
          Proceed to payment
        </Button>
      </Flex>
      <TransactionModal
        isOpen={isOpenTransactionModal}
        totalPrice={totalPrice}
        onClose={onCloseTransactionModal}
        handleTransaction={handlePayment}
      />
    </>
  );
};

export default OrderComponent;
