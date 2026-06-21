// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {SSOClient} from "./m963.ts";
import {GetRoleCredentialsCommand} from "./m967.ts";
import {B_s} from "./m976.ts";
var F_s={};
isFullscreenWithTTY(F_s,{SSOClient:()=>SSOClient,GetRoleCredentialsCommand:()=>GetRoleCredentialsCommand});
var U_s=b(()=>{B_s()});
export {F_s,U_s};
