import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import PublicationSection from "@/components/PublicationSection";
import { getPostsByAuthor } from "@/lib/posts";
import { getUsersById } from "@/lib/users";
import Header from "@/components/Header";
import { GetServerSideProps } from "next/types";
import { Post, User } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let user: User | null = null;
  let posts: Post[] | null = null;

  try {
    user = await prisma.user.findFirst({
      where: {
        userName: context.query.toString(),
      },
    });

    //AVOIR PEUT ETRE UN PROBLEME AVEC LE QUERY
    posts = await prisma.post.findMany({
      where: {
        authorId: user?.id,
        published: true,
      },
    });
  } catch (e) {
    console.log("ERRROR BUG ");
  }

  const postTest = JSON.parse(JSON.stringify(posts));
  const userTest = JSON.parse(JSON.stringify(user));

  return {
    props: { postTest, userTest },
  };
};

type Props = {
  posts?: Post[] | null;
  user?: User | null;
};

export default function ProfilePage(
  { posts, user }: Props,
  {
    params,
  }: {
    params: { userName: string };
  }
) {
  // const { user } = await getUsersById(params.userName);

  // const { posts } = await getPostsByAuthor(user?.id);

  return (
    <div className="w-full flex flex-col  items-center bg-black ">
      <div className="gap-16 flex flex-row items-center justify-center mt-8">
        <Image
          className="w-32 h-32 rounded-full"
          alt="profile"
          src={user?.profilePic ?? ""}
          width={100}
          height={100}
        />
        <div className="my-8 flex min-w-[125]">
          <div className=" flex flex-col gap-4 w-full  text-white ">
            <div className=" flex items-center gap-x-4">
              <p className="text-white">{user?.userName}</p>
              <div className="flex items-center gap-2 ">
                <Button
                  label="Message"
                  className="flex items-center border border-solid rounded border-stone-400 p-0.5 "
                />
              </div>
            </div>
            <div className="flex gap-3 justify-between w-full max-w-xs text-white	">
              <p>{user?.userName}</p>
              <div className="flex flex-col items-center">
                <h3>Abonnée</h3>
                <p>{user?.follower}</p>
              </div>
              <div className="flex flex-col items-center">
                <h3>Abonnement</h3>
                <p> {user?.following}</p>
              </div>
            </div>
            <div>{user?.Bio} </div>
          </div>
        </div>
      </div>
      {/* <PublicationSection {...user} posts={posts} /> */}
    </div>
  );
}