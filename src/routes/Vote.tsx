import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getChoiceDetail, vote } from "../api";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { IChoiceDetail } from "../types";

export default function Vote() {
  const { kaptName, id, choiceId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const { data } = useQuery<IChoiceDetail>(
    [kaptName, id, choiceId, `choice_detail`],
    getChoiceDetail
  );

  const mutation = useMutation(vote, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "투표 완료",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/poll`);
    },

    onError: (error: any) => {
      toast({
        title: error.response.data.detail,
        status: "warning",
        position: "top",
        isClosable: true,
        duration: 7000,
        variant: "subtle",
      });
      navigate(`/${kaptName}/poll`);
    },
  });

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

      <AlertTitle mt={4} mb={1} fontSize="lg">
        {`"${data?.title}"을(를) 선택하셨습니다.`}
      </AlertTitle>

      <AlertDescription maxWidth="sm">
        투표를 진행하시면 다시 선택할 수 없습니다. 투표하시겠습니까?
      </AlertDescription>

      <Flex alignItems={"center"} justifyContent="space-between" gap={3}>
        <Link to={`/${kaptName}/poll/${id}`}>
          <Button bgColor={"teal"}>돌아가기</Button>
        </Link>

        <Button
          bgColor={"orange.500"}
          type="submit"
          onClick={() => mutation.mutate({ kaptName, id, choiceId })}
        >
          투표하기
        </Button>
      </Flex>
    </Alert>
  );
}
