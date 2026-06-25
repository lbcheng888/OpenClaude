// @ts-nocheck
import {b} from "../runtime.ts";
var I2s=(e)=>Object.assign(e,{useDualstackEndpoint:e.useDualstackEndpoint??!1,useFipsEndpoint:e.useFipsEndpoint??!1,useGlobalEndpoint:e.useGlobalEndpoint??!1,defaultSigningName:"sts"}),getTeamByName;
var V5=b(()=>{getTeamByName={UseGlobalEndpoint:{type:"builtInParams",name:"useGlobalEndpoint"},UseFIPS:{type:"builtInParams",name:"useFipsEndpoint"},Endpoint:{type:"builtInParams",name:"endpoint"},Region:{type:"builtInParams",name:"region"},UseDualStack:{type:"builtInParams",name:"useDualstackEndpoint"}}});
export {I2s,getTeamByName,V5};
