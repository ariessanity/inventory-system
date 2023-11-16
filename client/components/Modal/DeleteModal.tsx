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
} from "@chakra-ui/react";

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}

const DeleteModal: React.FC<DeleteProps> = ({ isOpen, onClose, onClick }) => {
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
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" onClick={onClick}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
