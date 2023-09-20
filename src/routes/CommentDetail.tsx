import {
  AbsoluteCenter,
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getComment } from "../api";
import React from "react";
import { IComment } from "../types";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import useUser from "../lib/useUser";
import { BiArrowBack } from "react-icons/bi";

export default function CommentDetail() {
  const { user } = useUser();
  const { kaptName, id, commentId } = useParams();
  const { data } = useQuery<IComment>(
    [kaptName, id, commentId, `comment`],
    getComment
  );

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
          <Link to={`/${kaptName}/feed/${id}`}>
            <Heading textAlign={"left"}>
              <BiArrowBack />
            </Heading>
          </Link>
          <Heading textAlign={"center"}>댓글</Heading>
          <VStack spacing={5} as="form" mt={1}>
            <Card maxW="md" m={5}>
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
                    <Link
                      to={`/${kaptName}/feed/${id}/comment/${commentId}/delete`}
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
                          //onClick={onDeleteOpen}
                        />
                      </Tooltip>
                    </Link>
                  )}

                  {data?.user.username === user?.username ? (
                    <Link
                      to={`/${kaptName}/feed/${id}/comment/${commentId}/edit`}
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

                  {data?.user.username === user?.username ? null : (
                    <Link
                      to={`/${kaptName}/feed/${id}/comment/${commentId}/reply`}
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
              <CardBody>
                <Text>{data?.content}</Text>
              </CardBody>
            </Card>
            <Box position="relative" padding="10">
              <Divider orientation="horizontal" />
              <AbsoluteCenter bg="white" px="4">
                답글
              </AbsoluteCenter>
            </Box>

            {data?.recomments.map((comment: any) => (
              <Card maxW="md" m={5} key={comment.id} id={comment.id}>
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={comment.user__username}
                        src={comment.user__profile_photo}
                      />

                      <Box>
                        <Heading size="sm">{comment.user__username}</Heading>
                        <Text>{comment.created_at}</Text>
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
                            //onClick={onDeleteOpen}
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
                <CardBody>
                  <Text>{comment.content}</Text>
                </CardBody>

                {comment.recomment_count ? (
                  <Link to={`/${kaptName}/feed/${id}/comment/${comment.id}`}>
                    <Text fontSize="xs" color="blue.600">
                      답글 {comment.recomment_count}개
                    </Text>
                  </Link>
                ) : null}
              </Card>
            ))}
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
