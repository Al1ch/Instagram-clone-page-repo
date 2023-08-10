import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;

  if (req.method === "DELETE") {
    try {
      await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.status(200).json({ text: "Deleted" });
    } catch (e) {
      console.log("error /e", e);
      res.status(400).json({ error: e });
    }
  }
}
