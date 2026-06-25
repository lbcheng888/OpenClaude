// @ts-nocheck
import {UAt,Les} from "./m568.ts";
import {_At,rr,oC} from "./m466.ts";
import {VX,Qnn} from "./m560.ts";
import {b} from "../runtime.ts";
import {Bnn,Gze} from "./m531.ts";
import {e_r,Fnn} from "./m530.ts";
import {c1e,b5,xAt} from "./m535.ts";
import {Nes,Mes} from "./m569.ts";
import {vAt,LEe} from "./m520.ts";
import {S5,Hi} from "./m467.ts";
import {Fes,F_r,B_r} from "./m570.ts";
import {roe,Iv} from "./m533.ts";
import {L_r,trn} from "./m565.ts";
import {Ues,Bes} from "./m571.ts";
import {f1e} from "./m547.ts";
function $es(e){let t=new UAt(e),n=_At(UAt.prototype.request,t);return rr.extend(n,UAt.prototype,t,{allOwnKeys:!0}),rr.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return $es(VX(e,o))},n}
var g0,ho;
var qes=b(()=>{oC();Les();Qnn();Bnn();e_r();c1e();Nes();vAt();S5();Fes();roe();L_r();Ues();g0=$es(Gze);g0.Axios=UAt;g0.CanceledError=b5;g0.CancelToken=Mes;g0.isCancel=xAt;g0.VERSION=f1e;g0.toFormData=LEe;g0.AxiosError=Hi;g0.Cancel=g0.CanceledError;g0.all=function(t){return Promise.all(t)};g0.spread=F_r;g0.isAxiosError=B_r;g0.mergeConfig=VX;g0.AxiosHeaders=Iv;g0.formToJSON=(e)=>Fnn(rr.isHTMLForm(e)?new FormData(e):e);g0.getAdapter=trn.getAdapter;g0.HttpStatusCode=Bes;g0.default=g0;ho=g0});
export {$es,g0,ho,qes};
