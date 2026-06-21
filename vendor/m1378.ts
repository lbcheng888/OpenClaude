// @ts-nocheck
import {b} from "../runtime.ts";
var EFs=(e)=>Object.assign(e,{useDualstackEndpoint:e.useDualstackEndpoint??!1,useFipsEndpoint:e.useFipsEndpoint??!1,defaultSigningName:"cognito-identity"}),Kp;
var shouldUsePowerShellTool=b(()=>{Kp={UseFIPS:{type:"builtInParams",name:"useFipsEndpoint"},Endpoint:{type:"builtInParams",name:"endpoint"},Region:{type:"builtInParams",name:"region"},UseDualStack:{type:"builtInParams",name:"useDualstackEndpoint"}}});
export {EFs,Kp,shouldUsePowerShellTool};
