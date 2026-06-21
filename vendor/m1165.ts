// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Man,ListCustomModelsCommand} from "./m1127.ts";
import {Sd} from "./m850.ts";
var Pks,paginateListCustomModels;
var Oks=b(()=>{s0();Man();Pks=M(Sd(),1),paginateListCustomModels=Pks.createPaginator(BedrockClient,ListCustomModelsCommand,"nextToken","nextToken","maxResults")});
export {Pks,paginateListCustomModels,Oks};
