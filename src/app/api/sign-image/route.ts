import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  // authentication
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    env.CLOUDINARY_API_SECRET,
  );
  return Response.json({ signature });
}
