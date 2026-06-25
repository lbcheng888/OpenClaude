// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {_un,ListAutomatedReasoningPolicyTestResultsCommand} from "./m1130.ts";
import {Zu} from "./m855.ts";
var COs,paginateListAutomatedReasoningPolicyTestResults;
var AOs=b(()=>{C0();_un();COs=x(Zu(),1),paginateListAutomatedReasoningPolicyTestResults=COs.createPaginator(BedrockClient,ListAutomatedReasoningPolicyTestResultsCommand,"nextToken","nextToken","maxResults")});
export {COs,paginateListAutomatedReasoningPolicyTestResults,AOs};
