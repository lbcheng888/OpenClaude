// @ts-nocheck
import {Q} from "../runtime.ts";
import {lko} from "./m4752.ts";
import {pko} from "./m4755.ts";
var qCl=Q((SrS,$Cl)=>{var eam=require("util"),UCl=lko(),tam=pko(),nam=$Cl.exports=function(e){UCl.call(this);let t=[],n=this;this._filter=new tam(e,{read:this.read.bind(this),write:function(r){t.push(r)},complete:function(){n.emit("complete",Buffer.concat(t))}}),this._filter.start()};eam.inherits(nam,UCl)});
export {qCl};
