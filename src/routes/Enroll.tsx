import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { registerApartment } from "../api";
import { IApartmentList } from "../types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";

export default function Enroll() {
  const { kaptName } = useParams();
  const { isLoading, data } = useQuery<IApartmentList[]>(
    [kaptName, `enroll`],
    registerApartment
  );
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {kaptName}
      </AlertTitle>
      <AlertDescription maxWidth="sm">아파트를 등록했습니다.</AlertDescription>
      <Link to={`/`}>
        <Button bgColor={"teal"}>홈으로 돌아가기</Button>
      </Link>
    </Alert>
  );
}
