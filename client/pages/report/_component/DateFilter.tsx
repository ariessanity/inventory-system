import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FocusLock,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { Form } from "react-hook-form";
import { AiOutlineFilter } from "react-icons/ai";

interface DateFilterProps {
  filters: any;
  setFilters: any;
}

const DateFilter: React.FC<DateFilterProps> = ({ filters, setFilters }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement={"top-end"}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            colorScheme="brand"
            variant={"outline"}
            aria-label={""}
            icon={<AiOutlineFilter />}
          ></IconButton>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverCloseButton />
          <Text fontWeight={"700"} mb={4}>
            Date Filter
          </Text>

          <Flex
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            flexDirection={"column"}
          >
            <Flex alignItems={"center"} mb={4}>
              <Text  mr={4}>
                From
              </Text>
              <Input
                value={filters.startDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    page: 1,
                    startDate: e.target.value
                      ? format(new Date(e.target.value), "yyyy-MM-dd")
                      : "",
                  })
                }
                
                type="date"
                w={56}
              />
            </Flex>
            <Flex alignItems={"center"}>
              <Text  mr={9}>
                To
              </Text>
              <Input
                value={filters.endDate || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    page: 1,
                    endDate: e.target.value
                      ? format(new Date(e.target.value), "yyyy-MM-dd")
                      : "",
                  })
                }
                
                type="date"
                w={56}
              />
            </Flex>
            <Flex
              mt={4}
              alignItems={"center"}
              justifyContent={"space-evenly"}
              width={"100%"}
            >
              <Button
                onClick={() => {
                  setFilters({ ...filters, startDate: "", endDate: "" });
                }}
                colorScheme="brand"
                variant={"ghost"}
                size={"sm"}
              >
                Clear
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                colorScheme={"brand"}
                variant={"outline"}
                size={"sm"}
              >
                Ok
              </Button>
            </Flex>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DateFilter;
