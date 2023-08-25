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
        res.status(200).json(post);
      } catch (e) {
        console.log(e);
        return e;
      }
    case "GET":
      try {
        const post = await prisma.post.findMany({
          where: {
            authorId: parseInt(req.query.userId as string),
          },
        });
        res.status(200).json(post);
      } catch (e) {
        console.log(e);

        res.status(500).json({ error: "Unable to fetch posts" });
      }
  }
}
