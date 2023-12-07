import useAuth from "@/hooks/useAuth";
import { Product } from "@/store/product/types";
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
} from "@chakra-ui/react";
import ProductSoldTable from "../_component/ProductSoldTable";

interface ProductSoldProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}

const ProductSoldModal: React.FC<ProductSoldProps> = ({
  isOpen,
  onClose,
  productData,
}) => {
  const columns = [
    {
      Header: "SKU",
      accessor: "sku",
      width: 150,
    },
    {
      Header: "Name",
      accessor: "name",
      width: 150,
    },
    {
      Header: () => <Text>Price per unit</Text>,
      accessor: "price",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
    },
    {
      Header: "Unit",
      accessor: "unit",
      width: 100,
    },
    {
      Header: () => <Text>Qty</Text>,
      accessor: "quantity",
      width: 80,
      Cell: ({ cell: { value } }: any) => <Text>x{value}</Text>,
    },
    {
      Header: () => <Text>Total</Text>,
      accessor: "total",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
    },
  ];

  return (
    <>
      <Modal
        size={"xl"}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >Product sold</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductSoldTable columns={columns} data={productData} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="outline" colorScheme="brand">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductSoldModal;
