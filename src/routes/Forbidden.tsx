import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Highlight,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function Forbidden() {
  const { kaptName } = useParams();

  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={6} mb={2} fontSize="xl">
        "{kaptName}" 아파트에 접근 권한이 없습니다.
      </AlertTitle>
      <AlertDescription maxWidth="md">
        <Highlight
          query="초록색 하트"
          styles={{ px: "2", py: "0.5", rounded: "full", bg: "teal.500" }}
        >
          아파트 클릭 후 이 페이지를 보셨다면 검색 결과 이미지의 오른쪽 상단에
          초록색 하트로 아파트를 등록한 후 이용해 주세요.
        </Highlight>
      </AlertDescription>
    </Alert>
  );
}
