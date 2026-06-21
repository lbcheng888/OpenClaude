// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Uan,ListGuardrailsCommand} from "./m1131.ts";
import {Sd} from "./m850.ts";
var Nks,paginateListGuardrails;
var Bks=b(()=>{s0();Uan();Nks=M(Sd(),1),paginateListGuardrails=Nks.createPaginator(BedrockClient,ListGuardrailsCommand,"nextToken","nextToken","maxResults")});
export {Nks,paginateListGuardrails,Bks};
