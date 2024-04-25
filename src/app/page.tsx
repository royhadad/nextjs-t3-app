import { db } from "~/server/db";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (modal, { desc }) => desc(modal.name),
  });
  return (
    <main className="">
      Hello gallery app!
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id}>
            {image.name}
            <Image
              width="192"
              height="192"
              src={image.url}
              alt="gallery item"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
