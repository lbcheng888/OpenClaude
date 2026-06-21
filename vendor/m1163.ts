// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Oan,ListAutomatedReasoningPolicyTestResultsCommand} from "./m1125.ts";
import {Sd} from "./m850.ts";
var kks,paginateListAutomatedReasoningPolicyTestResults;
var Hks=b(()=>{s0();Oan();kks=M(Sd(),1),paginateListAutomatedReasoningPolicyTestResults=kks.createPaginator(BedrockClient,ListAutomatedReasoningPolicyTestResultsCommand,"nextToken","nextToken","maxResults")});
export {kks,paginateListAutomatedReasoningPolicyTestResults,Hks};
