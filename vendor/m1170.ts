// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Tun,ListCustomModelsCommand} from "./m1132.ts";
import {Zu} from "./m855.ts";
var wOs,paginateListCustomModels;
var kOs=b(()=>{C0();Tun();wOs=x(Zu(),1),paginateListCustomModels=wOs.createPaginator(BedrockClient,ListCustomModelsCommand,"nextToken","nextToken","maxResults")});
export {wOs,paginateListCustomModels,kOs};
