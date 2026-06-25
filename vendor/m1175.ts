// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {vun,ListMarketplaceModelEndpointsCommand} from "./m1139.ts";
import {Zu} from "./m855.ts";
var NOs,paginateListMarketplaceModelEndpoints;
var FOs=b(()=>{C0();vun();NOs=x(Zu(),1),paginateListMarketplaceModelEndpoints=NOs.createPaginator(BedrockClient,ListMarketplaceModelEndpointsCommand,"nextToken","nextToken","maxResults")});
export {NOs,paginateListMarketplaceModelEndpoints,FOs};
