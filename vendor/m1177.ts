// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {kun,ListModelCustomizationJobsCommand} from "./m1141.ts";
import {Zu} from "./m855.ts";
var $Os,paginateListModelCustomizationJobs;
var qOs=b(()=>{C0();kun();$Os=x(Zu(),1),paginateListModelCustomizationJobs=$Os.createPaginator(BedrockClient,ListModelCustomizationJobsCommand,"nextToken","nextToken","maxResults")});
export {$Os,paginateListModelCustomizationJobs,qOs};
