import { FaInfoCircle, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import Guidance from "./Guidance";
import useUser from "../lib/useUser";
import { logOut, guestLogIn } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const {
    isOpen: isGuidanceOpen,
    onClose: onGuidanceClose,
    onOpen: onGuidanceOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const navigate = useNavigate();

  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "로그 아웃...",
        description: "잠시만 기다려 주세요...",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        queryClient.refetchQueries(["houses"]);
        toast.update(toastId.current, {
          status: "success",
          title: "로그아웃",
          description: "안녕히 계세요",
        });
      }
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
  };

  const guestMutation = useMutation(guestLogIn, {
    onMutate: () => {
      toastId.current = toast({
        title: "로그인...",
        description: "잠시만 기다려 주세요...",
        status: "loading",
        position: "top",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        queryClient.refetchQueries(["houses"]);
        toast.update(toastId.current, {
          status: "success",
          title: "게스트 유저 상태",
          description: `안녕하세요. 둘러보기 기능입니다. 읽기만 가능하니 참고해주세요.`,
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const onGuestLogIn = async () => {
    guestMutation.mutate();
  };

  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);

  const handleOnClick = () => {
    navigate(`/houses/search?keyword=${value}`);
  };

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color="teal.500">
        <Link to={"/"}>
          <MdApartment size={"48"} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <Tooltip
          label="안내 사항"
          fontSize="md"
          fontWeight="bold"
          bg="orange.400"
          borderRadius="lg"
        >
          <IconButton
            colorScheme="orange"
            aria-label="Search database"
            icon={<FaInfoCircle />}
            onClick={onGuidanceOpen}
          />
        </Tooltip>
        <InputGroup>
          <Input
            type="text"
            placeholder="아파트 찾기"
            value={value}
            onChange={handleChange}
            onKeyDown={handleOnKeyPress}
          />
          <Link to={`/houses/search?keyword=${value}`}>
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                type="submit"
                icon={<FaSearch />}
              />
            </InputRightElement>
          </Link>
        </InputGroup>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                회원가입
              </Button>
              <Tooltip
                label="회원가입 없이 둘러보기"
                borderRadius={"md"}
                fontSize={"md"}
                fontWeight={"bold"}
                bg={"green"}
              >
                <Button onClick={onGuestLogIn} colorScheme="green">
                  둘러보기
                </Button>
              </Tooltip>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user?.username}
                  src={user?.profile_photo}
                  size={"md"}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <Guidance isOpen={isGuidanceOpen} onClose={onGuidanceClose} />
    </Stack>
  );
}
