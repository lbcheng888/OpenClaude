import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { basename, extname, isAbsolute, join, resolve } from "node:path";
import { homedir, tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { ApiMessageContent, ImageContentBlock, TextContentBlock } from "../api/client.js";

const execFileAsync = promisify(execFile);

export const PASTE_THRESHOLD = 800;
const API_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_EXTENSION_REGEX = /\.(png|jpe?g|gif|webp)$/iu;
const DATA_URL_IMAGE_REGEX = /^data:(image\/(?:png|jpe?g|gif|webp));base64,([a-z0-9+/=\s]+)$/iu;

export type PastedImage = {
  id: number;
  type: "image";
  content: string;
  mediaType: string;
  filename?: string;
  sourcePath?: string;
};

export type PastedImageInput = Omit<PastedImage, "id" | "type">;

export type ImageReferenceBounds = { id: number; match: string; start: number; end: number };

export function formatImageRef(id: number): string {
  return `[Image #${id}]`;
}

export function parseImageReferences(input: string): Array<{ id: number; match: string; index: number }> {
  const matches = [...input.matchAll(/\[Image #(\d+)\]/gu)];
  return matches
    .map(match => ({
      id: Number.parseInt(match[1] || "0", 10),
      match: match[0],
      index: match.index ?? 0,
    }))
    .filter(match => Number.isFinite(match.id) && match.id > 0);
}

export function getImageReferenceEndingAt(input: string, offset: number): ImageReferenceBounds | null {
  const safeOffset = clampOffset(input, offset);
  return getImageReferenceBounds(input).find(ref => ref.end === safeOffset) ?? null;
}

export function getImageReferenceStartingAt(input: string, offset: number): ImageReferenceBounds | null {
  const safeOffset = clampOffset(input, offset);
  return getImageReferenceBounds(input).find(ref => ref.start === safeOffset) ?? null;
}

export function getImageReferenceBoundsForDeletion(
  input: string,
  offset: number,
  direction: "before" | "after",
): ImageReferenceBounds | null {
  const safeOffset = clampOffset(input, offset);
  for (const ref of getImageReferenceBounds(input)) {
    if (direction === "before" && safeOffset > ref.start && safeOffset <= ref.end) return ref;
    if (direction === "after" && safeOffset >= ref.start && safeOffset < ref.end) return ref;
  }
  return null;
}

export function moveCursorAroundImageReference(
  input: string,
  offset: number,
  direction: "left" | "right",
): number | null {
  const safeOffset = clampOffset(input, offset);
  for (const ref of getImageReferenceBounds(input)) {
    if (direction === "left" && safeOffset > ref.start && safeOffset <= ref.end) return ref.start;
    if (direction === "right" && safeOffset >= ref.start && safeOffset < ref.end) return ref.end;
  }
  return null;
}

export function hasImagePasteCandidate(input: string): boolean {
  if (DATA_URL_IMAGE_REGEX.test(input.trim())) return true;
  DATA_URL_IMAGE_REGEX.lastIndex = 0;
  return splitPastedSegments(input).some(segment => isImageFilePath(segment));
}

export function isImagePasteShortcut(input: string, key: { ctrl?: boolean; meta?: boolean; super?: boolean }): boolean {
  if (input === "\x16") return true;
  if (isVKeyCsiUShortcut(input)) return true;
  const value = input.toLowerCase();
  return value === "v" && (key.ctrl === true || key.meta === true || key.super === true);
}

export async function readImagesFromPastedText(
  input: string,
  cwd = process.cwd(),
  options: { clipboardImagePath?: string | null } = {},
): Promise<{ images: PastedImageInput[]; text: string; foundImageCandidate: boolean }> {
  const segments = splitPastedSegments(input);
  const images: PastedImageInput[] = [];
  const textSegments: string[] = [];
  let foundImageCandidate = false;

  for (const segment of segments) {
    const trimmed = segment.trim();
    if (!trimmed) continue;

    const dataImage = readImageFromDataUrl(trimmed);
    if (dataImage) {
      foundImageCandidate = true;
      images.push(dataImage);
      continue;
    }

    if (isImageFilePath(trimmed)) {
      foundImageCandidate = true;
      images.push(await readImageFromPath(trimmed, cwd, options));
      continue;
    }

    textSegments.push(segment);
  }

  return {
    images,
    text: textSegments.join("\n").trim(),
    foundImageCandidate,
  };
}

export async function hasImageInClipboard(): Promise<boolean> {
  if (process.platform !== "darwin") return false;
  try {
    await execFileAsync("osascript", ["-e", "the clipboard as «class PNGf»"]);
    return true;
  } catch {
    const clipboardPath = await getImagePathFromClipboard();
    if (!clipboardPath || !isImageFilePath(clipboardPath)) return false;
    return existsSync(cleanImagePath(clipboardPath));
  }
}

export async function readClipboardImage(cwd = process.cwd()): Promise<PastedImageInput | null> {
  if (process.platform !== "darwin") return null;

  const tempPngPath = join(tmpdir(), `claude-code-clipboard-${process.pid}-${randomUUID()}.png`);
  const tempTiffPath = join(tmpdir(), `claude-code-clipboard-${process.pid}-${randomUUID()}.tiff`);
  let buffer: Buffer | null = null;
  try {
    try {
      await writeClipboardClassToFile("PNGf", tempPngPath);
      if (existsSync(tempPngPath)) {
        buffer = readFileSync(tempPngPath);
      }
    } catch {
      buffer = null;
    }

    if (!buffer || buffer.length === 0) {
      await writeClipboardClassToFile("TIFF", tempTiffPath);
      if (!existsSync(tempTiffPath)) return null;
      await execFileAsync("sips", ["-s", "format", "png", tempTiffPath, "--out", tempPngPath]);
      if (!existsSync(tempPngPath)) return null;
      buffer = readFileSync(tempPngPath);
    }
  } catch {
    buffer = null;
  } finally {
    try {
      if (existsSync(tempPngPath)) unlinkSync(tempPngPath);
      if (existsSync(tempTiffPath)) unlinkSync(tempTiffPath);
    } catch {
      // Best-effort cleanup only.
    }
  }

  if (!buffer) {
    const clipboardPath = await getImagePathFromClipboard();
    if (clipboardPath && isImageFilePath(clipboardPath) && existsSync(cleanImagePath(clipboardPath))) {
      return readImageFromPath(clipboardPath, cwd, { clipboardImagePath: null });
    }
    return null;
  }
  assertImageBufferUsable(buffer, "clipboard image");
  return {
    content: buffer.toString("base64"),
    mediaType: "image/png",
    filename: "clipboard.png",
  };
}

export async function getImagePathFromClipboard(): Promise<string | null> {
  if (process.platform !== "darwin") return null;
  try {
    const { stdout } = await execFileAsync("osascript", [
      "-e",
      "get POSIX path of (the clipboard as «class furl»)",
    ]);
    const path = stdout.trim();
    return path.length > 0 ? path : null;
  } catch {
    return null;
  }
}

export function buildUserContentWithImages(
  input: string,
  images: Record<number, PastedImage>,
): { content: ApiMessageContent; imageIds: number[] } {
  const refs = parseImageReferences(input);
  if (refs.length === 0) return { content: input.trim(), imageIds: [] };

  const blocks: Array<TextContentBlock | ImageContentBlock> = [];
  const imageIds: number[] = [];
  let cursor = 0;

  for (const ref of refs) {
    appendTextBlock(blocks, input.slice(cursor, ref.index));
    const image = images[ref.id];
    if (image?.content) {
      blocks.push({
        type: "image",
        id: image.id,
        filename: image.filename,
        sourcePath: image.sourcePath,
        source: {
          type: "base64",
          media_type: normalizeMediaType(image.mediaType),
          data: image.content,
        },
      });
      imageIds.push(ref.id);
    } else {
      appendTextBlock(blocks, ref.match);
    }
    cursor = ref.index + ref.match.length;
  }

  appendTextBlock(blocks, input.slice(cursor));
  const normalizedBlocks = blocks.filter(block => block.type !== "text" || block.text.trim().length > 0);
  if (imageIds.length === 0) return { content: input.trim(), imageIds: [] };
  return { content: normalizedBlocks, imageIds };
}

export function isImageFilePath(input: string): boolean {
  try {
    return IMAGE_EXTENSION_REGEX.test(cleanImagePath(input));
  } catch {
    return false;
  }
}

function splitPastedSegments(input: string): string[] {
  return input
    .replace(/\[I$/u, "")
    .replace(/\[O$/u, "")
    .split(/ (?=\/|~\/|\.\/|\.\.\/|[A-Za-z]:\\)/u)
    .flatMap(part => part.split(/\r\n|\r|\n/u));
}

function isVKeyCsiUShortcut(input: string): boolean {
  const match = /^\x1b\[(?:86|118);(\d+)u$/u.exec(input) ?? /^\x1b\[27;(\d+);(?:86|118)~$/u.exec(input);
  if (!match) return false;
  const modifier = Number.parseInt(match[1] || "0", 10);
  // CSI-u modifiers are 1 + bitmask. Ctrl is bit 2, Meta/Super commonly
  // arrives as bit 3 or vendor-specific higher combinations. xterm
  // modifyOtherKeys uses the same modifier field shape.
  return (modifier >= 5 && (modifier & 4) === 4) || (modifier >= 9 && (modifier & 8) === 8);
}

function getImageReferenceBounds(input: string): ImageReferenceBounds[] {
  return parseImageReferences(input).map(ref => ({
    id: ref.id,
    match: ref.match,
    start: ref.index,
    end: ref.index + ref.match.length,
  }));
}

function clampOffset(input: string, offset: number): number {
  return Math.max(0, Math.min(offset, input.length));
}

function readImageFromDataUrl(input: string): PastedImageInput | null {
  DATA_URL_IMAGE_REGEX.lastIndex = 0;
  const match = DATA_URL_IMAGE_REGEX.exec(input);
  if (!match) return null;
  const mediaType = normalizeMediaType(match[1] || "image/png");
  const data = (match[2] || "").replace(/\s+/gu, "");
  const buffer = Buffer.from(data, "base64");
  assertImageBufferUsable(buffer, "data URL image");
  const detected = detectMediaType(buffer, mediaType);
  return {
    content: buffer.toString("base64"),
    mediaType: detected,
    filename: `pasted.${extensionForMediaType(detected)}`,
  };
}

async function readImageFromPath(
  input: string,
  cwd: string,
  options: { clipboardImagePath?: string | null } = {},
): Promise<PastedImageInput> {
  const filePath = await resolveImagePathForRead(input, cwd, options);
  const buffer = readFileSync(filePath);
  assertImageBufferUsable(buffer, filePath);
  const mediaType = detectMediaType(buffer, filePath);
  return {
    content: buffer.toString("base64"),
    mediaType,
    filename: basename(filePath),
    sourcePath: filePath,
  };
}

export async function resolveImagePathForRead(
  input: string,
  cwd: string,
  options: { clipboardImagePath?: string | null } = {},
): Promise<string> {
  const cleaned = cleanImagePath(input);
  const filePath = expandPath(cleaned, cwd);
  if (existsSync(filePath) || isAbsolute(cleaned)) return filePath;

  const clipboardPath = options.clipboardImagePath === undefined
    ? await getImagePathFromClipboard()
    : options.clipboardImagePath;
  if (!clipboardPath) return filePath;

  const cleanedClipboardPath = cleanImagePath(clipboardPath);
  if (
    cleaned === basename(cleanedClipboardPath) &&
    isImageFilePath(cleanedClipboardPath) &&
    existsSync(cleanedClipboardPath)
  ) {
    return cleanedClipboardPath;
  }
  return filePath;
}

function cleanImagePath(input: string): string {
  let value = input.trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  if (/^file:\/\//iu.test(value)) {
    value = fileURLToPath(value);
  }
  if (process.platform !== "win32") {
    const placeholder = `__DOUBLE_BACKSLASH_${randomUUID()}__`;
    value = value.replace(/\\\\/gu, placeholder).replace(/\\(.)/gu, "$1").replaceAll(placeholder, "\\");
  }
  return value;
}

function expandPath(input: string, cwd: string): string {
  if (input.startsWith("~/")) return join(homedir(), input.slice(2));
  if (isAbsolute(input)) return input;
  return resolve(cwd, input);
}

function assertImageBufferUsable(buffer: Buffer, label: string): void {
  if (buffer.length === 0) {
    throw new Error(`Image is empty: ${label}`);
  }
  if (buffer.length > API_IMAGE_MAX_BYTES) {
    throw new Error(`Image is too large for API image input: ${label} (${buffer.length} bytes > ${API_IMAGE_MAX_BYTES} bytes)`);
  }
}

function detectMediaType(buffer: Buffer, fallback: string): string {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 6 && (buffer.subarray(0, 6).toString("ascii") === "GIF87a" || buffer.subarray(0, 6).toString("ascii") === "GIF89a")) {
    return "image/gif";
  }
  if (buffer.length >= 12 && buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return "image/webp";
  }
  return normalizeMediaType(mediaTypeFromExtension(fallback));
}

function mediaTypeFromExtension(value: string): string {
  if (value.startsWith("image/")) return value;
  switch (extname(value).toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    default:
      return "image/png";
  }
}

function normalizeMediaType(mediaType: string): string {
  const normalized = mediaType.toLowerCase() === "image/jpg" ? "image/jpeg" : mediaType.toLowerCase();
  if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(normalized)) {
    throw new Error(`Unsupported image media type: ${mediaType}`);
  }
  return normalized;
}

function extensionForMediaType(mediaType: string): string {
  switch (normalizeMediaType(mediaType)) {
    case "image/jpeg":
      return "jpg";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    default:
      return "png";
  }
}

function appendTextBlock(blocks: Array<TextContentBlock | ImageContentBlock>, text: string): void {
  if (!text) return;
  const previous = blocks.at(-1);
  if (previous?.type === "text") {
    previous.text += text;
    return;
  }
  blocks.push({ type: "text", text });
}

async function writeClipboardClassToFile(clipboardClass: "PNGf" | "TIFF", outputPath: string): Promise<void> {
  await execFileAsync("osascript", [
    "-e",
    `set image_data to (the clipboard as «class ${clipboardClass}»)`,
    "-e",
    `set fp to open for access POSIX file "${escapeAppleScriptString(outputPath)}" with write permission`,
    "-e",
    "set eof of fp to 0",
    "-e",
    "write image_data to fp",
    "-e",
    "close access fp",
  ]);
}

function escapeAppleScriptString(value: string): string {
  return value.replace(/\\/gu, "\\\\").replace(/"/gu, '\\"');
}
