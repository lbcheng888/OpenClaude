// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {gun,ListAutomatedReasoningPolicyTestCasesCommand} from "./m1129.ts";
import {Zu} from "./m855.ts";
var bOs,paginateListAutomatedReasoningPolicyTestCases;
var EOs=b(()=>{C0();gun();bOs=x(Zu(),1),paginateListAutomatedReasoningPolicyTestCases=bOs.createPaginator(BedrockClient,ListAutomatedReasoningPolicyTestCasesCommand,"nextToken","nextToken","maxResults")});
export {bOs,paginateListAutomatedReasoningPolicyTestCases,EOs};
