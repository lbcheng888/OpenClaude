export function stripInternalProtocolLeak(text: string): { text: string; truncated: boolean } {
  const markerIndex = text.search(INTERNAL_PROTOCOL_MARKER_PATTERN);
  if (markerIndex === -1) return { text, truncated: false };
  return { text: text.slice(0, markerIndex), truncated: true };
}

export function sanitizeAssistantText(text: string): string {
  return stripInternalProtocolLeak(text).text;
}

export function stripDanglingInternalProtocolPrefix(text: string): string {
  const markerStart = text.lastIndexOf("<|");
  if (markerStart === -1) return text;
  const candidate = text.slice(markerStart);
  return isInternalProtocolMarkerPrefix(candidate) ? text.slice(0, markerStart) : text;
}

const INTERNAL_PROTOCOL_MARKER_PATTERN = /<\|\s*(?:end_of_sentence|end_of_toolresults|tool)\s*\|>/iu;
const INTERNAL_PROTOCOL_MARKER_NAMES = ["end_of_sentence", "end_of_toolresults", "tool"];

function isInternalProtocolMarkerPrefix(candidate: string): boolean {
  if (!candidate.startsWith("<|")) return false;
  let rest = candidate.slice(2);
  rest = rest.replace(/^\s+/u, "");
  if (!rest) return true;

  const lowerRest = rest.toLowerCase();
  for (const markerName of INTERNAL_PROTOCOL_MARKER_NAMES) {
    if (!/\s/u.test(rest) && markerName.startsWith(lowerRest)) return true;
    if (!lowerRest.startsWith(markerName)) continue;
    const afterName = rest.slice(markerName.length);
    if (/^\s*(?:\|?>?)?$/u.test(afterName)) return true;
  }

  return false;
}
