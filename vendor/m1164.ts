// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Lan,ListCustomModelDeploymentsCommand} from "./m1126.ts";
import {Sd} from "./m850.ts";
var Iks,paginateListCustomModelDeployments;
var Dks=b(()=>{s0();Lan();Iks=M(Sd(),1),paginateListCustomModelDeployments=Iks.createPaginator(BedrockClient,ListCustomModelDeploymentsCommand,"nextToken","nextToken","maxResults")});
export {Iks,paginateListCustomModelDeployments,Dks};
