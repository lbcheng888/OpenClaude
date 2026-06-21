// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {qan,ListInferenceProfilesCommand} from "./m1133.ts";
import {Sd} from "./m850.ts";
var $ks,paginateListInferenceProfiles;
var qks=b(()=>{s0();qan();$ks=M(Sd(),1),paginateListInferenceProfiles=$ks.createPaginator(BedrockClient,ListInferenceProfilesCommand,"nextToken","nextToken","maxResults")});
export {$ks,paginateListInferenceProfiles,qks};
