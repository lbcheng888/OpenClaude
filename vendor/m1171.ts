// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Sun,ListEvaluationJobsCommand} from "./m1133.ts";
import {Zu} from "./m855.ts";
var HOs,paginateListEvaluationJobs;
var IOs=b(()=>{C0();Sun();HOs=x(Zu(),1),paginateListEvaluationJobs=HOs.createPaginator(BedrockClient,ListEvaluationJobsCommand,"nextToken","nextToken","maxResults")});
export {HOs,paginateListEvaluationJobs,IOs};
