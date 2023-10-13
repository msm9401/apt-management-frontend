import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchApt } from "../api";
import { Grid, useToast } from "@chakra-ui/react";
import { IApartmentList } from "../types";
import Apartment from "../components/Apartment";
import ApartmentSkeleton from "../components/ApartmentSkeleton";
import AuthenticatedOnlyPage from "../components/AuthenticatedOnlyPage";

export default function Search() {
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const { isLoading, data } = useQuery<IApartmentList[]>(
    [searchParams.get("keyword")],
    searchApt,
    {
      onError: (error: any) => {
        toast({
          title: error.response.data.detail,
          status: "warning",
          position: "top",
          isClosable: true,
          duration: 7000,
          variant: "subtle",
        });
      },
    }
  );

  return (
    <AuthenticatedOnlyPage>
      <Grid
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
        columnGap={4}
        rowGap={8}
        templateColumns={{
          sm: "1fr",
          md: "1fr 1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
      >
        {isLoading ? (
          <>
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
            <ApartmentSkeleton />
          </>
        ) : null}
        {data?.map((apt) => (
          <Apartment
            key={apt.pk}
            pk={apt.pk}
            imageUrl={`https://cdn.pixabay.com/photo/2013/07/12/18/09/apartment-building-153091_960_720.png`}
            address_do={apt.address_do}
            address_si={apt.address_si}
            address_dong={apt.address_dong}
            address_li={apt.address_li}
            kapt_name={apt.kapt_name}
          />
        ))}
      </Grid>
    </AuthenticatedOnlyPage>
  );
}
