// @ts-nocheck
import {X} from "../runtime.ts";
import {jbo} from "./m4720.ts";
import {Kbo} from "./m4723.ts";
var VAl=X((g5y,GAl)=>{var $Xp=require("util"),WAl=jbo(),qXp=Kbo(),jXp=GAl.exports=function(e){WAl.call(this);let t=[],n=this;this._filter=new qXp(e,{read:this.read.bind(this),write:function(r){t.push(r)},complete:function(){n.emit("complete",Buffer.concat(t))}}),this._filter.start()};$Xp.inherits(jXp,WAl)});
export {VAl};
