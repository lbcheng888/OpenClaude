// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Ian,ListAutomatedReasoningPoliciesCommand} from "./m1122.ts";
import {Sd} from "./m850.ts";
var bks=()=>{};
var Eks,paginateListAutomatedReasoningPolicies;
var Cks=b(()=>{s0();Ian();Eks=M(Sd(),1),paginateListAutomatedReasoningPolicies=Eks.createPaginator(BedrockClient,ListAutomatedReasoningPoliciesCommand,"nextToken","nextToken","maxResults")});
export {bks,Eks,paginateListAutomatedReasoningPolicies,Cks};
