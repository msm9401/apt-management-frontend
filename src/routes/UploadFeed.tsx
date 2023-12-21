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
import { useMutation } from "@tanstack/react-query";
import { IUploadFeedVariables, uploadFeed } from "../api";

export default function UploadFeed() {
  const { kaptName } = useParams();
  const { register, handleSubmit } = useForm<IUploadFeedVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(uploadFeed, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "피드 생성",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/feed`);
    },
  });

  const onSubmit = (data: IUploadFeedVariables) => {
    mutation.mutate(data);
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
          <Heading textAlign={"center"}>포스트 쓰기</Heading>
          <VStack
            spacing={5}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>포스트를 남겨보세요</FormLabel>
              <Textarea {...register("content", { required: true })} />
            </FormControl>
            <FormControl>
              <Input {...register("photos")} type="file" accept="image/*" />
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
              포스트 등록
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
