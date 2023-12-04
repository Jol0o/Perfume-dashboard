import React from "react";
import EditProduct from "./../../../components/page/EditProduct";

function page({ params }) {
  const { id } = params;

  return (
    <>
      <EditProduct id={id}/>
    </>
  );
}

export default page;
