// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Wan,ListModelCopyJobsCommand} from "./m1135.ts";
import {Sd} from "./m850.ts";
var Gks,paginateListModelCopyJobs;
var Vks=b(()=>{s0();Wan();Gks=M(Sd(),1),paginateListModelCopyJobs=Gks.createPaginator(BedrockClient,ListModelCopyJobsCommand,"nextToken","nextToken","maxResults")});
export {Gks,paginateListModelCopyJobs,Vks};
