import { FaHeart } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

interface IApartmentProps {
  pk: number;
  imageUrl: string;
  address_do: string;
  address_si: string;
  address_dong: string;
  address_li: string;
  kapt_name: string;
}

export default function Apartment({
  pk,
  imageUrl,
  address_do,
  address_si,
  address_dong,
  address_li,
  kapt_name,
}: IApartmentProps) {
  const { isLoggedIn } = useUser();
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onHeartClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/${kapt_name}-${pk}/`);
  };

  return (
    <Link to={`/${kapt_name}/feed/`}>
      <VStack alignItems={"flex-start"}>
        <Box position="relative" overflow={"hidden"} mb={3} rounded="2xl">
          <Image minH="280" src={imageUrl} />
          {!isLoggedIn ? null : (
            <Tooltip
              label="아파트 등록하기"
              fontSize="md"
              fontWeight="bold"
              bg="blue.400"
            >
              <Button
                variant={"unstyled"}
                position="absolute"
                top={0}
                right={0}
                color="teal"
                onClick={onHeartClick}
                //title="아파트 등록하기"
              >
                <FaHeart size="20px" />
              </Button>
            </Tooltip>
          )}
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text
              display={"block"}
              as="b"
              noOfLines={1}
              fontSize="md"
              color="tomato"
            >
              {kapt_name}
            </Text>
            <HStack spacing={1} alignItems="center">
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
      </VStack>
    </Link>
  );
}
