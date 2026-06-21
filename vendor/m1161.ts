// @ts-nocheck
import {b,M} from "../runtime.ts";
import {s0,BedrockClient} from "./m1060.ts";
import {Dan,ListAutomatedReasoningPolicyBuildWorkflowsCommand} from "./m1123.ts";
import {Sd} from "./m850.ts";
var vks,paginateListAutomatedReasoningPolicyBuildWorkflows;
var wks=b(()=>{s0();Dan();vks=M(Sd(),1),paginateListAutomatedReasoningPolicyBuildWorkflows=vks.createPaginator(BedrockClient,ListAutomatedReasoningPolicyBuildWorkflowsCommand,"nextToken","nextToken","maxResults")});
export {vks,paginateListAutomatedReasoningPolicyBuildWorkflows,wks};
