import { db } from "~/server/db";

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
            <img src={image.url} className="w-48" />
          </div>
        ))}
      </div>
    </main>
  );
}
