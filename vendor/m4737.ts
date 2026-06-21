// @ts-nocheck
import {X} from "../runtime.ts";
import {nEo} from "./m4736.ts";
import {Kbo} from "./m4723.ts";
var Shl=X((Thl)=>{var wQp=nEo(),RQp=Kbo();Thl.process=function(e,t){let n=[],r=new wQp(e);return new RQp(t,{read:r.read.bind(r),write:function(s){n.push(s)},complete:function(){}}).start(),r.process(),Buffer.concat(n)}});
export {Shl};
