// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var GFp,wJa,RJa,xJa,kJa;
var HJa=b(()=>{Xr();GFp=we(()=>E.object({entries:E.record(E.string(),E.string()),entryChecksums:E.record(E.string(),E.string()).optional(),deletedEntries:E.record(E.string(),E.number()).optional()})),wJa=we(()=>E.object({organizationId:E.string().optional(),repo:E.string(),version:E.number().optional(),lastModified:E.string(),checksum:E.string(),content:GFp()})),RJa=we(()=>E.object({checksum:E.string().optional(),version:E.number().optional(),entryChecksums:E.record(E.string(),E.string()).optional(),deletedEntries:E.record(E.string(),E.number()).optional()})),xJa=we(()=>E.object({error:E.object({details:E.object({error_code:E.literal("team_memory_too_many_entries"),max_entries:E.number().int().positive(),received_entries:E.number().int().positive()})})})),kJa=we(()=>E.object({error:E.object({type:E.string().optional(),message:E.string().optional(),details:E.object({error_code:E.string().optional()}).optional()}).optional()}))});
export {GFp,wJa,RJa,xJa,kJa,HJa};
