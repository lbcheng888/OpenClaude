// @ts-nocheck
import {vs,dm} from "./m2256.ts";
import {Mh,mI} from "../src/config/2029_mI.ts";
import {fa,ry} from "./m2253.ts";
import {b} from "../runtime.ts";
function Rvd(){return`
- If this is an existing file, you MUST use the ${vs} tool first to read the file's contents. This tool will fail if you did not read the file first.`}
function rNi(e){if(Mh(e))return`Writes a file to the local filesystem, overwriting if one exists.

When to use: creating a new file, or fully replacing one you've already ${vs}. Overwriting an existing file you haven't ${vs} will fail. For partial changes, use ${fa} instead.`;return`Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.${Rvd()}
- Prefer the Edit tool for modifying existing files \u2014 it only sends the diff. Only use this tool to create new files or for complete rewrites.
- NEVER create documentation files (*.md) or README files unless explicitly requested by the User.
- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.`}
var Ec="Write";
var dw=b(()=>{mI();ry();dm()});
export {Rvd,rNi,Ec,dw};
