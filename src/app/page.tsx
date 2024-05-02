import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ImageUploader } from "~/app/_components/ImageUpload";
import { getImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getImages();
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
