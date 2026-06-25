// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Run,ListInferenceProfilesCommand} from "./m1138.ts";
import {Zu} from "./m855.ts";
var LOs,paginateListInferenceProfiles;
var MOs=b(()=>{C0();Run();LOs=x(Zu(),1),paginateListInferenceProfiles=LOs.createPaginator(BedrockClient,ListInferenceProfilesCommand,"nextToken","nextToken","maxResults")});
export {LOs,paginateListInferenceProfiles,MOs};
