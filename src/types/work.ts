export type WorkCategory =
  | "品牌VI"
  | "电商设计"
  | "包装设计"
  | "AIGC视觉"
  | "Logo设计";

export type WorkSource = {
  title: string;
  category: WorkCategory;
  projectFolder: string;
  description: string;
  imageFiles?: string[];
  tags: string[];
  year: string;
};

export type Work = Omit<WorkSource, "imageFiles"> & {
  imageFiles: string[];
  coverImage: string;
  galleryImages: string[];
};
