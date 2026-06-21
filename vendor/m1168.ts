// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {$an,ListImportedModelsCommand} from "./m1132.ts";
import {Sd} from "./m850.ts";
var Fks,paginateListImportedModels;
var Uks=b(()=>{s0();$an();Fks=M(Sd(),1),paginateListImportedModels=Fks.createPaginator(BedrockClient,ListImportedModelsCommand,"nextToken","nextToken","maxResults")});
export {Fks,paginateListImportedModels,Uks};
