// @ts-nocheck
import {qTe,lgt} from "./m35.ts";
import {jTe,F7t} from "./m36.ts";
import {FOe,U7t} from "./m44.ts";
import {b} from "../runtime.ts";
function Vpc(e,t){var n=this.__data__;if(n instanceof qTe){var r=n.__data__;if(!jTe||r.length<Gpc-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new FOe(r)}return n.set(e,t),this.size=n.size,this}
var Gpc=200,HFo;
var IFo=b(()=>{lgt();F7t();U7t();HFo=Vpc});
export {Vpc,Gpc,HFo,IFo};
