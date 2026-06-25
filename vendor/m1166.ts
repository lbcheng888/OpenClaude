// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {hun,ListAutomatedReasoningPolicyBuildWorkflowsCommand} from "./m1128.ts";
import {Zu} from "./m855.ts";
var TOs,paginateListAutomatedReasoningPolicyBuildWorkflows;
var SOs=b(()=>{C0();hun();TOs=x(Zu(),1),paginateListAutomatedReasoningPolicyBuildWorkflows=TOs.createPaginator(BedrockClient,ListAutomatedReasoningPolicyBuildWorkflowsCommand,"nextToken","nextToken","maxResults")});
export {TOs,paginateListAutomatedReasoningPolicyBuildWorkflows,SOs};
