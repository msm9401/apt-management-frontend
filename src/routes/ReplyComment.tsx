import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { IComment } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IReplyCommentVariables, getComment, replyComment } from "../api";

export default function ReplyComment() {
  const { kaptName, id, commentId } = useParams();

  const { data } = useQuery<IComment>(
    [kaptName, id, commentId, `comment`],
    getComment
  );

  const { register, handleSubmit } = useForm<IReplyCommentVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(replyComment, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "대댓글 작성",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/feed/${id}`);
    },
  });

  const onSubmit = (replyData: IReplyCommentVariables) => {
    mutation.mutate(replyData);
  };

  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>대댓글 작성</Heading>
          <VStack
            spacing={5}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>답장을 남겨보세요</FormLabel>
              <Textarea
                {...register("content", { required: true })}
                defaultValue={`@${data?.user.username} `}
              />
            </FormControl>
            <FormControl>
              <VisuallyHidden>
                <Input
                  {...register("house", { required: true })}
                  required
                  type="text"
                  defaultValue={kaptName}
                  readOnly
                />
              </VisuallyHidden>
            </FormControl>
            <FormControl>
              <VisuallyHidden>
                <Input
                  {...register("id", { required: true })}
                  required
                  type="text"
                  defaultValue={id}
                  readOnly
                />
              </VisuallyHidden>
            </FormControl>
            <FormControl>
              <VisuallyHidden>
                <Input
                  {...register("commentId", { required: true })}
                  required
                  type="text"
                  defaultValue={commentId}
                  readOnly
                />
              </VisuallyHidden>
            </FormControl>
            {mutation.isError ? (
              <Text color="red.500">잘못된 요청이거나 권한이 없습니다.</Text>
            ) : null}
            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"teal"}
              size="lg"
              w="100%"
            >
              대댓글 등록
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
