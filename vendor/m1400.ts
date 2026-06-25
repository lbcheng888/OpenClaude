// @ts-nocheck
import {b,x} from "../runtime.ts";
import {vy} from "./m1381.ts";
import {SA,cp} from "./m1383.ts";
import {IR,vqs} from "./m1398.ts";
import {yo} from "./m892.ts";
import {Rd} from "./m1373.ts";
var Yqs,zIr;
var jIr=b(()=>{vy();SA();IR();Yqs=x(yo(),1);zIr=class zIr extends Rd.classBuilder().ep(cp).m(function(e,t,n,r){return[Yqs.getEndpointPlugin(n,e.getEndpointParameterInstructions())]}).s("AWSCognitoIdentityService","DeleteIdentities",{}).n("CognitoIdentityClient","DeleteIdentitiesCommand").sc(vqs).build(){}});
export {Yqs,zIr,jIr};
