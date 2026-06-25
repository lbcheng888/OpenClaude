// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {yun,ListCustomModelDeploymentsCommand} from "./m1131.ts";
import {Zu} from "./m855.ts";
var ROs,paginateListCustomModelDeployments;
var vOs=b(()=>{C0();yun();ROs=x(Zu(),1),paginateListCustomModelDeployments=ROs.createPaginator(BedrockClient,ListCustomModelDeploymentsCommand,"nextToken","nextToken","maxResults")});
export {ROs,paginateListCustomModelDeployments,vOs};
