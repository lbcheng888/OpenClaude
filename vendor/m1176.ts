// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Yan,ListProvisionedModelThroughputsCommand} from "./m1140.ts";
import {Sd} from "./m850.ts";
var tHs,paginateListProvisionedModelThroughputs;
var nHs=b(()=>{s0();Yan();tHs=M(Sd(),1),paginateListProvisionedModelThroughputs=tHs.createPaginator(BedrockClient,ListProvisionedModelThroughputsCommand,"nextToken","nextToken","maxResults")});
export {tHs,paginateListProvisionedModelThroughputs,nHs};
