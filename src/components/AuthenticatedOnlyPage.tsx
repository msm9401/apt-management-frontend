import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import { useToast } from "@chakra-ui/react";

interface IAuthenticatedOnlyPageProps {
  children: React.ReactNode;
}

export default function AuthenticatedOnlyPage({
  children,
}: IAuthenticatedOnlyPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        toast({
          title: "로그인이 필요한 서비스입니다.",
          description: "회원가입을 안하셨다면 회원가입을 진행해 주세요.",
          status: "warning",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
