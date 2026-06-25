// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Dun,ListProvisionedModelThroughputsCommand} from "./m1145.ts";
import {Zu} from "./m855.ts";
var YOs,paginateListProvisionedModelThroughputs;
var JOs=b(()=>{C0();Dun();YOs=x(Zu(),1),paginateListProvisionedModelThroughputs=YOs.createPaginator(BedrockClient,ListProvisionedModelThroughputsCommand,"nextToken","nextToken","maxResults")});
export {YOs,paginateListProvisionedModelThroughputs,JOs};
