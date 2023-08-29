import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getFeed } from "../api";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { IFeedList } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import useUser from "../lib/useUser";
import { MdDelete, MdEdit } from "react-icons/md";
import AuthenticatedOnlyPage from "../components/AuthenticatedOnlyPage";

export default function Feed() {
  const { user } = useUser();
  const { kaptName } = useParams();
  const { data } = useQuery<IFeedList[]>([kaptName, `feed`], getFeed);

  return (
    <AuthenticatedOnlyPage>
      <Box
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Flex mb={10}>
          <Box
            w="100%"
            bgGradient={[
              "linear(to-tr, teal.300, yellow.400)",
              "linear(to-t, blue.200, teal.500)",
              "linear(to-b, orange.100, purple.300)",
            ]}
          >
            <Center>
              <Link to={``}>
                <Button
                  color="#38A169"
                  variant="ghost"
                  m={5}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  공지사항
                </Button>
              </Link>
              <Link to={``}>
                <Button
                  color="#38A169"
                  variant="ghost"
                  m={5}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  민원접수
                </Button>
              </Link>
              <Link to={``}>
                <Button
                  color="#38A169"
                  variant="ghost"
                  m={5}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  투표
                </Button>
              </Link>
              <Link to={``}>
                <Button
                  color="#38A169"
                  variant="ghost"
                  m={5}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  연락처
                </Button>
              </Link>
              <Link to={``}>
                <Button
                  color="#38A169"
                  variant="ghost"
                  m={5}
                  fontWeight="bold"
                  fontSize="lg"
                >
                  주요일정
                </Button>
              </Link>
            </Center>
          </Box>
        </Flex>
        <Link to={`/houses/${kaptName}/feed/upload`}>
          <Button
            colorScheme="teal"
            variant="outline"
            m={5}
            fontWeight="bold"
            color="white"
            bgGradient="linear(to-r, teal.500, green.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
          >
            {kaptName} 커뮤니티에 포스트를 남겨보세요
          </Button>
        </Link>
        {data?.map((feed) => (
          <Card maxW="2xl" m={5}>
            <Link to={`/houses/${kaptName}/feed/${feed.id}/`}>
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name={feed?.user.username}
                      src={feed?.user.profile_photo}
                    />

                    <Box>
                      <Heading size="sm">{feed.user.username}</Heading>
                      <Text>{feed.created_at}</Text>
                    </Box>
                  </Flex>
                  {feed?.user.username === user?.username && (
                    <Link to={`/houses/${kaptName}/feed/${feed.id}/delete`}>
                      <IconButton
                        variant="ghost"
                        aria-label="Delete feed"
                        title="피드 삭제하기"
                        icon={<MdDelete size="20px" color="#E53E3E" />}
                      />
                    </Link>
                  )}
                  {feed?.user.username === user?.username ? (
                    <Link to={`/houses/${kaptName}/feed/${feed.id}/edit`}>
                      <IconButton
                        variant="ghost"
                        aria-label="Update feed"
                        title="피드 수정하기"
                        icon={<MdEdit size="20px" color="#2B6CB0" />}
                      />
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
                <Text>{feed.content}</Text>
              </CardBody>
              <Image objectFit="cover" src={feed.photos[0]?.file} />
            </Link>

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
              {feed.comments_count > 0 ? (
                <Button
                  flex="1"
                  variant="ghost"
                  leftIcon={<BiChat />}
                  color="blue.500"
                >
                  {feed.comments_count} Comment
                </Button>
              ) : (
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                  {feed.comments_count} Comment
                </Button>
              )}
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </AuthenticatedOnlyPage>
  );
}
