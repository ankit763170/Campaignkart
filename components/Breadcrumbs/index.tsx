import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const breadcrumbs = ("home" + pathname).split("/");


  let url = "/"

  return (
    <div>
      {breadcrumbs.map((item, idx) => {
        if(item!=="home"){
          url=url+item+"/";
          
        }
        return (
          <Link 
          //@ts-ignore
          key={item} href={`${url}`}>
          <span
            className={`${idx === breadcrumbs.length - 1 && "text-blue-700"}`}
          >
            {" "}
            {idx > 0 && "> "} {item}
          </span></Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
