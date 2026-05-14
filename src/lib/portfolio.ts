import worksData from "@/data/works.json";
import type { Work, WorkSource } from "@/types/work";

function toOptimizedPortfolioPath(work: Pick<WorkSource, "category" | "projectFolder">, fileName: string) {
  const optimizedFileName = fileName.replace(/\.[^.]+$/, ".webp");
  return `/portfolio-optimized/${work.category}/${work.projectFolder}/${optimizedFileName}`;
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

    const galleryImages = imageFiles.map((fileName) => toOptimizedPortfolioPath(work, fileName));

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
