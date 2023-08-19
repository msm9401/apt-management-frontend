import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
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
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
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
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "Sad to see you go...",
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
          title: "Done!",
          description: "See you later!",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);

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
        <InputGroup>
          <Input
            type="text"
            placeholder="아파트 찾기"
            value={value}
            onChange={handleChange}
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
    </Stack>
  );
}
