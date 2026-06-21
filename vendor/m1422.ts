// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {GetIdCommand} from "./m1400.ts";
import {GetCredentialsForIdentityCommand} from "./m1399.ts";
import {CognitoIdentityClient} from "./m1390.ts";
import {H2s} from "./m1421.ts";
var oRr={};
isFullscreenWithTTY(oRr,{GetIdCommand:()=>GetIdCommand,GetCredentialsForIdentityCommand:()=>GetCredentialsForIdentityCommand,CognitoIdentityClient:()=>CognitoIdentityClient});
var sRr=b(()=>{H2s()});
export {oRr,sRr};
