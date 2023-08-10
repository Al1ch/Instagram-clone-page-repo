import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

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
    case "GET":
      console.log("EST CE QUE CA FAIT LE GET ");
      try {
        const post = await prisma.post.findMany({
          where: {
            authorId: parseInt(req.query.userId as string),
          },
        });
        return { post };
      } catch (e) {
        return { e };
      }
  }
}
