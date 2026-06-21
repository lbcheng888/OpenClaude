// @ts-nocheck
import {IKe} from "./m919.ts";
import {b,M} from "../runtime.ts";
import {createDefaultGlobalConfig} from "./m594.ts";
var gAs,aEe=(e,t,n=!1)=>{if(typeof t>"u")throw new gAs.TokenProviderError(`Value not present for '${e}' in SSO Token${n?". Cannot refresh":""}. ${IKe}`,!1)};
var _As=b(()=>{gAs=M(createDefaultGlobalConfig(),1)});
export {gAs,aEe,_As};
