import { Flex, Input, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

interface DateFilterProps {
  filters: any;
  setFilters: any;
}

const DateFilter: React.FC<DateFilterProps> = ({ filters, setFilters }) => {
  return (
    <Flex
      alignItems={{ base: "flex-end", md: "center" }}
      justifyContent={"space-between"}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        alignItems={"center"}
        mr={{ base: 0, md: 2 }}
        mb={{ base: 2, md: 0 }}
      >
        <Text mr={2} fontWeight={"300"}>
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
          fontWeight={"300"}
          type="date"
          w={48}
        />
      </Flex>
      <Flex alignItems={"center"}>
        <Text mr={2} fontWeight={"300"}>
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
          fontWeight={"300"}
          type="date"
          w={48}
        />
      </Flex>
    </Flex>
  );
};

export default DateFilter;
