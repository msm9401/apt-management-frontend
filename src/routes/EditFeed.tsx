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
import { IEditFeedVariables, editFeed, getFeedDetail } from "../api";
import { IFeedDetail } from "../types";

export default function EditFeed() {
  const { kaptName, id } = useParams();
  const { register, handleSubmit } = useForm<IEditFeedVariables>();
  const toast = useToast();
  const navigate = useNavigate();

  const { data } = useQuery<IFeedDetail>(
    [kaptName, id, `feed_detail`],
    getFeedDetail
  );

  const mutation = useMutation(editFeed, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "피드 수정",
        position: "bottom-right",
      });
      navigate(`/${kaptName}/feed/${id}/`);
    },
  });

  const onSubmit = (editData: IEditFeedVariables) => {
    mutation.mutate(editData);
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
          <Heading textAlign={"center"}>포스트 수정</Heading>
          <VStack
            spacing={5}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>포스트를 수정해보세요</FormLabel>
              <Textarea
                {...register("content", { required: true })}
                defaultValue={data?.content}
              />
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
              포스트 수정
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
