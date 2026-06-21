// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {zan,ListPromptRoutersCommand} from "./m1139.ts";
import {Sd} from "./m850.ts";
var Zks,paginateListPromptRouters;
var eHs=b(()=>{s0();zan();Zks=M(Sd(),1),paginateListPromptRouters=Zks.createPaginator(BedrockClient,ListPromptRoutersCommand,"nextToken","nextToken","maxResults")});
export {Zks,paginateListPromptRouters,eHs};
