import React, { useState } from "react";
import Tab from "./Tab";
import PublicationForm from "./PublicationForm";
import Publication from "./Publication";
import { Post } from "@prisma/client";
import { getPostsByAuthor } from "@/lib/posts";
import { GetServerSideProps } from "next/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await prisma.user.findFirst({
    where: {
      userName: context.query.toString(),
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: user?.id,
      published: true,
    },
  });

  return {
    props: { posts },
  };
};

type Props = {
  profilePic?: string | null;
  id?: number;
  name?: string;
  posts?: Post[] | null;
};

const PublicationSection = ({ profilePic, name, id: userId, posts }: Props) => {
  return (
    <div className=" w-full max-w-2xl flex flex-col items-center  justify-center px-8 gap-4 py-6 ">
      <div className="w-full flex justify-center items-center gap-16 ">
        <Tab label="Publications" />
      </div>
      <div className="w-full bg-white ">
        <PublicationForm image={profilePic ?? ""} authorId={userId} />
      </div>
      {posts?.map((post) => (
        <Publication
          key={post.id}
          url={profilePic ?? ""}
          name={name ?? ""}
          content={post.content ?? ""}
          date={post.createdAt}
          postId={post.id}
          disable={false}
        />
      ))}
    </div>
  );
};

export default PublicationSection;
