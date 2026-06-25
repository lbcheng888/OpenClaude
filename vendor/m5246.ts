// @ts-nocheck
import {Q} from "../runtime.ts";
import {JQn} from "./m5241.ts";
import {P8l} from "./m5245.ts";
import {$Kt} from "./m5240.ts";
import {d1o} from "./m5242.ts";
import {m1o} from "./m5243.ts";
var N8l=Q((LJ)=>{var{Argument:O8l}=JQn(),{Command:y1o}=P8l(),{CommanderError:qDm,InvalidArgumentError:L8l}=$Kt(),{Help:WDm}=d1o(),{Option:M8l}=m1o();LJ.program=new y1o;LJ.createCommand=(e)=>new y1o(e);LJ.createOption=(e,t)=>new M8l(e,t);LJ.createArgument=(e,t)=>new O8l(e,t);LJ.Command=y1o;LJ.Option=M8l;LJ.Argument=O8l;LJ.Help=WDm;LJ.CommanderError=qDm;LJ.InvalidArgumentError=L8l;LJ.InvalidOptionArgumentError=L8l});
export {N8l};
