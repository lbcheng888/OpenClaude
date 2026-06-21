// @ts-nocheck
import {_t as gt,cu as au} from "../../vendor/m582.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function hasArgvFlag(flagSet) {
  let dashDashIndex = process.argv.indexOf("--");
  return (dashDashIndex === -1 ? process.argv : process.argv.slice(0, dashDashIndex)).some(K => flagSet.has(K));
}
function applyNoColor() {
  if (process.env.NO_COLOR && process.env.FORCE_COLOR === undefined && !hasForceColorFlag() && gt.level > 0) return gt.level = 0, true;
  return false;
}
function applyVscodeColor() {
  if (process.env.TERM_PROGRAM === "vscode" && gt.level === 2) return gt.level = 3, true;
  return false;
}
function applyTruecolorTerminal() {
  if (!process.stdout.isTTY || process.env.NO_COLOR || process.env.FORCE_COLOR !== undefined || hasNoColorFlag()) return false;
  let term = process.env.TERM;
  if (term && truecolorTerminals.has(term) && gt.level < 3) return gt.level = 3, true;
  return false;
}
function applyTmuxDowngrade() {
  if (process.env.CLAUDE_CODE_TMUX_TRUECOLOR) return false;
  if (process.env.TMUX && gt.level > 2) return gt.level = 2, true;
  return false;
}
function setColorLevelFromCaps(capsFlag) {
  if (capsFlag && gt.level > 2) return gt.level = 2, true;
  return false;
}
function inverseText(text) {
  return "\x1B[7m" + text + "\x1B[27m";
}
function getColorLevelChangeCount() {
  return colorLevelChangeCount;
}
function setColorLevel(requestedLevel) {
  let effectiveLevel = requestedLevel !== undefined && requestedLevel < maxColorLevel ? requestedLevel : maxColorLevel;
  if (effectiveLevel !== gt.level) gt.level = effectiveLevel, colorLevelChangeCount++;
}
function downgradeRgbToAnsi256(spans) {
  if (gt.level >= 3 || spans.length === 0) return spans;
  let result;
  for (let q = 0; q < spans.length; q++) {
    let span = spans[q],
      match = rgbAnsiRegex.exec(span.code);
    if (match) result ??= spans.slice(0, q), result.push({
      type: "ansi",
      code: `\x1B[${match[1]};5;${rgbToAnsi256Index(+match[2], +match[3], +match[4])}m`,
      endCode: span.endCode
    });else if (result) result.push(span);
  }
  return result ?? spans;
}
function rgbToAnsi256Index(r_2, g, b) {
  let cubeStep = v => v < 48 ? 0 : v < 115 ? 1 : v < 155 ? 2 : v < 195 ? 3 : v < 235 ? 4 : 5,
    rIdx = cubeStep(r_2),
    gIdx = cubeStep(g),
    bIdx = cubeStep(b),
    cubeIndex = 16 + 36 * rIdx + 6 * gIdx + bIdx,
    avg = Math.round((r_2 + g + b) / 3);
  if (avg < 5) return 16;
  if (avg > 244 && rIdx === gIdx && gIdx === bIdx) return cubeIndex;
  let grayStep = Math.max(0, Math.min(23, Math.round((avg - 8) / 10))),
    grayIndex = 232 + grayStep,
    grayValue = 8 + grayStep * 10,
    rStop = ansi256ColorStops[rIdx],
    gStop = ansi256ColorStops[gIdx],
    bStop = ansi256ColorStops[bIdx],
    cubeDist = (r_2 - rStop) ** 2 + (g - gStop) ** 2 + (b - bStop) ** 2;
  return (r_2 - grayValue) ** 2 + (g - grayValue) ** 2 + (b - grayValue) ** 2 < cubeDist ? grayIndex : cubeIndex;
}
function applyTextStyle(text, style) {
  let result = text;
  if (style.inverse) result = inverseText(result);
  if (style.strikethrough) result = gt.strikethrough(result);
  if (style.underline) result = gt.underline(result);
  if (style.italic) result = gt.italic(result);
  if (style.bold) result = gt.bold(result);
  if (style.dim) result = gt.dim(result);
  if (style.color) result = applyColorToText(result, style.color, "foreground");
  if (style.backgroundColor) result = applyColorToText(result, style.backgroundColor, "background");
  return result;
}
function colorizeText(text, colorSpec) {
  if (!colorSpec) return text;
  return applyColorToText(text, colorSpec, "foreground");
}
var noColorArgFlags,
  forceColorArgFlags,
  hasNoColorFlag = () => hasArgvFlag(noColorArgFlags),
  hasForceColorFlag = () => hasArgvFlag(forceColorArgFlags),
  truecolorTerminals,
  noColorApplied,
  vscodeColorApplied,
  truecolorApplied,
  tmuxDowngradeApplied,
  maxColorLevel,
  colorLevelChangeCount = 0,
  rgbAnsiRegex,
  ansi256ColorStops,
  rgbColorRegex,
  ansi256ColorRegex,
  applyColorToText = (text, colorSpec, ground) => {
    if (!colorSpec) return text;
    if (colorSpec.startsWith("ansi:")) switch (colorSpec.substring(5)) {
      case "black":
        return ground === "foreground" ? gt.black(text) : gt.bgBlack(text);
      case "red":
        return ground === "foreground" ? gt.red(text) : gt.bgRed(text);
      case "green":
        return ground === "foreground" ? gt.green(text) : gt.bgGreen(text);
      case "yellow":
        return ground === "foreground" ? gt.yellow(text) : gt.bgYellow(text);
      case "blue":
        return ground === "foreground" ? gt.blue(text) : gt.bgBlue(text);
      case "magenta":
        return ground === "foreground" ? gt.magenta(text) : gt.bgMagenta(text);
      case "cyan":
        return ground === "foreground" ? gt.cyan(text) : gt.bgCyan(text);
      case "white":
        return ground === "foreground" ? gt.white(text) : gt.bgWhite(text);
      case "blackBright":
        return ground === "foreground" ? gt.blackBright(text) : gt.bgBlackBright(text);
      case "redBright":
        return ground === "foreground" ? gt.redBright(text) : gt.bgRedBright(text);
      case "greenBright":
        return ground === "foreground" ? gt.greenBright(text) : gt.bgGreenBright(text);
      case "yellowBright":
        return ground === "foreground" ? gt.yellowBright(text) : gt.bgYellowBright(text);
      case "blueBright":
        return ground === "foreground" ? gt.blueBright(text) : gt.bgBlueBright(text);
      case "magentaBright":
        return ground === "foreground" ? gt.magentaBright(text) : gt.bgMagentaBright(text);
      case "cyanBright":
        return ground === "foreground" ? gt.cyanBright(text) : gt.bgCyanBright(text);
      case "whiteBright":
        return ground === "foreground" ? gt.whiteBright(text) : gt.bgWhiteBright(text);
    }
    if (colorSpec.startsWith("#")) return ground === "foreground" ? gt.hex(colorSpec)(text) : gt.bgHex(colorSpec)(text);
    if (colorSpec.startsWith("ansi256")) {
      let match = ansi256ColorRegex.exec(colorSpec);
      if (!match) return text;
      let index = Number(match[1]);
      return ground === "foreground" ? gt.ansi256(index)(text) : gt.bgAnsi256(index)(text);
    }
    if (colorSpec.startsWith("rgb")) {
      let match = rgbColorRegex.exec(colorSpec);
      if (!match) return text;
      let rVal = Number(match[1]),
        gVal = Number(match[2]),
        bVal = Number(match[3]);
      return ground === "foreground" ? gt.rgb(rVal, gVal, bVal)(text) : gt.bgRgb(rVal, gVal, bVal)(text);
    }
    return text;
  };
