// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {wun,ListModelCopyJobsCommand} from "./m1140.ts";
import {Zu} from "./m855.ts";
var BOs,paginateListModelCopyJobs;
var UOs=b(()=>{C0();wun();BOs=x(Zu(),1),paginateListModelCopyJobs=BOs.createPaginator(BedrockClient,ListModelCopyJobsCommand,"nextToken","nextToken","maxResults")});
export {BOs,paginateListModelCopyJobs,UOs};
