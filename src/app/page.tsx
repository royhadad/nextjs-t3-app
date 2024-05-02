import { db } from "~/server/db";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageUploader } from "~/app/_components/ImageUpload";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function Images() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    orderBy: (modal, { desc }) => desc(modal.url),
    where: (model, { eq }) => eq(model.userId, user.userId),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id}>
          <Image width="192" height="192" src={image.url} alt="gallery item" />
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <ImageUploader />
        <Images />
      </SignedIn>
    </main>
  );
}
