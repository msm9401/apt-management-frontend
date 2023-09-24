import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
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
  Progress,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { IFeedList } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare, BiArrowToTop } from "react-icons/bi";
import useUser from "../lib/useUser";
import { MdDelete, MdEdit, MdPostAdd } from "react-icons/md";
import AuthenticatedOnlyPage from "../components/AuthenticatedOnlyPage";
import { useEffect, useState } from "react";

export default function Feed() {
  const { user } = useUser();
  const { kaptName } = useParams();
  const [postData, setPostData] = useState<IFeedList[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //fetchData();
    setTimeout(() => fetchData(), 400);
  }, [page]);

  const url =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1"
      : "http://52.79.128.21/api/v1";

  const fetchData = async () => {
    const endpoint = `${url}/houses/${kaptName}/feed?page=${page}`;

    try {
      const response = await fetch(endpoint, {
        method: "Get",
        headers: {
          Authorization: `token ${localStorage.getItem("access_token")}`,
        },
      });

      const { results, count } = await response.json();
      const data = [...postData].concat(results);

      if (postData.length + PAGE_LIMIT >= count) {
        setHasMore(false);
      }

      setPostData(data);
    } catch (e) {
      console.log(e);
    }
  };

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
            borderRadius="lg"
          >
            <Center>
              <Link to={``}>
                <Tooltip
                  label="서비스 업데이트 예정"
                  fontSize="md"
                  fontWeight="bold"
                  bg="orange.400"
                  borderRadius="lg"
                >
                  <Button
                    color="#38A169"
                    variant="ghost"
                    m={5}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    공지사항
                  </Button>
                </Tooltip>
              </Link>
              <Link to={``}>
                <Tooltip
                  label="서비스 업데이트 예정"
                  fontSize="md"
                  fontWeight="bold"
                  bg="orange.400"
                  borderRadius="lg"
                >
                  <Button
                    color="#38A169"
                    variant="ghost"
                    m={5}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    민원접수
                  </Button>
                </Tooltip>
              </Link>
              <Link to={``}>
                <Tooltip
                  label="서비스 업데이트 예정"
                  fontSize="md"
                  fontWeight="bold"
                  bg="orange.400"
                  borderRadius="lg"
                >
                  <Button
                    color="#38A169"
                    variant="ghost"
                    m={5}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    투표
                  </Button>
                </Tooltip>
              </Link>
              <Link to={``}>
                <Tooltip
                  label="서비스 업데이트 예정"
                  fontSize="md"
                  fontWeight="bold"
                  bg="orange.400"
                  borderRadius="lg"
                >
                  <Button
                    color="#38A169"
                    variant="ghost"
                    m={5}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    연락처
                  </Button>
                </Tooltip>
              </Link>
              <Link to={``}>
                <Tooltip
                  label="서비스 업데이트 예정"
                  fontSize="md"
                  fontWeight="bold"
                  bg="orange.400"
                  borderRadius="lg"
                >
                  <Button
                    color="#38A169"
                    variant="ghost"
                    m={5}
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    주요일정
                  </Button>
                </Tooltip>
              </Link>
            </Center>
          </Box>
        </Flex>
        <Link to={`/${kaptName}/feed/upload`}>
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
            <MdPostAdd size={"25px"} />
            {kaptName} 커뮤니티에 포스트를 남겨보세요
          </Button>
        </Link>
        <InfiniteScroll
          dataLength={postData.length}
          next={() => setPage((prevState) => prevState + 1)}
          hasMore={hasMore}
          loader={<Progress size="xs" isIndeterminate />}
          endMessage={
            <a href="#">
              <Button color="blue.400" rightIcon={<BiArrowToTop size="30px" />}>
                마지막 포스트(클릭하고 맨 위로 가기)
              </Button>
            </a>
          }
        >
          {postData?.map((feed) => (
            <Card maxW="2xl" m={5}>
              <Link to={`/${kaptName}/feed/${feed.id}/`}>
                <CardHeader>
                  <Flex>
                    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                      <Avatar
                        name={feed.user.username}
                        src={feed.user.profile_photo}
                      />

                      <Box>
                        <Heading size="sm">{feed.user.username}</Heading>
                        <Text>{feed.created_at_string}</Text>
                      </Box>
                    </Flex>

                    {feed.user.username === user?.username && (
                      <Link to={`/${kaptName}/feed/${feed.id}/delete`}>
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

                    {feed.user.username === user?.username ? (
                      <Link to={`/${kaptName}/feed/${feed.id}/edit`}>
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
                  <Link to={`/${kaptName}/feed/${feed.id}/`}>
                    <Button
                      flex="1"
                      variant="ghost"
                      leftIcon={<BiChat />}
                      color="blue.500"
                    >
                      {feed.comments_count} Comment
                    </Button>
                  </Link>
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
        </InfiniteScroll>
      </Box>
    </AuthenticatedOnlyPage>
  );
}
