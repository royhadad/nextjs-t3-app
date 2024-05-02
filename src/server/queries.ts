import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";

export async function getImages() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  const images = await db.query.images.findMany({
    orderBy: (modal, { desc }) => desc(modal.url),
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  return images;
}
