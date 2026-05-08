type DiffOperation =
  | { type: "equal"; line: string }
  | { type: "add"; line: string }
  | { type: "remove"; line: string };

type AnnotatedDiffOperation = DiffOperation & {
  oldLine: number;
  newLine: number;
};

const DEFAULT_CONTEXT_LINES = 3;
const DEFAULT_MAX_ROWS = 200;

export function createUnifiedDiff(
  filePath: string,
  before: string,
  after: string,
  contextLines = DEFAULT_CONTEXT_LINES,
  maxRows = DEFAULT_MAX_ROWS,
): string {
  if (before === after) return "";

  const beforeLines = splitDiffLines(before);
  const afterLines = splitDiffLines(after);
  const operations = annotateOperations(createShortestEditScript(beforeLines, afterLines));
  const hunks = createHunks(operations, contextLines);
  const rows = [`--- ${filePath}`, `+++ ${filePath}`];

  for (const hunk of hunks) {
    const hunkOperations = operations.slice(hunk.start, hunk.end);
    rows.push(createHunkHeader(hunkOperations));
    for (const operation of hunkOperations) {
      rows.push(formatDiffOperation(operation));
      if (rows.length >= maxRows) {
        rows.push("… diff truncated");
        return rows.join("\n");
      }
    }
  }

  return rows.join("\n");
}

function splitDiffLines(value: string): string[] {
  const lines = value.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function createShortestEditScript(before: string[], after: string[]): DiffOperation[] {
  const beforeLength = before.length;
  const afterLength = after.length;
  const max = beforeLength + afterLength;
  const trace: Array<Map<number, number>> = [];
  let frontier = new Map<number, number>([[1, 0]]);

  for (let depth = 0; depth <= max; depth++) {
    trace.push(new Map(frontier));
    const nextFrontier = new Map(frontier);

    for (let diagonal = -depth; diagonal <= depth; diagonal += 2) {
      const insertion = diagonal === -depth
        || (diagonal !== depth && getFrontier(frontier, diagonal - 1) < getFrontier(frontier, diagonal + 1));
      let x = insertion
        ? getFrontier(frontier, diagonal + 1)
        : getFrontier(frontier, diagonal - 1) + 1;
      let y = x - diagonal;

      while (x < beforeLength && y < afterLength && before[x] === after[y]) {
        x++;
        y++;
      }

      nextFrontier.set(diagonal, x);
      if (x >= beforeLength && y >= afterLength) {
        return backtrackShortestEditScript(trace, before, after, depth);
      }
    }

    frontier = nextFrontier;
  }

  return [];
}

function backtrackShortestEditScript(
  trace: Array<Map<number, number>>,
  before: string[],
  after: string[],
  finalDepth: number,
): DiffOperation[] {
  let x = before.length;
  let y = after.length;
  const operations: DiffOperation[] = [];

  for (let depth = finalDepth; depth >= 0; depth--) {
    const frontier = trace[depth] || new Map<number, number>();
    const diagonal = x - y;
    const previousDiagonal = diagonal === -depth
      || (diagonal !== depth && getFrontier(frontier, diagonal - 1) < getFrontier(frontier, diagonal + 1))
      ? diagonal + 1
      : diagonal - 1;
    const previousX = getFrontier(frontier, previousDiagonal);
    const previousY = previousX - previousDiagonal;

    while (x > previousX && y > previousY) {
      operations.push({ type: "equal", line: before[x - 1] || "" });
      x--;
      y--;
    }

    if (depth === 0) break;

    if (x === previousX) {
      operations.push({ type: "add", line: after[y - 1] || "" });
      y--;
    } else {
      operations.push({ type: "remove", line: before[x - 1] || "" });
      x--;
    }
  }

  return operations.reverse();
}

function getFrontier(frontier: Map<number, number>, diagonal: number): number {
  return frontier.get(diagonal) ?? Number.NEGATIVE_INFINITY;
}

function annotateOperations(operations: DiffOperation[]): AnnotatedDiffOperation[] {
  let oldLine = 1;
  let newLine = 1;
  return operations.map(operation => {
    const annotated = { ...operation, oldLine, newLine };
    if (operation.type !== "add") oldLine++;
    if (operation.type !== "remove") newLine++;
    return annotated;
  });
}

function createHunks(operations: AnnotatedDiffOperation[], contextLines: number): Array<{ start: number; end: number }> {
  const hunks: Array<{ start: number; end: number }> = [];
  let firstChange = -1;
  let lastChange = -1;

  operations.forEach((operation, index) => {
    if (operation.type === "equal") return;
    if (firstChange === -1) firstChange = index;
    lastChange = index;
  });

  if (firstChange === -1) return hunks;

  let start = Math.max(0, firstChange - contextLines);
  let end = Math.min(operations.length, lastChange + contextLines + 1);

  for (let index = firstChange; index <= lastChange; index++) {
    if (operations[index]?.type !== "equal") continue;

    const nextChange = findNextChange(operations, index + 1, lastChange);
    if (nextChange === -1) break;
    if (nextChange - index <= contextLines * 2) {
      index = nextChange;
      continue;
    }

    hunks.push({ start, end: Math.min(operations.length, index + contextLines + 1) });
    start = Math.max(0, nextChange - contextLines);
    index = nextChange;
  }

  hunks.push({ start, end });
  return mergeOverlappingHunks(hunks);
}

function findNextChange(operations: AnnotatedDiffOperation[], start: number, end: number): number {
  for (let index = start; index <= end; index++) {
    if (operations[index]?.type !== "equal") return index;
  }
  return -1;
}

function mergeOverlappingHunks(hunks: Array<{ start: number; end: number }>): Array<{ start: number; end: number }> {
  const merged: Array<{ start: number; end: number }> = [];
  for (const hunk of hunks) {
    const previous = merged[merged.length - 1];
    if (previous && hunk.start <= previous.end) {
      previous.end = Math.max(previous.end, hunk.end);
      continue;
    }
    merged.push({ ...hunk });
  }
  return merged;
}

function createHunkHeader(operations: AnnotatedDiffOperation[]): string {
  const first = operations[0];
  if (!first) return "@@ -0,0 +0,0 @@";
  const oldStart = first.oldLine ?? 0;
  const newStart = first.newLine ?? 0;
  const oldCount = operations.filter(operation => operation.type !== "add").length;
  const newCount = operations.filter(operation => operation.type !== "remove").length;
  return `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`;
}

function formatDiffOperation(operation: DiffOperation): string {
  const content = operation.line ?? "";
  if (operation.type === "add") return `+${content}`;
  if (operation.type === "remove") return `-${content}`;
  return ` ${content}`;
}
