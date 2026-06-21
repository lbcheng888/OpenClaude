// @ts-nocheck
import {b} from "../runtime.ts";
import {o8,Ji} from "./m461.ts";
function sbt(e){return!!(e&&e.__CANCEL__)}
var gKo,s8;
var hMe=b(()=>{o8();gKo=class gKo extends Ji{constructor(e,t,n){super(e==null?"canceled":e,Ji.ERR_CANCELED,t,n);this.name="CanceledError",this.__CANCEL__=!0}};s8=gKo});
export {sbt,gKo,s8,hMe};
