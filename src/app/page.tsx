const imagesURLs = [
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-2.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-3.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-4.jpg",
  "https://res.cloudinary.com/dg7ubxufe/image/upload/v1714022525/cld-sample-5.jpg",
];

const images = imagesURLs.map((url, index) => ({
  id: index,
  src: url,
}));

export default function HomePage() {
  return (
    <main className="">
      Hello gallery app!
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map(({ id, src }) => (
          <img key={id} src={src} className="w-48" />
        ))}
      </div>
    </main>
  );
}
