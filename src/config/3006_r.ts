// @ts-nocheck
import {jnt as vnt,n9 as j$,aGr as AWr} from "../../vendor/m3004.ts";
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {Di as ki,uf as ff,dr as fr} from "../../vendor/m231.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {E5r as D8r} from "../../vendor/m2759.ts";
import {tn as nn,Hc as xc} from "../../vendor/m235.ts";
import {b} from "../../runtime.ts";
import {W2e as b2e} from "../../vendor/m2761.ts";
// @ts-nocheck
function IPd() {
  return vnt();
}
function Jl(e, t, n) {
  return {
    r: e,
    g: t,
    b: n,
    a: 255
  };
}
function P0(e) {
  return {
    r: e,
    g: 0,
    b: 0,
    a: 0
  };
}
function mWi(e) {
  if (e.includes("ansi")) return "ansi";
  return gt.level >= 3 ? "truecolor" : "color256";
}
function DPd(e, t, n) {
  let r = g => g < 48 ? 0 : g < 115 ? 1 : g < 155 ? 2 : g < 195 ? 3 : g < 235 ? 4 : 5,
    o = r(e),
    s = r(t),
    i = r(n),
    a = 16 + 36 * o + 6 * s + i,
    l = Math.round((e + t + n) / 3);
  if (l < 5) return 16;
  if (l > 244 && o === s && s === i) return a;
  let c = Math.max(0, Math.min(23, Math.round((l - 8) / 10))),
    u = 232 + c,
    d = 8 + c * 10,
    p = RU8[o],
    m = RU8[s],
    f = RU8[i],
    A = (e - p) ** 2 + (t - m) ** 2 + (n - f) ** 2;
  return (e - d) ** 2 + (t - d) ** 2 + (n - d) ** 2 < A ? u : a;
}
function iWi(e, t, n) {
  if (e.a === 0) {
    let o = e.r;
    if (o < 8) return `\x1B[${(t ? 30 : 40) + o}m`;
    if (o < 16) return `\x1B[${(t ? 90 : 100) + (o - 8)}m`;
    return `\x1B[${t ? 38 : 48};5;${o}m`;
  }
  if (e.a === 1) return t ? "\x1B[39m" : "\x1B[49m";
  let r = t ? 38 : 48;
  if (n === "truecolor") return `\x1B[${r};2;${e.r};${e.g};${e.b}m`;
  return `\x1B[${r};5;${DPd(e.r, e.g, e.b)}m`;
}
function PPd(e, t, n, r) {
  let o = r ? hWr + _Wr : hWr;
  for (let [s, i] of e) {
    if (o += iWi(s.foreground, true, t), !n) o += iWi(s.background, false, t);
    o += i;
  }
  return o + hWr;
}
function OPd(e) {
  if (e.includes("ansi")) return "ansi";
  if (e.includes("dark")) return "Monokai Extended";
  return "GitHub";
}
function fWi(e, t) {
  let n = e.includes("dark"),
    r = e.includes("ansi"),
    o = e.includes("daltonized"),
    s = t === "truecolor";
  if (r) return {
    addLine: K$H,
    addWord: K$H,
    addDecoration: P0(10),
    deleteLine: K$H,
    deleteWord: K$H,
    deleteDecoration: P0(9),
    foreground: n ? P0(7) : P0(0),
    background: K$H,
    scopes: MPd
  };
  if (n) {
    let u = Jl(248, 248, 242),
      d = Jl(61, 1, 0),
      p = Jl(92, 2, 0),
      m = Jl(220, 90, 90);
    if (o) return {
      addLine: s ? Jl(0, 27, 41) : P0(17),
      addWord: s ? Jl(0, 48, 71) : P0(24),
      addDecoration: Jl(81, 160, 200),
      deleteLine: d,
      deleteWord: p,
      deleteDecoration: m,
      foreground: u,
      background: K$H,
      scopes: aWi
    };
    return {
      addLine: s ? Jl(2, 40, 0) : P0(22),
      addWord: s ? Jl(4, 71, 0) : P0(28),
      addDecoration: Jl(80, 200, 80),
      deleteLine: d,
      deleteWord: p,
      deleteDecoration: m,
      foreground: u,
      background: K$H,
      scopes: aWi
    };
  }
  let i = Jl(51, 51, 51),
    a = Jl(255, 220, 220),
    l = Jl(255, 199, 199),
    c = Jl(207, 34, 46);
  if (o) return {
    addLine: Jl(219, 237, 255),
    addWord: Jl(179, 217, 255),
    addDecoration: Jl(36, 87, 138),
    deleteLine: a,
    deleteWord: l,
    deleteDecoration: c,
    foreground: i,
    background: K$H,
    scopes: lWi
  };
  return {
    addLine: Jl(220, 255, 220),
    addWord: Jl(178, 255, 178),
    addDecoration: Jl(36, 138, 61),
    deleteLine: a,
    deleteWord: l,
    deleteDecoration: c,
    foreground: i,
    background: K$H,
    scopes: lWi
  };
}
function PRn(e) {
  return {
    foreground: e.foreground,
    background: e.background
  };
}
function LRn(e, t) {
  switch (e) {
    case "+":
      return t.addLine;
    case "-":
      return t.deleteLine;
    case " ":
      return t.background;
  }
}
function NPd(e, t) {
  switch (e) {
    case "+":
      return t.addWord;
    case "-":
      return t.deleteWord;
    case " ":
      return t.background;
  }
}
function AWi(e, t) {
  switch (e) {
    case "+":
      return t.addDecoration;
    case "-":
      return t.deleteDecoration;
    case " ":
      return t.foreground;
  }
}
function makeRgbColor(r_2, g) {
  let n = NX6.basename(r_2),
    r = NX6.extname(r_2).slice(1),
    o = ki(n, "."),
    s = bm7.get(n) ?? bm7.get(o);
  if (s) {
    let i = j$(s);
    if (i) return i;
  }
  if (r) {
    let i = j$(r);
    if (i) return i;
  }
  if (g) {
    let i = g.startsWith("\uFEFF") ? g.slice(1) : g;
    if (i.startsWith("#!")) {
      if (i.includes("bash") || i.includes("/sh")) return j$("bash");
      if (i.includes("python")) return j$("python");
      if (i.includes("node")) return j$("javascript");
      if (i.includes("ruby")) return j$("ruby");
      if (i.includes("perl")) return j$("perl");
    }
    if (i.startsWith("<?php")) return j$("php");
    if (i.startsWith("<?xml")) return j$("xml");
  }
  return null;
}
function makeAnsiColor(ansiIndex, t, n) {
  if (!ansiIndex) return n.foreground;
  if (ansiIndex === "keyword" && LPd.has(t.trim())) return n.scopes.get("_storage") ?? n.foreground;
  return n.scopes.get(ansiIndex) ?? n.scopes.get(ki(ansiIndex, ".")) ?? n.foreground;
}
function getColorMode(theme, t, n, r) {
  if (typeof theme === "string") {
    let s = makeAnsiColor(n, theme, t);
    r.push([{
      foreground: s,
      background: t.background
    }, theme]);
    return;
  }
  let o = theme.scope ?? theme.kind ?? n;
  for (let s of theme.children) getColorMode(s, t, o, r);
}
function rgbToAnsi256(r) {
  return typeof r === "object" && r !== null && "rootNode" in r && typeof r.rootNode === "object" && r.rootNode !== null && "children" in r.rootNode;
}
function colorToAnsiSeq(color, isFg, colorMode) {
  let r = isFg + `
`;
  if (!color.lang) return [[PRn(colorMode), r]];
  let sgrBase;
  try {
    sgrBase = IPd().highlight(r, {
      language: color.lang,
      ignoreIllegals: true
    });
  } catch {
    return [[PRn(colorMode), r]];
  }
  if (!rgbToAnsi256(sgrBase.emitter)) {
    if (!uWi) uWi = true, Ie(Error(`color-diff: hljs emitter shape mismatch (keys: ${Object.keys(sgrBase.emitter).join(",")}). Syntax highlighting disabled.`));
    return [[PRn(colorMode), r]];
  }
  let s = [];
  return getColorMode(sgrBase.emitter.rootNode, colorMode, undefined, s), s;
}
function renderSpansToAnsi(spans) {
  let t = [],
    n = 0;
  while (n < spans.length) {
    let r = spans[n];
    if (/[\p{L}\p{N}_]/u.test(r)) {
      let o = n + 1;
      while (o < spans.length && /[\p{L}\p{N}_]/u.test(spans[o])) o++;
      t.push(spans.slice(n, o)), n = o;
    } else if (/\s/.test(r)) {
      let o = n + 1;
      while (o < spans.length && /\s/.test(spans[o])) o++;
      t.push(spans.slice(n, o)), n = o;
    } else {
      let s = spans.codePointAt(n) > 65535 ? 2 : 1;
      t.push(spans.slice(n, n + s)), n += s;
    }
  }
  return t;
}
function themeToHljsTheme(theme) {
  let t = [],
    n = 0;
  while (n < theme.length) if (theme[n] === "-") {
    let r = n,
      o = n;
    while (o < theme.length && theme[o] === "-") o++;
    let s = o;
    while (s < theme.length && theme[s] === "+") s++;
    let i = o - r,
      a = s - o;
    if (i > 0 && a > 0) {
      let l = Math.min(i, a);
      for (let c = 0; c < l; c++) t.push([r + c, o + c]);
      n = s;
    } else n = o;
  } else n++;
  return t;
}
function getDiffPalette(theme, colorMode) {
  let isDark = renderSpansToAnsi(theme),
    isAnsi = renderSpansToAnsi(colorMode),
    isDaltonized = D8r(isDark, isAnsi),
    isTruecolor = theme.length + colorMode.length,
    i = 0,
    a = [],
    fgLight = [],
    delLineLight = 0,
    delWordLight = 0;
  for (let d of isDaltonized) {
    let p = d.value.reduce((m, f) => m + f.length, 0);
    if (d.removed) i += p, a.push({
      start: delLineLight,
      end: delLineLight + p
    }), delLineLight += p;else if (d.added) i += p, fgLight.push({
      start: delWordLight,
      end: delWordLight + p
    }), delWordLight += p;else delLineLight += p, delWordLight += p;
  }
  if (isTruecolor > 0 && i / isTruecolor > UPd) return [[], []];
  return [a, fgLight];
}
function baseStyle(palette) {
  palette.lines = palette.lines.map(t => t.flatMap(([n, r]) => r.split(`
`).filter(o => o.length > 0).map(o => [n, o])));
}
function getLineBackgroundColor(marker) {
  return nn(marker);
}
function getWordBackgroundColor(marker, palette, n) {
  let r = [];
  for (let o of marker.lines) {
    let s = o.slice(),
      i = [],
      a = 0;
    while (s.length > 0) {
      let [l, c] = s.shift(),
        u = nn(c);
      if (a + u <= palette) i.push([l, c]), a += u;else {
        let d = palette - a,
          p = 0,
          m = 0;
        for (let f of c) {
          let A = getLineBackgroundColor(f);
          if (m + A > d) break;
          m += A, p += f.length;
        }
        if (p === 0) if (a === 0) p = c.codePointAt(0) > 65535 ? 2 : 1;else {
          r.push(i), s.unshift([l, c]), i = [], a = 0;
          continue;
        }
        i.push([l, c.slice(0, p)]), r.push(i), s.unshift([l, c.slice(p)]), i = [], a = 0;
      }
    }
    r.push(i);
  }
  if (marker.lines = r, marker.marker && marker.marker !== " ") {
    let o = LRn(marker.marker, n),
      s = {
        foreground: n.foreground,
        background: o
      };
    for (let i of marker.lines) {
      let a = i.reduce((l, [, c]) => l + nn(c), 0);
      if (a < palette) i.push([s, ff(" ", palette - a)]);
    }
  }
}
function getDecorationColor(marker, palette, n, r) {
  let o = {
      foreground: marker.marker ? AWi(marker.marker, palette) : palette.foreground,
      background: marker.marker ? LRn(marker.marker, palette) : palette.background
    },
    s = marker.marker === null || marker.marker === " ";
  for (let i = 0; i < marker.lines.length; i++) {
    let a = i === 0 ? ` ${String(marker.lineNumber).padStart(n)} ` : " ".repeat(n + 2),
      l = s && !r ? `${_Wr}${a}${pWi}` : a;
    marker.lines[i].unshift([o, l]);
  }
}
function detectLanguage(filePath, firstLine) {
  if (!filePath.marker) return;
  let ext = {
    foreground: AWi(filePath.marker, firstLine),
    background: LRn(filePath.marker, firstLine)
  };
  for (let r of filePath.lines) r.unshift([ext, filePath.marker]);
}
function getScopeColor(scope) {
  for (let t of scope.lines) if (t.length > 0) {
    t[0][1] = _Wr + t[0][1];
    let n = t.length - 1;
    t[n][1] = t[n][1] + pWi;
  }
}
function collectTokens(node, palette, scope) {
  if (!node.marker) return;
  let r = LRn(node.marker, palette),
    o = NPd(node.marker, palette),
    s = 0,
    i = 0;
  for (let a = 0; a < node.lines.length; a++) {
    let l = [];
    for (let [c, u] of node.lines[a]) {
      let d = i,
        p = i + u.length;
      while (s < scope.length && scope[s].end <= d) s++;
      if (s >= scope.length) {
        l.push([{
          ...c,
          background: r
        }, u]), i = p;
        continue;
      }
      let m = u,
        f = d;
      while (m.length > 0 && s < scope.length) {
        let A = scope[s],
          h = f >= A.start && f < A.end,
          g;
        if (h) g = Math.min(A.end, p);else if (A.start > f && A.start < p) g = A.start;else g = p;
        let _ = g - f,
          y = m.slice(0, _);
        if (l.push([{
          ...c,
          background: h ? o : r
        }, y]), m = m.slice(_), f = g, f >= A.end) s++;
      }
      if (m.length > 0) l.push([{
        ...c,
        background: r
      }, m]);
      i = p;
    }
    node.lines[a] = l;
  }
}
function isHljsTreeEmitter(emitter, t, n, r) {
  return emitter.lines.map(o => PPd(o, r, n, t));
}
function highlightLine(ctx) {
  let t = Math.max(0, ctx.oldStart + ctx.oldLines - 1),
    n = Math.max(0, ctx.newStart + ctx.newLines - 1);
  return Math.max(t, n);
}
function tokenizeForWordDiff(text) {
  return text === "+" || text === "-" ? text : " ";
}
class yWr {
  hunk;
  filePath;
  firstLine;
  prefixContent;
  constructor(e, t, n, r) {
    this.hunk = e, this.filePath = n, this.firstLine = t, this.prefixContent = r ?? null;
  }
  render(e, t, n) {
    let r = mWi(e),
      o = fWi(e, r),
      i = {
        lang: makeRgbColor(this.filePath, this.firstLine),
        stack: null
      };
    this.prefixContent;
    let a = String(highlightLine(this.hunk)).length,
      l = this.hunk.oldStart,
      c = this.hunk.newStart,
      u = Math.max(1, t - a - 2 - 1),
      d = this.hunk.lines.map(f => {
        let A = tokenizeForWordDiff(f.slice(0, 1)),
          h = f.slice(1),
          g;
        switch (A) {
          case "+":
            g = c++;
            break;
          case "-":
            g = l++;
            break;
          case " ":
            g = c, l++, c++;
            break;
        }
        return {
          lineNumber: g,
          marker: A,
          code: h
        };
      }),
      p = d.map(() => []);
    if (!n) {
      let f = d.map(A => A.marker);
      for (let [A, h] of themeToHljsTheme(f)) {
        let [g, _] = getDiffPalette(d[A].code, d[h].code);
        p[A] = g, p[h] = _;
      }
    }
    let m = [];
    for (let f = 0; f < d.length; f++) {
      let {
          lineNumber: A,
          marker: h,
          code: g
        } = d[f],
        _ = h === "-" ? [[PRn(o), g]] : colorToAnsiSeq(i, g, o),
        y = {
          marker: h,
          lineNumber: A,
          lines: [_]
        };
      if (baseStyle(y), collectTokens(y, o, p[f]), getWordBackgroundColor(y, u, o), r === "ansi" && h === "-") getScopeColor(y);
      detectLanguage(y, o), getDecorationColor(y, o, a, n), m.push(...isHljsTreeEmitter(y, n, false, r));
    }
    return m;
  }
}
class TWr {
  code;
  filePath;
  constructor(e, t) {
    this.code = e, this.filePath = t;
  }
  render(e, t, n) {
    let r = mWi(e),
      o = fWi(e, r),
      s = this.code.split(`
`);
    if (s.at(-1) === "") s.pop();
    let i = s[0] ?? null,
      l = {
        lang: makeRgbColor(this.filePath, i),
        stack: null
      },
      c = String(s.length).length,
      u = Math.max(1, t - c - 2),
      d = [];
    for (let p = 0; p < s.length; p++) {
      let m = colorToAnsiSeq(l, s[p], o),
        f = {
          marker: null,
          lineNumber: p + 1,
          lines: [m]
        };
      baseStyle(f), getWordBackgroundColor(f, u, o), getDecorationColor(f, o, c, n), d.push(...isHljsTreeEmitter(f, n, true, r));
    }
    return d;
  }
}
function normalizeMultilineRow(row) {
  let t = process.env.CLAUDE_CODE_SYNTAX_HIGHLIGHT ?? process.env.BAT_THEME;
  return {
    theme: OPd(row),
    source: null
  };
}
var NX6,
  hWr = "\x1B[0m",
  _Wr = "\x1B[2m",
  pWi = "\x1B[22m",
  K$H,
  RU8,
  aWi,
  lWi,
  LPd,
  MPd,
  bm7,
  uWi = false,
  UPd = 0.4;
