import { images } from "~/server/db/schema";
import { db } from "~/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  // authentication
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const fullUserData = await clerkClient.users.getUser(user.userId);
  const body = (await request.json()) as {
    url: string;
  };

  await db.insert(images).values({
    url: body.url,
    userId: fullUserData.id,
  });

  return Response.json({});
}
