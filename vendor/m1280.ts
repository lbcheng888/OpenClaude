// @ts-nocheck
import {b,x} from "../runtime.ts";
import {pdn,BedrockRuntimeClient} from "./m1264.ts";
import {Ddn,ListAsyncInvokesCommand} from "./m1276.ts";
import {Zu} from "./m855.ts";
var eBs=()=>{};
var tBs,paginateListAsyncInvokes;
var nBs=b(()=>{pdn();Ddn();tBs=x(Zu(),1),paginateListAsyncInvokes=tBs.createPaginator(BedrockRuntimeClient,ListAsyncInvokesCommand,"nextToken","nextToken","maxResults")});
export {eBs,tBs,paginateListAsyncInvokes,nBs};
