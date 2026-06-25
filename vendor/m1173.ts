// @ts-nocheck
import {b,x} from "../runtime.ts";
import {C0,BedrockClient} from "./m1065.ts";
import {Aun,ListImportedModelsCommand} from "./m1137.ts";
import {Zu} from "./m855.ts";
var POs,paginateListImportedModels;
var OOs=b(()=>{C0();Aun();POs=x(Zu(),1),paginateListImportedModels=POs.createPaginator(BedrockClient,ListImportedModelsCommand,"nextToken","nextToken","maxResults")});
export {POs,paginateListImportedModels,OOs};
