import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { IUploadCommentVariables, getFeedDetail, uploadComment } from "../api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
  Tooltip,
  VStack,
  VisuallyHidden,
  useToast,
} from "@chakra-ui/react";
import { IFeedDetail } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare, BiArrowBack } from "react-icons/bi";
import useUser from "../lib/useUser";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function FeedDetail() {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<IUploadCommentVariables>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { kaptName, id } = useParams();

  const { data } = useQuery<IFeedDetail>(
    [kaptName, id, `feed_detail`],
    getFeedDetail
  );

  const mutation = useMutation(uploadComment, {
    onSuccess: () => {
      queryClient.refetchQueries([kaptName, id, `feed_detail`]);
      toast({
        status: "success",
        title: "댓글 작성",
        position: "bottom-right",
      });
      reset();
    },
  });

  const onSubmit = (data: IUploadCommentVariables) => {
    mutation.mutate(data);
  };

  return (
    <Flex>
      <Box
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Link to={`/${kaptName}/feed/`}>
          <Heading textAlign={"left"}>
            <BiArrowBack />
          </Heading>
        </Link>
        <Card maxW="2xl" m={5}>
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={data?.user.username}
                  src={data?.user.profile_photo}
                />
                <Box>
                  <Heading size="sm">{data?.user.username}</Heading>
                  <Text>{data?.created_at}</Text>
                </Box>
              </Flex>

              {data?.user.username === user?.username && (
                <Link to={`/${kaptName}/feed/${id}/delete`}>
                  <Tooltip
                    label="삭제"
                    fontSize="md"
                    fontWeight="bold"
                    bg="red.400"
                  >
                    <IconButton
                      variant="ghost"
                      aria-label="Delete feed"
                      title="피드 삭제하기"
                      icon={<MdDelete size="20px" color="#E53E3E" />}
                    />
                  </Tooltip>
                </Link>
              )}

              {data?.user.username === user?.username ? (
                <Link to={`/${kaptName}/feed/${id}/edit`}>
                  <Tooltip
                    label="수정"
                    fontSize="md"
                    fontWeight="bold"
                    bg="blue.400"
                  >
                    <IconButton
                      variant="ghost"
                      aria-label="Update feed"
                      title="피드 수정하기"
                      icon={<MdEdit size="20px" color="#2B6CB0" />}
                    />
                  </Tooltip>
                </Link>
              ) : null}

              <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                icon={<BsThreeDotsVertical />}
              />
            </Flex>
          </CardHeader>

          <CardBody>
            <Text>{data?.content}</Text>
          </CardBody>
          <Image objectFit="cover" src={data?.photos[0]?.file} />

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
              Like
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
              {data?.only_comments.length} Comment
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
              Share
            </Button>
          </CardFooter>
        </Card>
      </Box>

      <Box
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Heading size="md">{data?.only_comments.length}개의 댓글</Heading>
        <VStack spacing={5} as="form" mt={5} onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>댓글을 남겨보세요</FormLabel>
            <Textarea {...register("content", { required: true })} />
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
            size="sm"
            w="100%"
          >
            댓글 등록
          </Button>
        </VStack>

        {data?.only_comments.map((comment: any) => (
          <Card maxW="2xl" m={5}>
            <CardHeader>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name={comment.user__username}
                    src={comment.user__profile_photo}
                  />

                  <Box>
                    <Flex gap="2">
                      <Heading size="sm">{comment.user__username}</Heading>
                      <Text>{comment.created_at}</Text>
                    </Flex>
                    <Text>{comment.content}</Text>

                    {comment.recomment_count ? (
                      <Link
                        to={`/${kaptName}/feed/${id}/comment/${comment.id}`}
                      >
                        <Text fontSize="xs" color="blue.600">
                          답글 {comment.recomment_count}개
                        </Text>
                      </Link>
                    ) : null}
                  </Box>
                </Flex>

                {comment.user__username === user?.username && (
                  <Link
                    to={`/${kaptName}/feed/${id}/comment/${comment.id}/delete`}
                  >
                    <Tooltip
                      label="삭제"
                      fontSize="md"
                      fontWeight="bold"
                      bg="red.400"
                    >
                      <IconButton
                        variant="ghost"
                        aria-label="Delete comment"
                        title="댓글 삭제하기"
                        icon={<MdDelete size="20px" color="#E53E3E" />}
                      />
                    </Tooltip>
                  </Link>
                )}

                {comment.user__username === user?.username ? (
                  <Link
                    to={`/${kaptName}/feed/${id}/comment/${comment.id}/edit`}
                  >
                    <Tooltip
                      label="수정"
                      fontSize="md"
                      fontWeight="bold"
                      bg="blue.400"
                    >
                      <IconButton
                        variant="ghost"
                        aria-label="Update comment"
                        title="댓글 수정하기"
                        icon={<MdEdit size="20px" color="#2B6CB0" />}
                      />
                    </Tooltip>
                  </Link>
                ) : null}

                {comment.user__username === user?.username ? null : (
                  <Link
                    to={`/${kaptName}/feed/${id}/comment/${comment.id}/reply`}
                  >
                    <Tooltip
                      label="답장"
                      fontSize="md"
                      fontWeight="bold"
                      bg="orange.400"
                    >
                      <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="Write recomment"
                        title="답장하기"
                        icon={<FaReply color="#F6AD55" />}
                      />
                    </Tooltip>
                  </Link>
                )}
              </Flex>
            </CardHeader>
          </Card>
        ))}
      </Box>
    </Flex>
  );
}
