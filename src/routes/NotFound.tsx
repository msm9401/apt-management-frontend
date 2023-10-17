import { Button, Heading, Highlight, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg="gray.100" justifyContent={"center"} minH="100vh">
      <Heading>Page not found.</Heading>
      <Highlight
        query="아파트 클릭 후 이 페이지를 보셨다면"
        styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
      >
        아파트 클릭 후 이 페이지를 보셨다면 검색 결과 이미지의 오른쪽 상단에
        초록색 하트로 아파트를 등록한 후 이용해 주세요.
      </Highlight>
      <Link to="/">
        <Button colorScheme={"red"} variant={"link"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
