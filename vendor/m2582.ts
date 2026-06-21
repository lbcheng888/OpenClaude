// @ts-nocheck
import {Ws,ef} from "./m2248.ts";
import {Dh,NH} from "../src/config/2024_NH.ts";
import {Ua,ty} from "./m2245.ts";
import {b} from "../runtime.ts";
function ZAd(){return`
- If this is an existing file, you MUST use the ${Ws} tool first to read the file's contents. This tool will fail if you did not read the file first.`}
function v0i(e){if(Dh(e))return`Writes a file to the local filesystem, overwriting if one exists.

When to use: creating a new file, or fully replacing one you've already ${Ws}. Overwriting an existing file you haven't ${Ws} will fail. For partial changes, use ${Ua} instead.`;return`Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.${ZAd()}
- Prefer the Edit tool for modifying existing files \u2014 it only sends the diff. Only use this tool to create new files or for complete rewrites.
- NEVER create documentation files (*.md) or README files unless explicitly requested by the User.
- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.`}
var zc="Write";
var ex=b(()=>{NH();ty();ef()});
export {ZAd,v0i,zc,ex};
