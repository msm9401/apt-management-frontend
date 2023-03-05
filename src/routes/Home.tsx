import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getApartment } from "../api";
import Apartment from "../components/Apartment";
import ApartmentSkeleton from "../components/ApartmentSkeleton";

interface IApartment {
  pk: number;
  address_do: string;
  address_si: string;
  address_dong: string;
  address_li: string;
  kapt_name: string;
}

export default function Home() {
  const { isLoading, data } = useQuery<IApartment[]>(["houses"], getApartment);
  return (
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
          imageUrl={`https://source.unsplash.com/random/450x450`}
          address_do={apt.address_do}
          address_si={apt.address_si}
          address_dong={apt.address_dong}
          address_li={apt.address_li}
          kapt_name={apt.kapt_name}
        />
      ))}
    </Grid>
  );
}
