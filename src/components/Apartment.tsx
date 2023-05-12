import { FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

interface IApartmentProps {
  imageUrl: string;
  address_do: string;
  address_si: string;
  address_dong: string;
  address_li: string;
  kapt_name: string;
}

export default function Apartment({
  imageUrl,
  address_do,
  address_si,
  address_dong,
  address_li,
  kapt_name,
}: IApartmentProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"}>
      <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
        <Image minH="280" src={imageUrl} />
        <Button
          variant={"unstyled"}
          position="absolute"
          top={0}
          right={0}
          color="white"
        ></Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={"6fr 1fr"}>
          <Text display={"block"} as="b" noOfLines={1} fontSize="md">
            {kapt_name}
          </Text>
          <HStack spacing={1} alignItems="center">
            {/* <FaStar size={12} /> */}
            <Text fontSize={"sm"}></Text>
          </HStack>
        </Grid>
        <Text fontSize={"sm"} color={gray}>
          {address_do} // {address_si}
        </Text>
        <Text fontSize={"sm"} color={gray}>
          {address_dong} {address_li}
        </Text>
      </Box>
      {/* <Text fontSize={"sm"} color={gray}>
        <Text as="b">{kapt_name}</Text>
      </Text> */}
    </VStack>
  );
}
