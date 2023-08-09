import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;

  const { method } = req;
  console.log("VALUE", req.body);

  switch (method) {
    case "POST":
      try {
        const post = await prisma.post.create({
          data: {
            content: req.body.content,
            author: { connect: { id: req.body.authorId } },
            title: "title",
            published: true,
          },
        });
        return post;
      } catch (e) {
        console.log(e);
        return e;
      }
  }
}
