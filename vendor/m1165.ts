// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {fun,ListAutomatedReasoningPoliciesCommand} from "./m1127.ts";
import {Zu} from "./m855.ts";
var gOs=()=>{};
var _Os,paginateListAutomatedReasoningPolicies;
var yOs=b(()=>{C0();fun();_Os=x(Zu(),1),paginateListAutomatedReasoningPolicies=_Os.createPaginator(BedrockClient,ListAutomatedReasoningPoliciesCommand,"nextToken","nextToken","maxResults")});
export {gOs,_Os,paginateListAutomatedReasoningPolicies,yOs};
