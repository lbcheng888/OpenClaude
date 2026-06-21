// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Pan,ListAutomatedReasoningPolicyTestCasesCommand} from "./m1124.ts";
import {Sd} from "./m850.ts";
var Rks,paginateListAutomatedReasoningPolicyTestCases;
var xks=b(()=>{s0();Pan();Rks=M(Sd(),1),paginateListAutomatedReasoningPolicyTestCases=Rks.createPaginator(BedrockClient,ListAutomatedReasoningPolicyTestCasesCommand,"nextToken","nextToken","maxResults")});
export {Rks,paginateListAutomatedReasoningPolicyTestCases,xks};
