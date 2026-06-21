// @ts-nocheck
import {X} from "../runtime.ts";
import {Uf} from "./m2602.ts";
import {ZZ} from "./m2609.ts";
import {eRe} from "./m2608.ts";
import {N4r} from "./m2625.ts";
import {e2e} from "./m2613.ts";
import {yCn} from "./m2615.ts";
import {q4r} from "./m2631.ts";
import {wCn} from "./m2629.ts";
import {xDt} from "./m2624.ts";
import {w_} from "./m2604.ts";
import {kCn} from "./m2630.ts";
var W4r=X((gEh,PPi)=>{var oRe=Uf();ZZ();eRe();N4r();e2e();yCn();q4r();wCn();xDt();w_();kCn();var j4r=oRe.asn1,Zet=PPi.exports=oRe.pki=oRe.pki||{};Zet.pemToDer=function(e){var t=oRe.pem.decode(e)[0];if(t.procType&&t.procType.type==="ENCRYPTED")throw Error("Could not convert PEM to DER; PEM is encrypted.");return oRe.util.createBuffer(t.body)};Zet.privateKeyFromPem=function(e){var t=oRe.pem.decode(e)[0];if(t.type!=="PRIVATE KEY"&&t.type!=="RSA PRIVATE KEY"){var n=Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');throw n.headerType=t.type,n}if(t.procType&&t.procType.type==="ENCRYPTED")throw Error("Could not convert private key from PEM; PEM is encrypted.");var r=j4r.fromDer(t.body);return Zet.privateKeyFromAsn1(r)};Zet.privateKeyToPem=function(e,t){var n={type:"RSA PRIVATE KEY",body:j4r.toDer(Zet.privateKeyToAsn1(e)).getBytes()};return oRe.pem.encode(n,{maxline:t})};Zet.privateKeyInfoToPem=function(e,t){var n={type:"PRIVATE KEY",body:j4r.toDer(e).getBytes()};return oRe.pem.encode(n,{maxline:t})}});
export {W4r};
