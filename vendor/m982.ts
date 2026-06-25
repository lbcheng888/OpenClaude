// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {SSOClient} from "./m968.ts";
import {GetRoleCredentialsCommand} from "./m972.ts";
import {DAs} from "./m981.ts";
var PAs={};
ft(PAs,{SSOClient:()=>SSOClient,GetRoleCredentialsCommand:()=>GetRoleCredentialsCommand});
var OAs=b(()=>{DAs()});
export {PAs,OAs};
