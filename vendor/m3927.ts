// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {lIe,xI} from "./m3295.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var Y$n,Kuo,zuo,juo;
var n3t=b(()=>{Qr();lIe();Y$n=ve(()=>C.strictObject({file_path:C.string().describe("The absolute path to the file to modify"),old_string:C.string().describe("The text to replace"),new_string:C.string().describe("The text to replace it with (must be different from old_string)"),replace_all:xI(C.boolean().default(!1).optional()).describe("Replace all occurrences of old_string (default false)")})),Kuo=ve(()=>C.object({oldStart:C.number(),oldLines:C.number(),newStart:C.number(),newLines:C.number(),lines:C.array(C.string())})),zuo=ve(()=>C.object({filename:C.string(),status:C.enum(["modified","added"]),additions:C.number(),deletions:C.number(),changes:C.number(),patch:C.string(),repository:C.string().nullable().optional().describe("GitHub owner/repo when available")})),juo=ve(()=>C.object({filePath:C.string().describe("The file path that was edited"),oldString:C.string().describe("The original string that was replaced"),newString:C.string().describe("The new string that replaced it"),originalFile:C.string().nullable().describe("The original file contents before editing"),structuredPatch:C.array(Kuo()).describe("Diff patch showing the changes"),userModified:C.boolean().describe("Whether the user modified the proposed changes"),replaceAll:C.boolean().describe("Whether all occurrences were replaced"),gitDiff:zuo().optional()}))});
export {Y$n,Kuo,zuo,juo,n3t};
