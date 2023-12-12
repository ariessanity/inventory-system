import useAuth from "@/hooks/useAuth";
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
} from "@chakra-ui/react";
import PrimaryButton from "../Button/PrimaryButton";

interface LogoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutProps> = ({ isOpen, onClose }) => {
  const { handleLogout } = useAuth();

  const logout = async () => {
    try {
      await handleLogout();
      onClose();
    } catch (error) {
      console.log(error);
    }
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
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to log out?</Text>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton mr={3} onClick={onClose}>
              No
            </PrimaryButton>
            <PrimaryButton onClick={logout} variant="outline">
              Yes
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
