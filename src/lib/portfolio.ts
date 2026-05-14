import worksData from "@/data/works.json";
import type { Work, WorkSource } from "@/types/work";

function toPortfolioPath(work: Pick<WorkSource, "category" | "projectFolder">, fileName: string) {
  return `/portfolio/${work.category}/${work.projectFolder}/${fileName}`;
}

function normalizeImageFiles(imageFiles: WorkSource["imageFiles"]) {
  if (!Array.isArray(imageFiles)) return [];

  return Array.from(new Set(imageFiles.map((fileName) => fileName.trim()).filter(Boolean)));
}

export function getPortfolioWorks(): Work[] {
  return (worksData as WorkSource[]).flatMap((work) => {
    const imageFiles = normalizeImageFiles(work.imageFiles);

    if (imageFiles.length === 0) {
      return [];
    }

    const galleryImages = imageFiles.map((fileName) => toPortfolioPath(work, fileName));

    return [
      {
        ...work,
        imageFiles,
        coverImage: galleryImages[0],
        galleryImages
      }
    ];
  });
}
