import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  BoxProps,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
// Here we have used react-icons package for the icons
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiHome, FiLogOut, FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import LogoutModal from "./LogoutModal";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: AiOutlineHome, url: "/homepage" },
  { name: "Dashboard", icon: AiOutlineTeam, url: "/dashboard" },
  { name: "Product", icon: AiOutlineTeam, url: "/product" },
];

interface Prop {
  children: ReactNode;
}

const Sidebar: React.FC<Prop> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isOpenLogoutModal,
    onClose: onCloseLogoutModal,
    onOpen: onOpenLogoutModal,
  } = useDisclosure();

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent
        openLogoutModal={onOpenLogoutModal}
        display={{ base: "none", md: "unset" }}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            openLogoutModal={onOpenLogoutModal}
            w="full"
            borderRight="none"
          />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          display={{ base: "flex", md: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          justify={{ base: "space-between", md: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
          </Flex>
        </Flex>
      </Box>
      <Box ml={{ base: 0, md: 60 }} p={5}>
        {children}
      </Box>
      <LogoutModal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal} />
    </Box>
  );
};

const SidebarContent = ({
  ...props
}: BoxProps & { openLogoutModal: () => void }) => {
  const { openLogoutModal, ...rest } = props;

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...rest}
    >
      <VStack h="full" w="full" alignItems="flex-start" justify="space-between">
        <Box w="full">
          <Flex px="4" py="5" align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} />
            <Text
              fontSize="2xl"
              ml="2"
              color={useColorModeValue("brand.500", "white")}
              fontWeight="semibold"
            >
              POS
            </Text>
          </Flex>
          <Flex
            direction="column"
            as="nav"
            fontSize="md"
            color="gray.600"
            aria-label="Main Navigation"
          >
            {LinkItems.map((link, index) => (
              <NavItem
                key={index}
                icon={link.icon}
                url={link.url}
                name={link.name}
              ></NavItem>
            ))}
          </Flex>
        </Box>

        <Flex px="4" py="5" mt={10} justify="center" alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              size={"sm"}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              _hover={{ textDecoration: "none" }}
            >
              <Avatar
                size={"sm"}
                name="Ahmad"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              />
            </MenuButton>
            <MenuList fontSize={17} zIndex={5555}>
              <MenuItem as={Link}>My profile</MenuItem>
              <MenuItem as={Link}>Change password</MenuItem>
              <MenuItem onClick={openLogoutModal}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </VStack>
    </Box>
  );
};

const NavItem = (props: any) => {
  const color = useColorModeValue("gray.600", "gray.300");

  const { icon, name, url } = props;
  return (
    <Flex
      align="center"
      as={"a"}
      href={url}
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {name}
    </Flex>
  );
};

export default Sidebar;
