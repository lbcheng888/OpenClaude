// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var v5p,trl,nrl,rrl,orl;
var srl=b(()=>{Qr();v5p=ve(()=>C.object({entries:C.record(C.string(),C.string()),entryChecksums:C.record(C.string(),C.string()).optional(),deletedEntries:C.record(C.string(),C.number()).optional()})),trl=ve(()=>C.object({organizationId:C.string().optional(),repo:C.string(),version:C.number().optional(),lastModified:C.string(),checksum:C.string(),content:v5p()})),nrl=ve(()=>C.object({checksum:C.string().optional(),version:C.number().optional(),entryChecksums:C.record(C.string(),C.string()).optional(),deletedEntries:C.record(C.string(),C.number()).optional()})),rrl=ve(()=>C.object({error:C.object({details:C.object({error_code:C.literal("team_memory_too_many_entries"),max_entries:C.number().int().positive(),received_entries:C.number().int().positive()})})})),orl=ve(()=>C.object({error:C.object({type:C.string().optional(),message:C.string().optional(),details:C.object({error_code:C.string().optional()}).optional()}).optional()}))});
export {v5p,trl,nrl,rrl,orl,srl};
