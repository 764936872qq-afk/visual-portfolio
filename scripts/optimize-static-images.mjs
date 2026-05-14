import { mkdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "portfolio");
const outputRoot = path.join(root, "public", "portfolio-optimized");
const worksPath = path.join(root, "src", "data", "works.json");

function normalizeImageFiles(imageFiles) {
  if (!Array.isArray(imageFiles)) return [];
  return Array.from(new Set(imageFiles.map((fileName) => String(fileName).trim()).filter(Boolean)));
}

function optimizedFileName(fileName) {
  return `${path.parse(fileName).name}.webp`;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function shouldWrite(sourcePath, outputPath) {
  try {
    const [sourceInfo, outputInfo] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return outputInfo.mtimeMs < sourceInfo.mtimeMs;
  } catch {
    return true;
  }
}

async function optimizeImage({ sourcePath, outputPath, isCover }) {
  if (!(await exists(sourcePath))) {
    console.warn(`Missing image: ${path.relative(root, sourcePath)}`);
    return { skipped: true, bytesBefore: 0, bytesAfter: 0 };
  }

  if (!(await shouldWrite(sourcePath, outputPath))) {
    const [sourceInfo, outputInfo] = await Promise.all([stat(sourcePath), stat(outputPath)]);
    return { skipped: true, bytesBefore: sourceInfo.size, bytesAfter: outputInfo.size };
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  const sourceInfo = await stat(sourcePath);
  const maxWidth = isCover ? 1080 : 1440;
  const quality = isCover ? 66 : 72;

  await sharp(sourcePath, { limitInputPixels: 64_000_000 })
    .rotate()
    .resize({
      width: maxWidth,
      height: isCover ? 1350 : 1920,
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({
      quality,
      effort: 5,
      smartSubsample: true
    })
    .toFile(outputPath);

  const outputInfo = await stat(outputPath);
  return { skipped: false, bytesBefore: sourceInfo.size, bytesAfter: outputInfo.size };
}

async function main() {
  const works = JSON.parse(await readFile(worksPath, "utf8"));
  let processed = 0;
  let skipped = 0;
  let before = 0;
  let after = 0;

  for (const work of works) {
    const imageFiles = normalizeImageFiles(work.imageFiles);

    for (const [index, fileName] of imageFiles.entries()) {
      const sourcePath = path.join(sourceRoot, work.category, work.projectFolder, fileName);
      const outputPath = path.join(outputRoot, work.category, work.projectFolder, optimizedFileName(fileName));
      const result = await optimizeImage({ sourcePath, outputPath, isCover: index === 0 });

      if (result.skipped) {
        skipped += 1;
      } else {
        processed += 1;
      }

      before += result.bytesBefore;
      after += result.bytesAfter;
    }
  }

  const saved = before > 0 ? Math.round((1 - after / before) * 100) : 0;
  console.log(`Static images ready: ${processed} optimized, ${skipped} unchanged, ${saved}% smaller.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
