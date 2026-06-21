// @ts-nocheck
import {X} from "../runtime.ts";
import {Zzn} from "./m5208.ts";
import {WUl} from "./m5212.ts";
import {pWt} from "./m5207.ts";
import {V0o} from "./m5209.ts";
import {z0o} from "./m5210.ts";
var zUl=X((WJ)=>{var{Argument:GUl}=Zzn(),{Command:Z0o}=WUl(),{CommanderError:kCm,InvalidArgumentError:VUl}=pWt(),{Help:HCm}=V0o(),{Option:KUl}=z0o();WJ.program=new Z0o;WJ.createCommand=(e)=>new Z0o(e);WJ.createOption=(e,t)=>new KUl(e,t);WJ.createArgument=(e,t)=>new GUl(e,t);WJ.Command=Z0o;WJ.Option=KUl;WJ.Argument=GUl;WJ.Help=HCm;WJ.CommanderError=kCm;WJ.InvalidArgumentError=VUl;WJ.InvalidOptionArgumentError=VUl});
export {zUl};
