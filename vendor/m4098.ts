// @ts-nocheck
import {X} from "../runtime.ts";
import {lut} from "./m4097.ts";
var pco=X((getActiveStateForHooks,F$a)=>{var B$a=lut();F$a.exports=dco;function dco(){B$a.call(this),this.view=null,this.detail=0}dco.prototype=Object.create(B$a.prototype,{constructor:{value:dco},initUIEvent:{value:function(e,t,n,r,o){this.initEvent(e,t,n),this.view=r,this.detail=o}}})});
export {pco};
