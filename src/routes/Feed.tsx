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
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { IFeedList } from "../types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

export default function Feed() {
  const { kaptName } = useParams();
  const { isLoading, data } = useQuery<IFeedList[]>(
    [kaptName, `feed`],
    getFeed
  );
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Link to={`/houses/${kaptName}/feed/upload`}>
        <Button colorScheme="teal" variant="outline" m={5}>
          포스트를 남겨보세요
        </Button>
      </Link>
      {data?.map((feed) => (
        <Card maxW="2xl" m={5}>
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
              {feed.comments_count} Comment
            </Button>
            <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Box>
  );
}
