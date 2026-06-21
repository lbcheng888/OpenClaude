// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Nan,ListEvaluationJobsCommand} from "./m1128.ts";
import {Sd} from "./m850.ts";
var Lks,paginateListEvaluationJobs;
var Mks=b(()=>{s0();Nan();Lks=M(Sd(),1),paginateListEvaluationJobs=Lks.createPaginator(BedrockClient,ListEvaluationJobsCommand,"nextToken","nextToken","maxResults")});
export {Lks,paginateListEvaluationJobs,Mks};
