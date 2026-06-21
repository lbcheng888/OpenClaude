// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Van,ListModelImportJobsCommand} from "./m1137.ts";
import {Sd} from "./m850.ts";
var Yks,paginateListModelImportJobs;
var Jks=b(()=>{s0();Van();Yks=M(Sd(),1),paginateListModelImportJobs=Yks.createPaginator(BedrockClient,ListModelImportJobsCommand,"nextToken","nextToken","maxResults")});
export {Yks,paginateListModelImportJobs,Jks};
