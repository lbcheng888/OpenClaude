import { stringWidth } from "@anthropic/ink";

export type AnsiTextStyle = {
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  dimColor?: boolean;
  underline?: boolean;
  inverse?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  href?: string;
};

export type AnsiTextSegment = AnsiTextStyle & {
  text: string;
};

export type AnsiTextLine = AnsiTextSegment[];

const ANSI_SEQUENCE_PATTERN = /\u001b\]([^\u0007\u001b]*)(?:\u0007|\u001b\\)|\u001b\[([0-?]*)([ -/]*)([@-~])|\u001b[ -/0-~]/gu;
const SGR_COLOR_NAMES = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"] as const;

export function hasAnsiSequences(value: string): boolean {
  ANSI_SEQUENCE_PATTERN.lastIndex = 0;
  return ANSI_SEQUENCE_PATTERN.test(value);
}

export function stripAnsiSequences(value: string): string {
  return value.replace(ANSI_SEQUENCE_PATTERN, "");
}

export function parseAnsiSegments(value: string): AnsiTextSegment[] {
  const segments: AnsiTextSegment[] = [];
  const style: AnsiTextStyle = {};
  let cursor = 0;

  ANSI_SEQUENCE_PATTERN.lastIndex = 0;
  for (const match of value.matchAll(ANSI_SEQUENCE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      pushSegment(segments, value.slice(cursor, index), style);
    }
    cursor = index + match[0].length;
    if (match[4] === "m") {
      applySgrParameters(style, parseSgrParameters(match[2] || ""));
      continue;
    }
    if (match[1] !== undefined) {
      applyOscSequence(style, match[1]);
    }
  }

  if (cursor < value.length) {
    pushSegment(segments, value.slice(cursor), style);
  }
  return segments;
}

export function createAnsiTextLines(
  value: string,
  terminalWidth: number,
  expanded: boolean,
  maxLinesToShow = 3,
): { lines: AnsiTextLine[]; remainingLines: number } {
  const trimmed = value.trimEnd();
  if (!trimmed) return { lines: [], remainingLines: 0 };

  const wrapWidth = Math.max(terminalWidth - 10, 10);
  const wrapped = wrapAnsiSegments(parseAnsiSegments(trimmed), wrapWidth);
  if (expanded) return { lines: wrapped, remainingLines: 0 };

  const remainingLines = wrapped.length - maxLinesToShow;
  if (remainingLines <= 0) return { lines: wrapped, remainingLines: 0 };
  if (remainingLines === 1) return { lines: wrapped.slice(0, maxLinesToShow + 1), remainingLines: 0 };

  return {
    lines: [
      ...wrapped.slice(0, maxLinesToShow),
      [{ text: `... +${remainingLines} lines (ctrl+o to expand)`, dimColor: true }],
    ],
    remainingLines,
  };
}

export function wrapAnsiSegments(segments: AnsiTextSegment[], wrapWidth: number): AnsiTextLine[] {
  const lines: AnsiTextLine[] = [];
  let line: AnsiTextLine = [];
  let lineWidth = 0;

  const flushLine = (): void => {
    trimLineEnd(line);
    lines.push(line);
    line = [];
    lineWidth = 0;
  };

  for (const segment of segments) {
    for (const char of segment.text) {
      if (char === "\n") {
        flushLine();
        continue;
      }

      const charWidth = stringWidth(char);
      if (lineWidth > 0 && lineWidth + charWidth > wrapWidth) {
        flushLine();
      }
      appendStyledChar(line, segment, char);
      lineWidth += charWidth;
    }
  }

  if (line.length > 0 || lines.length === 0) {
    flushLine();
  }
  return lines;
}

function parseSgrParameters(raw: string): number[] {
  if (!raw) return [0];
  const params: number[] = [];
  for (const group of raw.split(";")) {
    if (group.includes(":")) {
      params.push(...parseColonSgrParameter(group));
      continue;
    }
    if (group === "") {
      params.push(0);
      continue;
    }
    const parsed = Number.parseInt(group, 10);
    params.push(Number.isFinite(parsed) ? parsed : 0);
  }
  return params.length > 0 ? params : [0];
}

function parseColonSgrParameter(raw: string): number[] {
  const parts = raw.split(":").filter(part => part !== "");
  const parsed = parts.map(part => Number.parseInt(part, 10)).filter(Number.isFinite);
  const colorPrefix = parsed[0];
  const colorMode = parsed[1];
  if ((colorPrefix === 38 || colorPrefix === 48) && colorMode === 2 && parsed.length >= 5) {
    return [colorPrefix, colorMode, ...parsed.slice(-3)];
  }
  if ((colorPrefix === 38 || colorPrefix === 48) && colorMode === 5 && parsed.length >= 3) {
    return [colorPrefix, colorMode, parsed[2]!];
  }
  return parsed.length > 0 ? parsed : [0];
}

function applySgrParameters(style: AnsiTextStyle, params: number[]): void {
  for (let index = 0; index < params.length; index++) {
    const code = params[index] ?? 0;
    if (code === 0) {
      clearStyle(style);
      continue;
    }
    if (code === 1) {
      style.bold = true;
      style.dimColor = undefined;
      continue;
    }
    if (code === 2) {
      style.dimColor = true;
      style.bold = undefined;
      continue;
    }
    if (code === 22) {
      style.bold = undefined;
      style.dimColor = undefined;
      continue;
    }
    if (code === 4) {
      style.underline = true;
      continue;
    }
    if (code === 24) {
      style.underline = undefined;
      continue;
    }
    if (code === 3) {
      style.italic = true;
      continue;
    }
    if (code === 23) {
      style.italic = undefined;
      continue;
    }
    if (code === 7) {
      style.inverse = true;
      continue;
    }
    if (code === 27) {
      style.inverse = undefined;
      continue;
    }
    if (code === 9) {
      style.strikethrough = true;
      continue;
    }
    if (code === 29) {
      style.strikethrough = undefined;
      continue;
    }
    if (code === 5) {
      // blink - treat as bold since blinking is distracting in TUI
      style.bold = true;
      continue;
    }
    if (code === 25) {
      style.bold = undefined;
      style.dimColor = undefined;
      continue;
    }
    if (code === 39) {
      style.color = undefined;
      continue;
    }
    if (code === 49) {
      style.backgroundColor = undefined;
      continue;
    }
    if (code >= 30 && code <= 37) {
      style.color = ansiColor(code - 30, false);
      continue;
    }
    if (code >= 90 && code <= 97) {
      style.color = ansiColor(code - 90, true);
      continue;
    }
    if (code >= 40 && code <= 47) {
      style.backgroundColor = ansiColor(code - 40, false);
      continue;
    }
    if (code >= 100 && code <= 107) {
      style.backgroundColor = ansiColor(code - 100, true);
      continue;
    }
    if (code === 38 || code === 48) {
      index = applyExtendedColor(style, params, index, code === 48);
    }
  }
}

function applyExtendedColor(style: AnsiTextStyle, params: number[], index: number, background: boolean): number {
  const mode = params[index + 1];
  if (mode === 5) {
    const value = params[index + 2];
    if (value !== undefined && value >= 0 && value <= 255) {
      setColor(style, `ansi256(${value})`, background);
    } else {
      setColor(style, undefined, background);
    }
    return index + 2;
  }
  if (mode === 2) {
    const red = params[index + 2];
    const green = params[index + 3];
    const blue = params[index + 4];
    if (isRgbChannel(red) && isRgbChannel(green) && isRgbChannel(blue)) {
      setColor(style, `rgb(${red},${green},${blue})`, background);
    } else {
      setColor(style, undefined, background);
    }
    return index + 4;
  }
  setColor(style, undefined, background);
  return index + 1;
}

function ansiColor(index: number, bright: boolean): string {
  const name = SGR_COLOR_NAMES[index] || "white";
  return `ansi:${name}${bright ? "Bright" : ""}`;
}

function isRgbChannel(value: number | undefined): value is number {
  return value !== undefined && value >= 0 && value <= 255;
}

function setColor(style: AnsiTextStyle, color: string | undefined, background: boolean): void {
  if (background) style.backgroundColor = color;
  else style.color = color;
}

function applyOscSequence(style: AnsiTextStyle, payload: string): void {
  const parts = payload.split(";");
  if (parts[0] !== "8") return;
  const href = parts.slice(2).join(";");
  style.href = href || undefined;
}

function pushSegment(segments: AnsiTextSegment[], text: string, style: AnsiTextStyle): void {
  if (!text) return;
  const segment = { text, ...style };
  const previous = segments[segments.length - 1];
  if (previous && sameStyle(previous, segment)) {
    previous.text += text;
    return;
  }
  segments.push(segment);
}

function appendStyledChar(line: AnsiTextLine, segment: AnsiTextSegment, char: string): void {
  const previous = line[line.length - 1];
  if (previous && sameStyle(previous, segment)) {
    previous.text += char;
    return;
  }
  line.push({ ...segment, text: char });
}

function trimLineEnd(line: AnsiTextLine): void {
  while (line.length > 0) {
    const last = line[line.length - 1];
    if (!last) return;
    const trimmed = last.text.replace(/\s+$/u, "");
    if (trimmed) {
      last.text = trimmed;
      return;
    }
    line.pop();
  }
}

function sameStyle(a: AnsiTextStyle, b: AnsiTextStyle): boolean {
  return a.color === b.color
    && a.backgroundColor === b.backgroundColor
    && a.bold === b.bold
    && a.dimColor === b.dimColor
    && a.underline === b.underline
    && a.inverse === b.inverse
    && a.italic === b.italic
    && a.strikethrough === b.strikethrough
    && a.href === b.href;
}

function clearStyle(style: AnsiTextStyle): void {
  style.color = undefined;
  style.backgroundColor = undefined;
  style.bold = undefined;
  style.dimColor = undefined;
  style.underline = undefined;
  style.inverse = undefined;
  style.italic = undefined;
  style.strikethrough = undefined;
  style.inverse = undefined;
}