var Xg = b(() => {
  au();
  noColorArgFlags = new Set(["--no-color", "--no-colors", "--color=false", "--color=never"]), forceColorArgFlags = new Set(["--color", "--colors", "--color=true", "--color=always", "--color=256", "--color=16m", "--color=full", "--color=truecolor"]);
  truecolorTerminals = new Set(["alacritty", "contour", "foot", "ghostty", "rio", "wezterm", "xterm-ghostty", "xterm-kitty"]);
  noColorApplied = applyNoColor(), vscodeColorApplied = applyVscodeColor(), truecolorApplied = applyTruecolorTerminal(), tmuxDowngradeApplied = applyTmuxDowngrade(), maxColorLevel = gt.level;
  rgbAnsiRegex = /^\x1b\[([34]8);2;(\d+);(\d+);(\d+)m$/;
  ansi256ColorStops = [0, 95, 135, 175, 215, 255];
  rgbColorRegex = /^rgb\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/, ansi256ColorRegex = /^ansi256\(\s?(\d+)\s?\)$/;
});

export {hasArgvFlag as Gyi,applyNoColor as ktd,applyVscodeColor as Htd,applyTruecolorTerminal as Dtd,applyTmuxDowngrade as Ptd,setColorLevelFromCaps as Vyi,inverseText as nUe,getColorLevelChangeCount as vTn,setColorLevel as zyi,downgradeRgbToAnsi256 as Yyi,rgbToAnsi256Index as Ltd,applyTextStyle as ZQe,colorizeText as Zfe,noColorArgFlags as vtd,forceColorArgFlags as wtd,hasNoColorFlag as Rtd,hasForceColorFlag as xtd,truecolorTerminals as Itd,noColorApplied as Dth,vscodeColorApplied as Pth,truecolorApplied as Oth,tmuxDowngradeApplied as Lth,maxColorLevel as Wyi,colorLevelChangeCount as Kyi,rgbAnsiRegex as Otd,ansi256ColorStops as eUr,rgbColorRegex as Mtd,ansi256ColorRegex as Ntd,applyColorToText as $ve,Xg as E5};
