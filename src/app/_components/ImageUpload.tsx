"use client";

import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { useRouter } from "next/navigation";
const FILE_SIZE_5_MB = 5 * 1024 * 1024;

export const ImageUploader: React.FC = () => {
  const router = useRouter();

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      options={{ folder: "next-t3-app-images", maxFileSize: FILE_SIZE_5_MB }}
      onSuccess={async (result) => {
        const { info } = result;
        if (info && typeof info !== "string") {
          const { secure_url } = info;
          await uploadImage(secure_url);
          router.refresh();
        }
      }}
    >
      {({ open }) => (
        <button
          className="mb-4 rounded bg-indigo-500 px-4 py-2 text-white"
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  );
};

async function uploadImage(url: string): Promise<void> {
  await fetch("/api/upload-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
}
