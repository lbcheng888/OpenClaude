// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {xun,ListPromptRoutersCommand} from "./m1144.ts";
import {Zu} from "./m855.ts";
var zOs,paginateListPromptRouters;
var jOs=b(()=>{C0();xun();zOs=x(Zu(),1),paginateListPromptRouters=zOs.createPaginator(BedrockClient,ListPromptRoutersCommand,"nextToken","nextToken","maxResults")});
export {zOs,paginateListPromptRouters,jOs};
