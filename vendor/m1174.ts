// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Kan,ListModelInvocationJobsCommand} from "./m1138.ts";
import {Sd} from "./m850.ts";
var Xks,paginateListModelInvocationJobs;
var Qks=b(()=>{s0();Kan();Xks=M(Sd(),1),paginateListModelInvocationJobs=Xks.createPaginator(BedrockClient,ListModelInvocationJobsCommand,"nextToken","nextToken","maxResults")});
export {Xks,paginateListModelInvocationJobs,Qks};
