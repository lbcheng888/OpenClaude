// @ts-nocheck
import {Q} from "../runtime.ts";
import {rLa} from "./m3793.ts";
import {iLa} from "./m3794.ts";
var cLa=Q((aLa,lLa)=>{(function(){var e,t,n;t=rLa(),n=iLa(),lLa.exports=e=function(){class r{constructor(){var o;this.defaultParams={"canonical-form":!1,"cdata-sections":!1,comments:!1,"datatype-normalization":!1,"element-content-whitespace":!0,entities:!0,"error-handler":new t,infoset:!0,"validate-if-schema":!1,namespaces:!0,"namespace-declarations":!0,"normalize-characters":!1,"schema-location":"","schema-type":"","split-cdata-sections":!0,validate:!1,"well-formed":!0},this.params=o=Object.create(this.defaultParams)}getParameter(o){if(this.params.hasOwnProperty(o))return this.params[o];else return null}canSetParameter(o,s){return!0}setParameter(o,s){if(s!=null)return this.params[o]=s;else return delete this.params[o]}}return Object.defineProperty(r.prototype,"parameterNames",{get:function(){return new n(Object.keys(this.defaultParams))}}),r}.call(this)}).call(aLa)});
export {cLa};
