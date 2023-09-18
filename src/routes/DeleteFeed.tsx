import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteFeed } from "../api";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

export default function DeleteFeed() {
  const { kaptName, id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFeed, {
    onSuccess: () => {
      queryClient.invalidateQueries([kaptName, "feed"]);
      toast({
        status: "success",
        title: "피드 삭제",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/feed`);
    },
  });

  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {`${kaptName}의 포스트`}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        포스트를 삭제하시겠습니까?
      </AlertDescription>
      <Flex alignItems={"center"} justifyContent="space-between" gap={3}>
        <Link to={`/${kaptName}/feed/${id}`}>
          <Button bgColor={"teal"}>취소하기</Button>
        </Link>
        <Button
          bgColor={"red.500"}
          type="submit"
          onClick={() => mutation.mutate({ kaptName, id })}
        >
          삭제하기
        </Button>
      </Flex>
    </Alert>
  );
}
