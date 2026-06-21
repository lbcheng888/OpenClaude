// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {jan,ListMarketplaceModelEndpointsCommand} from "./m1134.ts";
import {Sd} from "./m850.ts";
var jks,paginateListMarketplaceModelEndpoints;
var Wks=b(()=>{s0();jan();jks=M(Sd(),1),paginateListMarketplaceModelEndpoints=jks.createPaginator(BedrockClient,ListMarketplaceModelEndpointsCommand,"nextToken","nextToken","maxResults")});
export {jks,paginateListMarketplaceModelEndpoints,Wks};
