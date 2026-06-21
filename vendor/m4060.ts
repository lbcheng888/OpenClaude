// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {bke,rI} from "./m3279.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var o$n,Blo,Flo,Ulo;
var q$t=b(()=>{Xr();bke();o$n=we(()=>E.strictObject({file_path:E.string().describe("The absolute path to the file to modify"),old_string:E.string().describe("The text to replace"),new_string:E.string().describe("The text to replace it with (must be different from old_string)"),replace_all:rI(E.boolean().default(!1).optional()).describe("Replace all occurrences of old_string (default false)")})),Blo=we(()=>E.object({oldStart:E.number(),oldLines:E.number(),newStart:E.number(),newLines:E.number(),lines:E.array(E.string())})),Flo=we(()=>E.object({filename:E.string(),status:E.enum(["modified","added"]),additions:E.number(),deletions:E.number(),changes:E.number(),patch:E.string(),repository:E.string().nullable().optional().describe("GitHub owner/repo when available")})),Ulo=we(()=>E.object({filePath:E.string().describe("The file path that was edited"),oldString:E.string().describe("The original string that was replaced"),newString:E.string().describe("The new string that replaced it"),originalFile:E.string().nullable().describe("The original file contents before editing"),structuredPatch:E.array(Blo()).describe("Diff patch showing the changes"),userModified:E.boolean().describe("Whether the user modified the proposed changes"),replaceAll:E.boolean().describe("Whether all occurrences were replaced"),gitDiff:Flo().optional()}))});
export {o$n,Blo,Flo,Ulo,q$t};
