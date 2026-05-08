import { stringWidth } from "@anthropic/ink";
import { marked, type Token, type Tokens } from "marked";
import { stripAnsiSequences } from "./ansi.js";

const EOL = "\n";
const BLOCKQUOTE_BAR = "\u258e";

let markedConfigured = false;

export function renderMarkdownToAnsi(content: string): string {
  configureMarked();
  return marked
    .lexer(content)
    .map(token => formatToken(token, 0, null, null))
    .join("")
    .trim();
}

function configureMarked(): void {
  if (markedConfigured) return;
  markedConfigured = true;
  marked.use({
    tokenizer: {
      del() {
        return undefined;
      },
    },
  });
}

function formatToken(
  token: Token,
  listDepth: number,
  orderedListNumber: number | null,
  parent: Token | null,
): string {
  switch (token.type) {
    case "blockquote": {
      const inner = (token.tokens ?? []).map(child => formatToken(child, 0, null, null)).join("");
      const bar = dim(BLOCKQUOTE_BAR);
      return inner
        .split(EOL)
        .map(line => stripAnsiSequences(line).trim() ? `${bar} ${italic(line)}` : line)
        .join(EOL);
    }
    case "code":
      return renderCodeBlock(token as Tokens.Code);
    case "codespan":
      return cyan(token.text);
    case "em":
      return italic((token.tokens ?? []).map(child => formatToken(child, listDepth, orderedListNumber, parent)).join(""));
    case "strong":
      return bold((token.tokens ?? []).map(child => formatToken(child, listDepth, orderedListNumber, parent)).join(""));
    case "heading": {
      const text = (token.tokens ?? []).map(child => formatToken(child, 0, null, null)).join("");
      const styled = token.depth === 1 ? underline(italic(bold(text))) : bold(text);
      return styled + EOL + EOL;
    }
    case "hr":
      return "---" + EOL;
    case "image": {
      const imgToken = token as Tokens.Image;
      const alt = imgToken.text || "Image";
      const href = imgToken.href || "";
      return dim(italic(`[${alt}](${href})`));
    }
    case "link": {
      const linkText = (token.tokens ?? []).map(child => formatToken(child, 0, null, token)).join("");
      if (token.href?.startsWith("mailto:")) return token.href.replace(/^mailto:/u, "");
      if (!token.href || token.href === linkText) return linkText || token.href || "";
      return `${linkText || token.href} (${token.href})`;
    }
    case "list":
      return renderList(token as Tokens.List, listDepth);
    case "list_item":
      return renderListItem(token as Tokens.ListItem, listDepth, orderedListNumber);
    case "paragraph":
      return (token.tokens ?? []).map(child => formatToken(child, 0, null, null)).join("") + EOL;
    case "space":
    case "br":
      return EOL;
    case "text":
      if (parent?.type === "list_item") {
        const marker = orderedListNumber === null ? "-" : `${getListNumber(listDepth, orderedListNumber)}.`;
        const text = token.tokens
          ? token.tokens.map(child => formatToken(child, listDepth, orderedListNumber, token)).join("")
          : token.text;
        return `${"  ".repeat(Math.max(0, listDepth - 1))}${marker} ${text}${EOL}`;
      }
      return token.text;
    case "table":
      return renderTable(token as Tokens.Table);
    case "escape":
      return token.text;
    case "del":
      return strikethrough((token.tokens ?? []).map(child => formatToken(child, listDepth, orderedListNumber, parent)).join(""));
    case "html": {
      const htmlText = (token as Tokens.HTML).text || token.text || "";
      // Render inline HTML: <br> → newline, <hr> → rule, strip tags otherwise
      if (/^<br\s*\/?>/iu.test(htmlText)) return EOL;
      if (/^<hr\s*\/?>/iu.test(htmlText)) return "---" + EOL;
      // Strip HTML tags and render text content
      const stripped = htmlText.replace(/<[^>]*>/gu, "").trim();
      return stripped ? stripped + EOL : "";
    }
    case "def":
      return "";
    default:
      return "";
  }
}

function renderCodeBlock(token: Tokens.Code): string {
  const text = token.text.trimEnd();
  const lang = token.lang?.trim().toLowerCase();
  if (lang === "diff" || looksLikeDiff(text)) {
    return text.split(EOL).map(formatDiffLine).join(EOL) + EOL;
  }
  return text + EOL;
}

function looksLikeDiff(text: string): boolean {
  return text.split(EOL).some(line =>
    line.startsWith("@@")
    || (line.startsWith("+") && !line.startsWith("+++"))
    || (line.startsWith("-") && !line.startsWith("---")),
  );
}

