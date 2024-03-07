"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchServices from "@/helpers/fetchServices";
import ServicesDetails from "@/../components/ServicesDetails/index";
import { IServices } from "@/type/index";
import CircularProgress from "@mui/material/CircularProgress";
// Todo: loading fix
const ServicesRoute = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [data, setData] = useState<IServices | null>(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
      const response = await fetchServices({slug:params.slug});
      setData(response.data?.allServices[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data, 'DATA')

  if (!data && loading)
  return (
<div className="w-full h-full  flex justify-center items-center ">
    <div className="flex justify-center items-center min-h-screen w-full">
      <CircularProgress/>
    </div>
</div>
    )
    

  if(data)
  return <div>
    <ServicesDetails data={data} refresh={getData}/>
  </div>;

};

export default ServicesRoute;
