// @ts-nocheck
import {Q} from "../runtime.ts";
import {L4n} from "./m4143.ts";
import {Qfo} from "./m4148.ts";
var UGa=Q((WAy,BGa)=>{var R1p=L4n(),v1p=Qfo();BGa.exports=pho;function pho(e,t){this._window=e,this._href=t}pho.prototype=Object.create(v1p.prototype,{constructor:{value:pho},href:{get:function(){return this._href},set:function(e){this.assign(e)}},assign:{value:function(e){var t=new R1p(this._href),n=t.resolve(e);this._href=n}},replace:{value:function(e){this.assign(e)}},reload:{value:function(){this.assign(this.href)}},toString:{value:function(){return this.href}}})});
export {UGa};
