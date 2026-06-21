// @ts-nocheck
import {b,M} from "../runtime.ts";
import {xln,BedrockRuntimeClient} from "./m1259.ts";
import {zln,ListAsyncInvokesCommand} from "./m1271.ts";
import {Sd} from "./m850.ts";
var iOs=()=>{};
var aOs,paginateListAsyncInvokes;
var lOs=b(()=>{xln();zln();aOs=M(Sd(),1),paginateListAsyncInvokes=aOs.createPaginator(BedrockRuntimeClient,ListAsyncInvokesCommand,"nextToken","nextToken","maxResults")});
export {iOs,aOs,paginateListAsyncInvokes,lOs};
