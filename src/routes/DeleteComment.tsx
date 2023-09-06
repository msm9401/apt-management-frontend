import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteComment, getComment } from "../api";
import { IComment } from "../types";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

export default function DeleteComment() {
  const { kaptName, id, commentId } = useParams();

  const { data } = useQuery<IComment>(
    [kaptName, id, commentId, `comment`],
    getComment
  );

  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "댓글 삭제",
        position: "bottom-right",
      });
      queryClient.refetchQueries([kaptName, id, `feed_detail`]);
      navigate(`/houses/${kaptName}/feed/${id}`);
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
        {`${data?.content}`}
      </AlertTitle>

      <AlertDescription maxWidth="sm">
        댓글을 삭제하시겠습니까?
      </AlertDescription>

      <Flex alignItems={"center"} justifyContent="space-between" gap={3}>
        <Link to={`/houses/${kaptName}/feed/${id}`}>
          <Button bgColor={"teal"}>취소하기</Button>
        </Link>
        <Button
          bgColor={"red.500"}
          type="submit"
          onClick={() => mutation.mutate({ kaptName, id, commentId })}
        >
          삭제하기
        </Button>
      </Flex>
    </Alert>
  );
}
