import { useAppDispatch, useAppSelector } from "@/store";
import { useGetAllProductsQuery } from "@/store/product/api";
import { Product } from "@/store/product/types";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "@/store/slice/cartSlice";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Text,
  Flex,
  chakra,
  Image,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface OrderCardProps {
  name: string;
  quantity: number;
  price: number | undefined;
  unit: string;
  category: string;
  description: string;
  productId: string | undefined;
}

const OrderCard: React.FC<OrderCardProps> = ({
  name,
  quantity,
  price,
  unit,
  category,
  description,
  productId,
}) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state: any) => state.cart);

  const {
    data: products,
  } = useGetAllProductsQuery("");

  const productItem = products?.products?.find(
    (product: Product) => product._id === productId
  );

  const cartItem = cart.find((cartItem: Product) => cartItem._id === productId);

  const handleIncrement = () => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrement = () => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveCart = () => {
    dispatch(removeCartItem(productId));
  };

  return (
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <CardBody>
        <Heading size="md" >
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            {name}
            <IconButton
              size={"sm"}
              color={"gray.500"}
              icon={<AiOutlineClose />}
              aria-label={"Remove Item"}
              variant={"clear"}
              onClick={handleRemoveCart}
            />
          </Flex>
        </Heading>
        <Badge size={"sm"} variant="outline" color="secondary" mb={2}>
          {category}
        </Badge>
        <Text fontSize={"sm"} >
          {description}
        </Text>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text  fontSize={"md"}>
            ₱{price?.toFixed(2)} / {unit}
          </Text>
          <Flex align="center">
            <IconButton
              size={"sm"}
              icon={<AiOutlinePlus />}
              aria-label={"Add Quantity"}
              onClick={handleIncrement}
              isDisabled={(productItem?.quantity || 1) <= cartItem?.quantity}
            />
            <chakra.h3 mx={2}>{quantity}</chakra.h3>
            <IconButton
              size={"sm"}
              icon={<AiOutlineMinus />}
              aria-label={"Minus Quantity"}
              onClick={quantity > 1 ? handleDecrement : handleRemoveCart}
            />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
