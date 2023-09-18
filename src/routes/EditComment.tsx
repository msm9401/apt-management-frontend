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
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IEditCommentVariables, editComment, getComment } from "../api";
import React from "react";
import { IComment } from "../types";

export default function EditComment() {
  const { kaptName, id, commentId } = useParams();

  const { data } = useQuery<IComment>(
    [kaptName, id, commentId, `comment`],
    getComment
  );

  const { register, handleSubmit } = useForm<IEditCommentVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(editComment, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "댓글 수정",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/feed/${id}/`);
    },
  });

  const onSubmit = (editdata: IEditCommentVariables) => {
    mutation.mutate(editdata);
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
          <Heading textAlign={"center"}>댓글 수정</Heading>
          <VStack
            spacing={5}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>댓글 수정해보세요</FormLabel>
              <Textarea {...register("content")} defaultValue={data?.content} />
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
              <Text color="red.500">잘못된 요청입니다.</Text>
            ) : null}

            <Button
              type="submit"
              isLoading={mutation.isLoading}
              colorScheme={"teal"}
              size="lg"
              w="100%"
            >
              댓글 수정
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
