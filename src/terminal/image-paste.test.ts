import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  buildUserContentWithImages,
  formatImageRef,
  getImageReferenceBoundsForDeletion,
  getImageReferenceEndingAt,
  getImageReferenceStartingAt,
  isImagePasteShortcut,
  moveCursorAroundImageReference,
  readImagesFromPastedText,
  resolveImagePathForRead,
  type PastedImage,
} from "./image-paste.js";

const ONE_PIXEL_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("image paste", () => {
  test("recognizes the official image paste shortcut", () => {
    expect(isImagePasteShortcut("v", { ctrl: true })).toBe(true);
    expect(isImagePasteShortcut("\x16", { ctrl: true })).toBe(true);
    expect(isImagePasteShortcut("\x16", {})).toBe(true);
    expect(isImagePasteShortcut("v", { meta: true })).toBe(true);
    expect(isImagePasteShortcut("v", { super: true })).toBe(true);
    expect(isImagePasteShortcut("\x1b[118;5u", {})).toBe(true);
    expect(isImagePasteShortcut("\x1b[118;9u", {})).toBe(true);
    expect(isImagePasteShortcut("\x1b[27;5;118~", {})).toBe(true);
    expect(isImagePasteShortcut("\x1b[27;9;86~", {})).toBe(true);
    expect(isImagePasteShortcut("v", {})).toBe(false);
    expect(isImagePasteShortcut("x", { ctrl: true })).toBe(false);
  });

  test("treats image refs as atomic editable chips", () => {
    const ref = formatImageRef(7);
    const input = `before ${ref} after`;
    const start = input.indexOf(ref);
    const end = start + ref.length;

    expect(getImageReferenceStartingAt(input, start)).toMatchObject({ id: 7, start, end });
    expect(getImageReferenceEndingAt(input, end)).toMatchObject({ id: 7, start, end });
    expect(moveCursorAroundImageReference(input, end, "left")).toBe(start);
    expect(moveCursorAroundImageReference(input, start, "right")).toBe(end);
    expect(moveCursorAroundImageReference(input, start + 3, "left")).toBe(start);
    expect(moveCursorAroundImageReference(input, start + 3, "right")).toBe(end);
    expect(getImageReferenceBoundsForDeletion(input, end, "before")).toMatchObject({ id: 7, start, end });
    expect(getImageReferenceBoundsForDeletion(input, start, "after")).toMatchObject({ id: 7, start, end });
  });

  test("reads pasted image file paths as image inputs", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-image-paste-"));
    const imagePath = join(tempDir, "sample.png");
    writeFileSync(imagePath, Buffer.from(ONE_PIXEL_PNG_BASE64, "base64"));

    const result = await readImagesFromPastedText(imagePath, tempDir);

    expect(result.foundImageCandidate).toBe(true);
    expect(result.text).toBe("");
    expect(result.images).toHaveLength(1);
    expect(result.images[0]).toMatchObject({
      content: ONE_PIXEL_PNG_BASE64,
      mediaType: "image/png",
      filename: "sample.png",
      sourcePath: imagePath,
    });
  });

  test("reads pasted file URL image paths", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-image-paste-"));
    const imagePath = join(tempDir, "sample url.png");
    writeFileSync(imagePath, Buffer.from(ONE_PIXEL_PNG_BASE64, "base64"));

    const result = await readImagesFromPastedText(pathToFileURL(imagePath).href, tempDir);

    expect(result.foundImageCandidate).toBe(true);
    expect(result.text).toBe("");
    expect(result.images).toHaveLength(1);
    expect(result.images[0]).toMatchObject({
      content: ONE_PIXEL_PNG_BASE64,
      mediaType: "image/png",
      filename: "sample url.png",
      sourcePath: imagePath,
    });
  });

  test("resolves a pasted filename through the clipboard file URL path", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "claude-image-paste-"));
    const imagePath = join(tempDir, "clipboard-name.png");
    writeFileSync(imagePath, Buffer.from(ONE_PIXEL_PNG_BASE64, "base64"));

    await expect(resolveImagePathForRead("clipboard-name.png", tmpdir(), { clipboardImagePath: imagePath })).resolves.toBe(imagePath);
    const result = await readImagesFromPastedText("clipboard-name.png", tmpdir(), { clipboardImagePath: imagePath });

    expect(result.foundImageCandidate).toBe(true);
    expect(result.images[0]).toMatchObject({
      filename: "clipboard-name.png",
      sourcePath: imagePath,
    });
  });

  test("builds user content blocks only for image refs still present in the prompt", () => {
    const pastedImages: Record<number, PastedImage> = {
      1: {
        id: 1,
        type: "image",
        content: ONE_PIXEL_PNG_BASE64,
        mediaType: "image/png",
        filename: "sample.png",
      },
    };

    expect(buildUserContentWithImages(`describe ${formatImageRef(1)}`, pastedImages)).toEqual({
      imageIds: [1],
      content: [
        { type: "text", text: "describe " },
        {
          type: "image",
          id: 1,
          filename: "sample.png",
          sourcePath: undefined,
          source: {
            type: "base64",
            media_type: "image/png",
            data: ONE_PIXEL_PNG_BASE64,
          },
        },
      ],
    });

    expect(buildUserContentWithImages("describe without image", pastedImages)).toEqual({
      imageIds: [],
      content: "describe without image",
    });
  });
});
