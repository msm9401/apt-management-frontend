import { useQuery } from "@tanstack/react-query";
import { getPollDetail } from "../api";
import { IPollDetail } from "../types";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { BsRecordFill } from "react-icons/bs";

export default function PollDetail() {
  const { kaptName, id } = useParams();

  const { isLoading, data } = useQuery<IPollDetail>(
    [kaptName, id, "poll_detail"],
    getPollDetail
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
            <Link to={`/${kaptName}/notice`}>
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
            <Link to={`/${kaptName}/poll`}>
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
          </Center>
        </Box>
      </Flex>

      <Link to={`/${kaptName}/poll`}>
        <Heading margin={5} textAlign={"left"}>
          <BiArrowBack />
        </Heading>
      </Link>

      <Heading marginBottom={20} marginLeft={5}>
        {kaptName} 투표
      </Heading>

      <Heading color={"blue.400"} margin={5} size={"md"}>
        투표 주제 : {data?.title}
      </Heading>

      <Text margin={5}>{data?.created_at_string}</Text>
      <Divider margin={5} width={"50%"} marginY={3} />
      <Text margin={5}>{data?.description}</Text>
      <Divider margin={5} width={"50%"} marginY={3} />

      <Heading color={"blue.400"} margin={5} size={"sm"}>
        아래 선택지 중에서 투표하시면 됩니다. 후보를 고르셨다면 선택지를
        클릭하셔서 투표창으로 넘어가 주세요.
      </Heading>

      {data?.choice_list.map((choice: any) => (
        <>
          <Link to={`/${kaptName}/poll/${id}/choice/${choice.id}/vote`}>
            <Button
              fontSize={"md"}
              fontWeight={"bold"}
              marginTop={5}
              marginBottom={2}
              marginLeft={5}
              color="orange"
            >
              <BsRecordFill size={15} />
              {choice.title}
            </Button>
          </Link>

          <Text fontSize={"sm"} marginLeft={5}>
            {choice.description}
          </Text>

          <Divider width={"50%"} marginY={3} />
        </>
      ))}
    </Box>
  );
}
