// @ts-nocheck
import {fbt,Bzo} from "./m562.ts";
import {GSt,er,ZE} from "./m460.ts";
import {zX,gen} from "./m554.ts";
import {b} from "../runtime.ts";
import {oen,VVe} from "./m525.ts";
import {vpr,ren} from "./m524.ts";
import {hMe,s8,sbt} from "./m529.ts";
import {Uzo,Fzo} from "./m563.ts";
import {ebt,ZSe} from "./m514.ts";
import {o8,Ji} from "./m461.ts";
import {$zo,cmr,umr} from "./m564.ts";
import {soe,SR} from "./m527.ts";
import {imr,Ten} from "./m559.ts";
import {jzo,qzo} from "./m565.ts";
import {SMe} from "./m541.ts";
function Wzo(e){let t=new fbt(e),n=GSt(fbt.prototype.request,t);return er.extend(n,fbt.prototype,t,{allOwnKeys:!0}),er.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return Wzo(zX(e,o))},n}
var QI,fo;
var Gzo=b(()=>{ZE();Bzo();gen();oen();vpr();hMe();Uzo();ebt();o8();$zo();soe();imr();jzo();QI=Wzo(VVe);QI.Axios=fbt;QI.CanceledError=s8;QI.CancelToken=Fzo;QI.isCancel=sbt;QI.VERSION=SMe;QI.toFormData=ZSe;QI.AxiosError=Ji;QI.Cancel=QI.CanceledError;QI.all=function(t){return Promise.all(t)};QI.spread=cmr;QI.isAxiosError=umr;QI.mergeConfig=zX;QI.AxiosHeaders=SR;QI.formToJSON=(e)=>ren(er.isHTMLForm(e)?new FormData(e):e);QI.getAdapter=Ten.getAdapter;QI.HttpStatusCode=qzo;QI.default=QI;fo=QI});
export {Wzo,QI,fo,Gzo};
