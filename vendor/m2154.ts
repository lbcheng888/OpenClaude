// @ts-nocheck
import {X} from "../runtime.ts";
import {Qpi} from "./m2150.ts";
import {nmi} from "./m2151.ts";
import {omi} from "./m2152.ts";
import {imi} from "./m2153.ts";
var ami=X((qse)=>{Object.defineProperty(qse,"__esModule",{value:!0});qse.serviceInstanceIdDetector=qse.processDetector=qse.osDetector=qse.hostDetector=void 0;var FYu=Qpi();Object.defineProperty(qse,"hostDetector",{enumerable:!0,get:function(){return FYu.hostDetector}});var UYu=nmi();Object.defineProperty(qse,"osDetector",{enumerable:!0,get:function(){return UYu.osDetector}});var $Yu=omi();Object.defineProperty(qse,"processDetector",{enumerable:!0,get:function(){return $Yu.processDetector}});var qYu=imi();Object.defineProperty(qse,"serviceInstanceIdDetector",{enumerable:!0,get:function(){return qYu.serviceInstanceIdDetector}})});
export {ami};
