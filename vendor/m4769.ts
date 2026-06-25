// @ts-nocheck
import {Q} from "../runtime.ts";
import {bko} from "./m4768.ts";
import {pko} from "./m4755.ts";
var _Al=Q((gAl)=>{var Bam=bko(),Uam=pko();gAl.process=function(e,t){let n=[],r=new Bam(e);return new Uam(t,{read:r.read.bind(r),write:function(s){n.push(s)},complete:function(){}}).start(),r.process(),Buffer.concat(n)}});
export {_Al};
