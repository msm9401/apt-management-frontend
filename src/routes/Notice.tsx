import { useQuery } from "@tanstack/react-query";
import { getNotice } from "../api";
import { INotice } from "../types";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export default function Notice() {
  const [page, setPage] = useState(1);
  const { kaptName } = useParams();

  const { isLoading, data } = useQuery<INotice>(
    [kaptName, "notice", page],
    getNotice
  );

  return (
    <Box
      mt={5}
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
            <Link to={`/${kaptName}/feed`}>
              <Button
                color="#38A169"
                variant="ghost"
                m={5}
                fontWeight="bold"
                fontSize="lg"
              >
                피드
              </Button>
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

      <Heading marginBottom={20} marginLeft={5}>
        {kaptName} 공지사항
      </Heading>

      {Number(data?.results.length) === 0 ? (
        <Text marginLeft={5} color={"tomato"}>
          <Badge marginRight={2} colorScheme="red">
            !
          </Badge>
          등록된 공지사항이 없습니다.
        </Text>
      ) : (
        <>
          {data?.results.map((notice: any) => (
            <>
              <Link to={`/${kaptName}/notice/${notice.pk}`}>
                {notice.created_at_string.indexOf("전") === -1 ? (
                  <Text
                    fontSize={"md"}
                    fontWeight={"bold"}
                    marginTop={5}
                    marginBottom={2}
                    color="orange"
                  >
                    {notice.title}
                  </Text>
                ) : (
                  <Text
                    fontSize={"md"}
                    fontWeight={"bold"}
                    marginTop={5}
                    marginBottom={2}
                    color="orange"
                  >
                    <Badge marginRight={2} colorScheme="purple">
                      New
                    </Badge>
                    {notice.title}
                  </Text>
                )}
                <Text fontSize={"sm"}>{notice.created_at_string}</Text>
              </Link>
              <Divider width={"50%"} marginY={3} />
            </>
          ))}
        </>
      )}
    </Box>
  );
}
