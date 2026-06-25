// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Hun,ListModelImportJobsCommand} from "./m1142.ts";
import {Zu} from "./m855.ts";
var WOs,paginateListModelImportJobs;
var GOs=b(()=>{C0();Hun();WOs=x(Zu(),1),paginateListModelImportJobs=WOs.createPaginator(BedrockClient,ListModelImportJobsCommand,"nextToken","nextToken","maxResults")});
export {WOs,paginateListModelImportJobs,GOs};
