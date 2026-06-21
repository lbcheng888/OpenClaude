// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Gan,ListModelCustomizationJobsCommand} from "./m1136.ts";
import {Sd} from "./m850.ts";
var Kks,paginateListModelCustomizationJobs;
var zks=b(()=>{s0();Gan();Kks=M(Sd(),1),paginateListModelCustomizationJobs=Kks.createPaginator(BedrockClient,ListModelCustomizationJobsCommand,"nextToken","nextToken","maxResults")});
export {Kks,paginateListModelCustomizationJobs,zks};
