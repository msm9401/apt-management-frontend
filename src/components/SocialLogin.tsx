import { FaComment } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Tooltip
          label="서비스 업데이트 예정"
          fontSize="md"
          fontWeight="bold"
          bg="green"
          borderRadius="lg"
          placement="top"
        >
          <Button w="100%" leftIcon={<SiNaver />} colorScheme={"green"}>
            네이버 로그인/회원가입
          </Button>
        </Tooltip>
        <Tooltip
          label="서비스 업데이트 예정"
          fontSize="md"
          fontWeight="bold"
          bg="yellow.400"
          borderRadius="lg"
        >
          <Button w="100%" leftIcon={<FaComment />} colorScheme={"yellow"}>
            카카오 로그인/회원가입
          </Button>
        </Tooltip>
      </VStack>
    </Box>
  );
}
