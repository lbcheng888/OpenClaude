// @ts-nocheck
import {Q} from "../runtime.ts";
import {Joi} from "./m1963.ts";
import {ANr} from "./m1960.ts";
import {vNr} from "./m1962.ts";
var BM=Q((x2)=>{var mJu=x2&&x2.__createBinding||(Object.create?function(e,t,n,r){if(r===void 0)r=n;var o=Object.getOwnPropertyDescriptor(t,n);if(!o||("get"in o?!t.__esModule:o.writable||o.configurable))o={enumerable:!0,get:function(){return t[n]}};Object.defineProperty(e,r,o)}:function(e,t,n,r){if(r===void 0)r=n;e[r]=t[n]}),fJu=x2&&x2.__exportStar||function(e,t){for(var n in e)if(n!=="default"&&!Object.prototype.hasOwnProperty.call(t,n))mJu(t,e,n)};Object.defineProperty(x2,"__esModule",{value:!0});x2.instance=x2.Gaxios=x2.GaxiosError=void 0;x2.request=gJu;var Xoi=Joi();Object.defineProperty(x2,"Gaxios",{enumerable:!0,get:function(){return Xoi.Gaxios}});var hJu=ANr();Object.defineProperty(x2,"GaxiosError",{enumerable:!0,get:function(){return hJu.GaxiosError}});fJu(vNr(),x2);x2.instance=new Xoi.Gaxios;async function gJu(e){return x2.instance.request(e)}});
export {BM};
