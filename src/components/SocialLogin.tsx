import { FaComment } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

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
        <Button w="100%" leftIcon={<SiNaver />} colorScheme={"green"}>
          네이버 로그인/회원가입
        </Button>
        <Button w="100%" leftIcon={<FaComment />} colorScheme={"yellow"}>
          카카오 로그인/회원가입
        </Button>
      </VStack>
    </Box>
  );
}