function formatDiffLine(line: string): string {
  if (line.startsWith("+") && !line.startsWith("+++")) return green(line);
  if (line.startsWith("-") && !line.startsWith("---")) return red(line);
  if (line.startsWith("@@")) return cyan(line);
  if (line.startsWith("+++") || line.startsWith("---") || line.startsWith(" ")) return dim(line);
  return line;
}

function renderList(token: Tokens.List, listDepth: number): string {
  return token.items
    .map((item, index) => renderListItem(item, listDepth, token.ordered ? token.start + index : null))
    .join("");
}

function renderListItem(
  token: Tokens.ListItem,
  listDepth: number,
  orderedListNumber: number | null,
): string {
  return (token.tokens ?? [])
    .map(child => formatToken(child, listDepth + 1, orderedListNumber, token))
    .join("");
}

function renderTable(token: Tokens.Table): string {
  const getDisplayText = (tokens: Token[] | undefined): string => {
    return stripAnsiSequences(tokens?.map(child => formatToken(child, 0, null, null)).join("") ?? "");
  };
  const getContent = (tokens: Token[] | undefined): string => {
    return tokens?.map(child => formatToken(child, 0, null, null)).join("") ?? "";
  };

  const columnWidths = token.header.map((header, index) => {
    let maxWidth = stringWidth(getDisplayText(header.tokens));
    for (const row of token.rows) {
      maxWidth = Math.max(maxWidth, stringWidth(getDisplayText(row[index]?.tokens)));
    }
    return Math.max(maxWidth, 3);
  });

  const lines: string[] = [];
  lines.push(formatTableRow(token.header, columnWidths, token.align, getContent, getDisplayText));
  lines.push(`|${columnWidths.map(width => "-".repeat(width + 2)).join("|")}|`);
  for (const row of token.rows) {
    lines.push(formatTableRow(row, columnWidths, token.align, getContent, getDisplayText));
  }
  return lines.join(EOL) + EOL + EOL;
}

function formatTableRow(
  cells: Tokens.TableCell[],
  columnWidths: number[],
  align: Tokens.Table["align"],
  getContent: (tokens: Token[] | undefined) => string,
  getDisplayText: (tokens: Token[] | undefined) => string,
): string {
  let output = "| ";
  cells.forEach((cell, index) => {
    const width = columnWidths[index] ?? 3;
    const content = getContent(cell.tokens);
    const displayText = getDisplayText(cell.tokens);
    output += padAligned(content, stringWidth(displayText), width, align?.[index]) + " | ";
  });
  return output.trimEnd();
}

function padAligned(
  content: string,
  displayWidth: number,
  targetWidth: number,
  align: "left" | "center" | "right" | null | undefined,
): string {
  const padding = Math.max(0, targetWidth - displayWidth);
  if (align === "center") {
    const leftPad = Math.floor(padding / 2);
    return " ".repeat(leftPad) + content + " ".repeat(padding - leftPad);
  }
  if (align === "right") return " ".repeat(padding) + content;
  return content + " ".repeat(padding);
}

function getListNumber(listDepth: number, orderedListNumber: number): string {
  switch (listDepth) {
    case 0:
    case 1:
      return orderedListNumber.toString();
    case 2:
      return numberToLetter(orderedListNumber);
    case 3:
      return numberToRoman(orderedListNumber);
    default:
      return orderedListNumber.toString();
  }
}

function numberToLetter(n: number): string {
  let result = "";
  while (n > 0) {
    n--;
    result = String.fromCharCode(97 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
}

const ROMAN_VALUES: ReadonlyArray<[number, string]> = [
  [1000, "m"],
  [900, "cm"],
  [500, "d"],
  [400, "cd"],
  [100, "c"],
  [90, "xc"],
  [50, "l"],
  [40, "xl"],
  [10, "x"],
  [9, "ix"],
  [5, "v"],
  [4, "iv"],
  [1, "i"],
];

function numberToRoman(n: number): string {
  let result = "";
  for (const [value, numeral] of ROMAN_VALUES) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }
  return result;
}

function sgr(code: number, text: string, closeCode: number): string {
  return `\u001b[${code}m${text}\u001b[${closeCode}m`;
}

function bold(text: string): string {
  return sgr(1, text, 22);
}

function dim(text: string): string {
  return sgr(2, text, 22);
}

function italic(text: string): string {
  return sgr(3, text, 23);
}

function underline(text: string): string {
  return sgr(4, text, 24);
}

function strikethrough(text: string): string {
  return sgr(9, text, 29);
}

function red(text: string): string {
  return sgr(31, text, 39);
}

function green(text: string): string {
  return sgr(32, text, 39);
}

function cyan(text: string): string {
  return sgr(36, text, 39);
}
