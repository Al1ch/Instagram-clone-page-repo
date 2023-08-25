import React, { useEffect, useState } from "react";
import Tab from "./Tab";
import PublicationForm from "./PublicationForm";
import Publication from "./Publication";
import { Post } from "@prisma/client";
import axios from "axios";

type Props = {
  profilePic?: string | null;
  id?: number;
  name?: string;
  posts: Post[];
};

const PublicationSection = ({ profilePic, name, id: userId, posts }: Props) => {
  const [usersPosts, setUserPosts] = useState(posts);

  useEffect(() => {
    setUserPosts(posts); 
  }, [posts]);

  const handleChange = async () => {
    try {
      const newPosts = await axios.get(
        `http://localhost:3000/api/post?userId=${userId}`
      );
      setUserPosts(newPosts.data);
    } catch (e) {
      console.log("ERROR ?");
      console.log(e);
    }
  };

  const handleAddPost = (data: Post) => {
    setUserPosts([data, ...usersPosts]);
  };

  return (
    <div className=" w-full max-w-2xl flex flex-col items-center  justify-center px-8 gap-4 py-6 ">
      <div className="w-full flex justify-center items-center gap-16 ">
        <Tab label="Publications" />
      </div>
      <div className="w-full bg-white ">
        <PublicationForm
          image={profilePic ?? ""}
          authorId={userId}
          onAddPost={handleAddPost}
        />
      </div>
      {usersPosts?.map((post) => (
        <Publication
          key={post.id}
          url={profilePic ?? ""}
          name={name ?? ""}
          content={post.content ?? ""}
          date={post.createdAt as Date}
          postId={post.id}
          disable={false}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default PublicationSection;
