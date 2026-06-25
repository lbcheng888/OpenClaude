// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Iun,ListModelInvocationJobsCommand} from "./m1143.ts";
import {Zu} from "./m855.ts";
var VOs,paginateListModelInvocationJobs;
var KOs=b(()=>{C0();Iun();VOs=x(Zu(),1),paginateListModelInvocationJobs=VOs.createPaginator(BedrockClient,ListModelInvocationJobsCommand,"nextToken","nextToken","maxResults")});
export {VOs,paginateListModelInvocationJobs,KOs};
