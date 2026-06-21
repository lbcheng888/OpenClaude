// @ts-nocheck
import {Se,dn as ln,bt as St} from "../../vendor/m195.ts";
import {pAe as Kfe,Dbn as YSn} from "../../vendor/m2509.ts";
import {x0t as i0t,R0t as s0t,R9r as O$r,jZ as PZ} from "../../vendor/m2510.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {formatFileSize as nl,ps as ds} from "../../vendor/m238.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function bxi(e) {
  if (e instanceof Error) {
    let n = e;
    if (n.code === "MODULE_NOT_FOUND" || n.code === "ERR_MODULE_NOT_FOUND" || n.code === "ERR_DLOPEN_FAILED") return M$r;
    if (n.code === "EACCES" || n.code === "EPERM") return tdd;
    if (n.code === "ENOMEM") return Txi;
  }
  let t = Se(e);
  if (t.includes("Native image processor module not available")) return M$r;
  if (t.includes("unsupported image format") || t.includes("Input buffer") || t.includes("Input file is missing") || t.includes("Input file has corrupt header") || t.includes("corrupt header") || t.includes("corrupt image") || t.includes("premature end") || t.includes("zlib: data error") || t.includes("zero width") || t.includes("zero height")) return Xud;
  if (t.includes("pixel limit") || t.includes("too many pixels") || t.includes("exceeds pixel") || t.includes("image dimensions")) return Qud;
  if (t.includes("out of memory") || t.includes("Cannot allocate") || t.includes("memory allocation")) return Txi;
  if (t.includes("timeout") || t.includes("timed out")) return Zud;
  if (t.includes("Vips")) return edd;
  return Sxi;
}
function Exi(e, t) {
  if (e === Sxi) return true;
  if (e === M$r) return ln(t) !== "ERR_DLOPEN_FAILED";
  return false;
}
function Cxi(e) {
  let t = e instanceof Error ? e.name !== "Error" ? e.name : e.constructor?.name ?? "Error" : typeof e,
    n = e instanceof Error ? String(e.code ?? "") : "";
  return {
    error_name: t,
    error_code: n
  };
}
function vxi(e) {
  let t = 5381;
  for (let n = 0; n < e.length; n++) t = (t << 5) + t + e.charCodeAt(n) | 0;
  return t >>> 0;
}
async function zfe(e, t, n, r) {
  if (e.length === 0) throw new IN("Image file is empty (0 bytes)");
  try {
    let o = await Kfe(),
      i = await o(e).metadata(),
      a = i.format ?? n,
      l = a === "jpg" ? "jpeg" : a;
    if (!i.width || !i.height) {
      let h = i0t(e);
      if (h === undefined || h.width > r.maxWidth || h.height > r.maxHeight) throw new IN(`Unable to resize image \u2014 could not verify image dimensions are within the ${r.maxWidth}x${r.maxHeight}px API limit.`);
      if (t > r.targetRawSize) return j("tengu_image_resize", {
        over_byte_limit: true,
        over_dimension_limit: false,
        original_size_bytes: t
      }), {
        buffer: await o(e).jpeg({
          quality: 80
        }).toBuffer(),
        mediaType: "jpeg"
      };
      return {
        buffer: e,
        mediaType: l
      };
    }
    let {
        width: c,
        height: u
      } = i,
      d = c,
      p = u;
    if (t <= r.targetRawSize && d <= r.maxWidth && p <= r.maxHeight) return {
      buffer: e,
      mediaType: l,
      dimensions: {
        originalWidth: c,
        originalHeight: u,
        displayWidth: d,
        displayHeight: p
      }
    };
    let m = d > r.maxWidth || p > r.maxHeight,
      f = l === "png";
    if (j("tengu_image_resize", {
      over_byte_limit: t > r.targetRawSize,
      over_dimension_limit: m,
      original_size_bytes: t,
      original_width: c,
      original_height: u
    }), !m && t > r.targetRawSize) {
      if (f) {
        let h = await o(e).png({
          compressionLevel: 9,
          palette: true
        }).toBuffer();
        if (h.length <= r.targetRawSize) return {
          buffer: h,
          mediaType: "png",
          dimensions: {
            originalWidth: c,
            originalHeight: u,
            displayWidth: d,
            displayHeight: p
          }
        };
      }
      for (let h of [80, 60, 40, 20]) {
        let g = await o(e).jpeg({
          quality: h
        }).toBuffer();
        if (g.length <= r.targetRawSize) return {
          buffer: g,
          mediaType: "jpeg",
          dimensions: {
            originalWidth: c,
            originalHeight: u,
            displayWidth: d,
            displayHeight: p
          }
        };
      }
    }
    if (d > r.maxWidth) p = Math.round(p * r.maxWidth / d), d = r.maxWidth;
    if (p > r.maxHeight) d = Math.round(d * r.maxHeight / p), p = r.maxHeight;
    v(`Resizing to ${d}x${p}`);
    let A = await o(e).resize(d, p, {
      fit: "inside",
      withoutEnlargement: true
    }).toBuffer();
    if (A.length > r.targetRawSize) {
      if (f) {
        let y = await o(e).resize(d, p, {
          fit: "inside",
          withoutEnlargement: true
        }).png({
          compressionLevel: 9,
          palette: true
        }).toBuffer();
        if (y.length <= r.targetRawSize) return {
          buffer: y,
          mediaType: "png",
          dimensions: {
            originalWidth: c,
            originalHeight: u,
            displayWidth: d,
            displayHeight: p
          }
        };
      }
      for (let y of [80, 60, 40, 20]) {
        let T = await o(e).resize(d, p, {
          fit: "inside",
          withoutEnlargement: true
        }).jpeg({
          quality: y
        }).toBuffer();
        if (T.length <= r.targetRawSize) return {
          buffer: T,
          mediaType: "jpeg",
          dimensions: {
            originalWidth: c,
            originalHeight: u,
            displayWidth: d,
            displayHeight: p
          }
        };
      }
      let h = Math.min(d, 1000),
        g = Math.round(p * h / Math.max(d, 1));
      v("Still too large, compressing with JPEG");
      let _ = await o(e).resize(h, g, {
        fit: "inside",
        withoutEnlargement: true
      }).jpeg({
        quality: 20
      }).toBuffer();
      return v(`JPEG compressed buffer size: ${_.length}`), {
        buffer: _,
        mediaType: "jpeg",
        dimensions: {
          originalWidth: c,
          originalHeight: u,
          displayWidth: h,
          displayHeight: g
        }
      };
    }
    return {
      buffer: A,
      mediaType: l,
      dimensions: {
        originalWidth: c,
        originalHeight: u,
        displayWidth: d,
        displayHeight: p
      }
    };
  } catch (o) {
    if (o instanceof IN) throw o;
    let s = bxi(o),
      i = Se(o);
    if (Exi(s, o)) Ie(o);else v(`Image resize failed: ${i}`, {
      level: "error"
    });
    j("tengu_image_resize_failed", {
      original_size_bytes: t,
      error_type: s,
      error_message_hash: vxi(i),
      ...Cxi(o)
    });
    let l = s0t(e).slice(6),
      c = Math.ceil(t * 4 / 3),
      u = i0t(e);
    if (u === undefined) throw new IN("Unable to resize image \u2014 image processing is unavailable and dimensions could not be read from the file header. " + "Please convert the image to PNG, JPEG, GIF, or WebP.");
    let d = u.width > r.maxWidth || u.height > r.maxHeight;
    if (c <= r.maxBase64Size && !d) return j("tengu_image_resize_fallback", {
      original_size_bytes: t,
      base64_size_bytes: c,
      error_type: s
    }), {
      buffer: e,
      mediaType: l
    };
    throw new IN(d ? `Unable to resize image \u2014 dimensions exceed the ${r.maxWidth}x${r.maxHeight}px limit and image processing failed. Please resize the image to reduce its pixel dimensions.` : `Unable to resize image (${nl(t)} raw, ${nl(c)} base64). The image exceeds the ${nl(r.maxBase64Size)} API limit and compression failed. Please resize the image manually or use a smaller image.`);
  }
}
async function ndd(e, t, n) {
  let r = await Kfe(),
    o = u => r(e).jpeg({
      quality: u
    }).toBuffer(),
    s = e,
    i = 90;
  if (!/jpe?g/i.test(n)) {
    let u = await o(90);
    if (u.length < s.length) s = u;
    if (u.length <= t) return u;
    i = 89;
  }
  let l = 1,
    c;
  for (let u = 0; u < 5; u++) {
    let d = Math.floor((l + i) / 2),
      p = await o(d);
    if (p.length < s.length) s = p;
    if (p.length <= t) c = p, l = d + 1;else i = d - 1;
    if (l > i) break;
  }
  return c ?? s;
}
async function qO({
  data: e,
  mediaType: t,
  limits: n
}) {
  let r = Buffer.isBuffer(e) ? e : Buffer.from(e, "base64"),
    o = t?.includes("/") ? t.split("/")[1] || "png" : t || "png",
    s;
  try {
    s = await zfe(r, r.length, o, n);
  } catch (l) {
    if (l instanceof IN) return j("tengu_image_resize_degraded", {}), {
      block: {
        type: "text",
        text: `[Image could not be processed: ${l.message}]`
      }
    };
    throw l;
  }
  let i = s.buffer;
  if (i.length > O$r) try {
    i = await ndd(s.buffer, O$r, s.mediaType);
  } catch (l) {
    v(`Image byte-budget compression failed, passing through unbudgeted: ${Se(l)}`, {
      level: "error"
    });
  }
  return {
    block: {
      type: "image",
      source: {
        type: "base64",
        media_type: s0t(i),
        data: i.toString("base64")
      }
    },
    dimensions: s.dimensions
  };
}
async function wxi(e, t) {
  if (e.source.type !== "base64") return {
    block: e
  };
  return qO({
    data: e.source.data,
    mediaType: e.source.media_type,
    limits: t
  });
}
async function Rxi(e, t, n) {
  let r = n?.split("/")[1] || "jpeg",
    o = r === "jpg" ? "jpeg" : r;
  try {
    let s = await Kfe(),
      i = await s(e).metadata(),
      a = i.format || o,
      l = e.length,
      c = {
        imageBuffer: e,
        metadata: i,
        format: a,
        maxBytes: t,
        originalSize: l
      };
    if (l <= t) return TM7(e, a, l);
    let u = await zM7(c, s);
    if (u) return u;
    if (a === "png") {
      let p = await d83(c, s);
      if (p) return p;
    }
    let d = await xN(c, 50, s);
    if (d) return d;
    return await $M7(c, s);
  } catch (s) {
    let i = bxi(s),
      a = Se(s);
    if (Exi(i, s)) Ie(s);else v(`Image compression failed: ${a}`, {
      level: "error"
    });
    if (j("tengu_image_compress_failed", {
      original_size_bytes: e.length,
      max_bytes: t,
      error_type: i,
      error_message_hash: vxi(a),
      ...Cxi(s)
    }), e.length <= t) {
      let l = s0t(e);
      return {
        base64: e.toString("base64"),
        mediaType: l,
        originalSize: e.length
      };
    }
    throw new IN(`Unable to compress image (${nl(e.length)}) to fit within ${nl(t)}. Please use a smaller image.`);
  }
}
async function xxi(e, t, n) {
  let r = Math.floor(t / 0.125),
    o = Math.floor(r * 0.75);
  return Rxi(e, o, n);
}
async function OM7(err, t) {
  if (err.source.type !== "base64") return err;
  let n = Buffer.from(err.source.data, "base64");
  if (n.length <= t) return err;
  let r = await Rxi(n, t);
  return {
    type: "image",
    source: {
      type: "base64",
      media_type: r.mediaType,
      data: r.base64
    }
  };
}
function TM7(err, t, n) {
  let r = t === "jpg" ? "jpeg" : t;
  return {
    base64: err.toString("base64"),
    mediaType: `image/${r}`,
    originalSize: n
  };
}
async function zM7(str, t) {
  let n = [1, 0.75, 0.5, 0.25];
  for (let r of n) {
    let o = Math.round((str.metadata.width || 2000) * r),
      s = Math.round((str.metadata.height || 2000) * r),
      i = t(str.imageBuffer).resize(o, s, {
        fit: "inside",
        withoutEnlargement: true
      });
    i = HzH(i, str.format);
    let a = await i.toBuffer();
    if (a.length <= str.maxBytes) return TM7(a, str.format, str.originalSize);
  }
  return null;
}
function HzH(imageBuffer, byteLength) {
  switch (byteLength) {
    case "png":
      return imageBuffer.png({
        compressionLevel: 9,
        palette: true
      });
    case "jpeg":
    case "jpg":
      return imageBuffer.jpeg({
        quality: 80
      });
    case "webp":
      return imageBuffer.webp({
        quality: 80
      });
    default:
      return imageBuffer;
  }
}
async function d83(imageBuffer, maxBytes) {
  let n = await maxBytes(imageBuffer.imageBuffer).resize(800, 800, {
    fit: "inside",
    withoutEnlargement: true
  }).png({
    compressionLevel: 9,
    palette: true,
    colors: 64
  }).toBuffer();
  if (n.length <= imageBuffer.maxBytes) return TM7(n, "png", imageBuffer.originalSize);
  return null;
}
async function xN(e, t, n) {
  let r = await n(e.imageBuffer).resize(600, 600, {
    fit: "inside",
    withoutEnlargement: true
  }).jpeg({
    quality: t
  }).toBuffer();
  if (r.length <= e.maxBytes) return TM7(r, "jpeg", e.originalSize);
  return null;
}
async function $M7(imageBlock, limits) {
  let n = await limits(imageBlock.imageBuffer).resize(400, 400, {
    fit: "inside",
    withoutEnlargement: true
  }).jpeg({
    quality: 20
  }).toBuffer();
  return TM7(n, "jpeg", imageBlock.originalSize);
}
function YM7(imageBuffer, maxBytes) {
  let {
    originalWidth: n,
    originalHeight: r,
    displayWidth: o,
    displayHeight: s
  } = imageBuffer;
  if (!n || !r || !o || !s || o <= 0 || s <= 0) {
    if (maxBytes) return `[Image source: ${maxBytes}]`;
    return null;
  }
  let i = n !== o || r !== s;
  if (!i && !maxBytes) return null;
  let a = [];
  if (maxBytes) a.push(`source: ${maxBytes}`);
  if (i) {
    let l = n / o;
    a.push(`original ${n}x${r}, displayed at ${o}x${s}. Multiply coordinates by ${l.toFixed(2)} to map to original image.`);
  }
  return `[Image: ${a.join(", ")}]`;
}
var M$r = 1,
  Xud = 2,
  Sxi = 3,
  Qud = 4,
  Txi = 5,
  Zud = 6,
  edd = 7,
  tdd = 8,
  IN;
var Dp = b(() => {
  PZ();
  Ct();
  YSn();
  je();
  St();
  ds();
  wn();
  IN = class IN extends Error {
    constructor(H) {
      super(H);
      this.name = "ImageResizeError";
    }
  };
});

export {bxi as xki,Exi as kki,Cxi as Hki,vxi as Iki,zfe as mAe,ndd as vmd,qO as ZO,wxi as Dki,Rxi as Pki,xxi as Oki,OM7 as Lki,TM7 as H0t,zM7 as wmd,HzH as Rmd,d83 as xmd,xN as kmd,$M7 as Hmd,YM7 as aet,M$r as k9r,Xud as Tmd,Sxi as Rki,Qud as Smd,Txi as wki,Zud as bmd,edd as Emd,tdd as Cmd,IN as QO,Dp as V4};
