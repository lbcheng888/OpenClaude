// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Cun,ListGuardrailsCommand} from "./m1136.ts";
import {Zu} from "./m855.ts";
var xOs,paginateListGuardrails;
var DOs=b(()=>{C0();Cun();xOs=x(Zu(),1),paginateListGuardrails=xOs.createPaginator(BedrockClient,ListGuardrailsCommand,"nextToken","nextToken","maxResults")});
export {xOs,paginateListGuardrails,DOs};
