import Image from "next/image";
import SideBar from "@/components/SideBar";
import Publication from "@/components/Publication";
import { getPosts } from "@/lib/posts";
import { getUsers } from "@/lib/users";
import { GetServerSideProps } from "next/types";
import { Post, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import SideSection from "@/components/SideSection";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany();
  const users = await prisma.user.findMany();

  const postTest = JSON.parse(JSON.stringify(posts));
  const userTest = JSON.parse(JSON.stringify(users));

  return {
    props: { postTest, userTest },
  };
};

type Props = {
  postTest: Post[];
  userTest: User[];
};

export default function Home({ postTest: posts, userTest: users }: Props) {
  const getUserAuthor = (id?: number | null) => {
    const user = users?.find((user) => user.id === id);
    return user;
  };

  return (
    <div className="flex flex-row min-h-screen min-w-screen  bg-black overflow-hidden">
      <SideBar users={users} />
      <div className="w-full flex flex-col items-center py-12">
        <div className="h-8 flex items-center border-y-2 mb-4">
          <h1 className="text-white">Publication List Dump </h1>
        </div>
        <div className=" w-full max-w-2xl flex flex-col items-center  justify-center px-8 gap-4 mb-6 ">
          {posts?.map((post) => (
            <Publication
              key={post.id}
              url={getUserAuthor(post.authorId)?.profilePic ?? ""}
              name={getUserAuthor(post.authorId)?.name ?? ""}
              content={post.content ?? ""}
              date={post.createdAt}
              disable={true}
              postId={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
