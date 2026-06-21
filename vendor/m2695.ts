// @ts-nocheck
import {Dh,NH} from "../src/config/2024_NH.ts";
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {Cs,Ph} from "./m2224.ts";
import {b} from "../runtime.ts";
var gL="TodoWrite";
function Ajr(e){if(Dh(e))return`Content search built on ripgrep. Prefer this over \`grep\`/\`rg\` via ${ns} \u2014 results integrate with the permission UI and file links.

- Full regex syntax (e.g. "log.*Error", "function\\s+\\w+"). Ripgrep, not grep \u2014 escape literal braces (\`interface\\{\\}\`).
- Filter with \`glob\` (e.g. "**/*.tsx") or \`type\` (e.g. "js", "py", "rust").
- \`output_mode\`: "content" (matching lines), "files_with_matches" (paths only, default), or "count".
- \`multiline: true\` for patterns that span lines.`;return`A powerful search tool built on ripgrep

  Usage:
  - ALWAYS use ${$c} for search tasks. NEVER invoke \`grep\` or \`rg\` as a ${ns} command. The ${$c} tool has been optimized for correct permissions and access.
  - Supports full regex syntax (e.g., "log.*Error", "function\\s+\\w+")
  - Filter files with glob parameter (e.g., "*.js", "**/*.tsx") or type parameter (e.g., "js", "py", "rust")
  - Output modes: "content" shows matching lines, "files_with_matches" shows only file paths (default), "count" shows match counts
  - Use ${Cs} tool for open-ended searches requiring multiple rounds
  - Pattern syntax: Uses ripgrep (not grep) - literal braces need escaping (use \`interface\\{\\}\` to find \`interface{}\` in Go code)
  - Multiline matching: By default patterns match within single lines only. For cross-line patterns like \`struct \\{[\\s\\S]*?field\`, use \`multiline: true\`
`}
var $c="Grep";
var Vw=b(()=>{NH();Ph()});
export {gL,Ajr,$c,Vw};
