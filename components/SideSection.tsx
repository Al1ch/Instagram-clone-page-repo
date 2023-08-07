import React, { ReactElement, ReactNode, useState } from "react";
import SideBar from "./SideBar";
import { GetServerSideProps } from "next/types";
import { User } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany();
  console.log("USERS", users);

  return {
    props: { users },
  };
};

type Props = {
  users?: User[];
};
export const SideSection = ({ users }: Props) => {
  return <SideBar users={users} />;
};

export default SideSection;
