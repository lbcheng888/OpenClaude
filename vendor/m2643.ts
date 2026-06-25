// @ts-nocheck
import {Q} from "../runtime.ts";
import {Qm} from "./m2613.ts";
import {JZ} from "./m2620.ts";
import {Nwe} from "./m2619.ts";
import {hWr} from "./m2636.ts";
import {t$e} from "./m2624.ts";
import {cwn} from "./m2626.ts";
import {SWr} from "./m2642.ts";
import {gwn} from "./m2640.ts";
import {iLt} from "./m2635.ts";
import {x_} from "./m2615.ts";
import {Twn} from "./m2641.ts";
var EWr=Q((rLg,dBi)=>{var $we=Qm();JZ();Nwe();hWr();t$e();cwn();SWr();gwn();iLt();x_();Twn();var bWr=$we.asn1,rrt=dBi.exports=$we.pki=$we.pki||{};rrt.pemToDer=function(e){var t=$we.pem.decode(e)[0];if(t.procType&&t.procType.type==="ENCRYPTED")throw Error("Could not convert PEM to DER; PEM is encrypted.");return $we.util.createBuffer(t.body)};rrt.privateKeyFromPem=function(e){var t=$we.pem.decode(e)[0];if(t.type!=="PRIVATE KEY"&&t.type!=="RSA PRIVATE KEY"){var n=Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');throw n.headerType=t.type,n}if(t.procType&&t.procType.type==="ENCRYPTED")throw Error("Could not convert private key from PEM; PEM is encrypted.");var r=bWr.fromDer(t.body);return rrt.privateKeyFromAsn1(r)};rrt.privateKeyToPem=function(e,t){var n={type:"RSA PRIVATE KEY",body:bWr.toDer(rrt.privateKeyToAsn1(e)).getBytes()};return $we.pem.encode(n,{maxline:t})};rrt.privateKeyInfoToPem=function(e,t){var n={type:"PRIVATE KEY",body:bWr.toDer(e).getBytes()};return $we.pem.encode(n,{maxline:t})}});
export {EWr};
