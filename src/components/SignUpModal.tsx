import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaUserNinja, FaLock } from "react-icons/fa";
import { ISignUpError, signUp } from "../api";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ISignUpForm {
  username: string;
  password: string;
  password2: string;
  extraError?: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: "환영합니다.",
        description:
          "등록된 아파트가 없어서 빈 화면이 뜹니다. 검색창에서 아파트를 검색 후 각 검색결과의 우측 상단에 초록색 하트를 눌러 본인 아파트를 등록해 주세요.",
        status: "success",
        position: "top",
        duration: 10000,
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      queryClient.refetchQueries(["houses"]);
      reset();
    },
    onError: (error: ISignUpError) => {
      toast({
        title: error.response.data.detail
          ? error.response.data.detail
          : error.response.data.username,
        status: "error",
        position: "top",
        isClosable: true,
        duration: 7000,
        variant: "subtle",
      });
    },
  });
  const onSubmit = ({ username, password, password2 }: ISignUpForm) => {
    if (password2 !== password) {
      setError("password2", { message: "Passwords are not the same" });
      return;
    }
    mutation.mutate({
      username,
      password,
      password2,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원가입</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please write a username",
                })}
                variant={"filled"}
                placeholder="아이디"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                variant={"filled"}
                placeholder="비밀번호"
                type={"password"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password2?.message)}
                {...register("password2", {
                  required: "Please write a password confirmation",
                })}
                variant={"filled"}
                placeholder="비밀번호 확인"
                type={"password"}
              />
            </InputGroup>
            {errors.password2 ? (
              <Box w="100%">
                <Text color="red.500">{errors.password2.message}</Text>
              </Box>
            ) : null}
          </VStack>
          <Button type="submit" mt={4} colorScheme={"red"} w="100%">
            회원가입
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
