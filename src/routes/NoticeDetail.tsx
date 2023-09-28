import { useQuery } from "@tanstack/react-query";
import { getNoticeDetail } from "../api";
import { INoticeDetail } from "../types";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

export default function NoticeDetail() {
  const { kaptName, id } = useParams();

  const { isLoading, data } = useQuery<INoticeDetail>(
    [kaptName, id, "notice_detail"],
    getNoticeDetail
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

      <Link to={`/${kaptName}/notice`}>
        <Heading margin={5} textAlign={"left"}>
          <BiArrowBack />
        </Heading>
      </Link>

      <Heading marginBottom={20} marginLeft={5}>
        {kaptName} 공지사항
      </Heading>

      <Heading color={"blue.400"} margin={5} size={"md"}>
        {data?.title}
      </Heading>

      <Text margin={5}>{data?.created_at_string}</Text>
      <Divider margin={5} width={"50%"} marginY={3} />
      <Text margin={5}>{data?.content}</Text>
    </Box>
  );
}