var rm7 = b(() => {
  au();
  b2e();
  AWr();
  xc();
  wn();
  fr();
  NX6 = require("path");
  K$H = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
  RU8 = [0, 95, 135, 175, 215, 255];
  aWi = new Map([["keyword", Jl(249, 38, 114)], ["_storage", Jl(102, 217, 239)], ["built_in", Jl(166, 226, 46)], ["type", Jl(166, 226, 46)], ["literal", Jl(190, 132, 255)], ["number", Jl(190, 132, 255)], ["string", Jl(230, 219, 116)], ["title", Jl(166, 226, 46)], ["title.function", Jl(166, 226, 46)], ["title.class", Jl(166, 226, 46)], ["title.class.inherited", Jl(166, 226, 46)], ["params", Jl(253, 151, 31)], ["comment", Jl(117, 113, 94)], ["meta", Jl(117, 113, 94)], ["attr", Jl(166, 226, 46)], ["attribute", Jl(166, 226, 46)], ["variable", Jl(255, 255, 255)], ["variable.language", Jl(255, 255, 255)], ["property", Jl(255, 255, 255)], ["operator", Jl(249, 38, 114)], ["punctuation", Jl(248, 248, 242)], ["symbol", Jl(190, 132, 255)], ["regexp", Jl(230, 219, 116)], ["subst", Jl(248, 248, 242)]]), lWi = new Map([["keyword", Jl(167, 29, 93)], ["_storage", Jl(167, 29, 93)], ["built_in", Jl(0, 134, 179)], ["type", Jl(0, 134, 179)], ["literal", Jl(0, 134, 179)], ["number", Jl(0, 134, 179)], ["string", Jl(24, 54, 145)], ["title", Jl(121, 93, 163)], ["title.function", Jl(121, 93, 163)], ["title.class", Jl(0, 0, 0)], ["title.class.inherited", Jl(0, 0, 0)], ["params", Jl(0, 134, 179)], ["comment", Jl(150, 152, 150)], ["meta", Jl(150, 152, 150)], ["attr", Jl(0, 134, 179)], ["attribute", Jl(0, 134, 179)], ["variable", Jl(0, 134, 179)], ["variable.language", Jl(0, 134, 179)], ["property", Jl(0, 134, 179)], ["operator", Jl(167, 29, 93)], ["punctuation", Jl(51, 51, 51)], ["symbol", Jl(0, 134, 179)], ["regexp", Jl(24, 54, 145)], ["subst", Jl(51, 51, 51)]]), LPd = new Set(["const", "let", "var", "function", "class", "type", "interface", "enum", "namespace", "module", "def", "fn", "func", "struct", "trait", "impl"]), MPd = new Map([["keyword", P0(13)], ["_storage", P0(14)], ["built_in", P0(14)], ["type", P0(14)], ["literal", P0(12)], ["number", P0(12)], ["string", P0(10)], ["title", P0(11)], ["title.function", P0(11)], ["title.class", P0(11)], ["comment", P0(8)], ["meta", P0(8)]]);
  bm7 = new Map([["Dockerfile", "dockerfile"], ["Makefile", "makefile"], ["Rakefile", "ruby"], ["Gemfile", "ruby"], ["CMakeLists", "cmake"]]);
});

export {IPd as eMd,Jl as Xl,P0 as L0,mWi as CGi,DPd as tMd,iWi as gGi,PPd as nMd,OPd as rMd,fWi as vGi,PRn as gxn,LRn as yxn,NPd as iMd,AWi as wGi,makeRgbColor as RGi,makeAnsiColor as aMd,getColorMode as xGi,rgbToAnsi256 as lMd,colorToAnsiSeq as kGi,renderSpansToAnsi as bGi,themeToHljsTheme as uMd,getDiffPalette as dMd,baseStyle as HGi,getLineBackgroundColor as pMd,getWordBackgroundColor as IGi,getDecorationColor as DGi,detectLanguage as mMd,getScopeColor as fMd,collectTokens as AMd,isHljsTreeEmitter as PGi,highlightLine as hMd,tokenizeForWordDiff as gMd,yWr as dGr,TWr as pGr,normalizeMultilineRow as OGi,NX6 as _xn,hWr as lGr,_Wr as uGr,pWi as EGi,K$H as hhe,RU8 as cGr,aWi as _Gi,lWi as yGi,LPd as oMd,MPd as sMd,bm7 as TGi,uWi as SGi,UPd as cMd,rm7 as LGi};
