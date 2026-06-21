// @ts-nocheck
import {b} from "../runtime.ts";
var Z0s=(e)=>Object.assign(e,{useDualstackEndpoint:e.useDualstackEndpoint??!1,useFipsEndpoint:e.useFipsEndpoint??!1,defaultSigningName:"bedrock"}),a0;
var initToolFactoryModule=b(()=>{a0={UseFIPS:{type:"builtInParams",name:"useFipsEndpoint"},Endpoint:{type:"builtInParams",name:"endpoint"},Region:{type:"builtInParams",name:"region"},UseDualStack:{type:"builtInParams",name:"useDualstackEndpoint"}}});
export {Z0s,a0,initToolFactoryModule};
