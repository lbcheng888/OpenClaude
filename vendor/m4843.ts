// @ts-nocheck
import {Dtt,y0i,d2e} from "./m2418.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function MHo(){let e=LHo.c(2),t=Ukl.useSyncExternalStore(Dtt,y0i),n;if(e[0]!==t)n=t?BTe.jsx(Ldm,{}):null,e[0]=t,e[1]=n;else n=e[1];return n}
function Ldm(){let e=LHo.c(2),t;if(e[0]===Symbol.for("react.memo_cache_sentinel"))t=Udm(Odm),e[0]=t;else t=e[0];let n=t,r;if(e[1]===Symbol.for("react.memo_cache_sentinel"))r=BTe.jsxs(Box,{flexDirection:"column",marginTop:1,children:[BTe.jsx(Text,{dimColor:!0,children:"\u2500\u2500 scroll test \u2014 disappears when you close the dialog \u2500\u2500"}),n.map(Mdm)]}),e[1]=r;else r=e[1];return r}
function Mdm(e,t){return BTe.jsxs(Text,{dimColor:!0,children:["  ",e.num,e.text&&BTe.jsxs(BTe.Fragment,{children:["  ",e.indent,e.text]})]},t)}
function Udm(e){let t=Fdm??=Ndm.trim().split(/\s+/),n=String(e).length,r=[],o=0,s=0;while(r.length<e){let i=Bkl[s%Bkl.length];s++;let a=" ".repeat(i.indent);for(let l=0;l<i.lines&&r.length<e;l++){let u=l===i.lines-1?12+s*11%28:Bdm,d=[],p=0;while(p<u){let m=t[o%t.length];d.push(m),p+=m.length+1,o++}r.push({num:String(r.length+1).padStart(n),text:d.join(" "),indent:a})}if(r.length<e)r.push({num:String(r.length+1).padStart(n),text:"",indent:""})}return r}
var LHo,Ukl,BTe,Odm=200,Ndm="Vivere omnes beate volunt sed ad pervidendum quid sit quod beatam vitam efficiat caligant et adeo non est facile consequi beatam vitam ut eo quisque ab ea longius recedat quo ad illam concitatius fertur si via lapsus est quae ubi in contrarium ducit ipsa velocitas maioris intervalli causa fit proponendum est itaque primum quid sit quod adpetamus tunc circumspiciendum qua contendere illo celerrime possimus intellecturi in ipso itinere si modo rectum erit quantum cotidie profligetur quantoque propius ab eo simus ad quod nos cupiditas naturalis inpellit quam diu quidem passim vagamur non ducem secuti sed fremitum et clamorem dissonum in diversa vocantium conteretur vita inter errores brevis etiam si dies noctesque bonae menti laboremus decernatur itaque et quo tendamus et qua non sine perito aliquo cui explorata sint ea in quae procedimus quoniam quidem non eadem hic quae in ceteris peregrinationibus condicio est in illis comprensus aliquis limes et interrogati incolae non patiuntur errare at hic tritissima quaeque via et celeberrima maxime decipit nihil ergo magis praestandum est quam ne pecorum ritu sequamur antecedentium gregem pergentes non quo eundum est sed quo itur atqui nulla res nos maioribus malis implicat quam quod ad rumorem componimur optima rati ea quae magno adsensu recepta sunt quodque exempla nobis pro bonis multa sunt nec ad rationem sed ad similitudinem vivimus ",Fdm,Bdm=56,Bkl;
var $kl=b(()=>{d2e();je();LHo=x(tt(),1),Ukl=x(et(),1),BTe=x(oe(),1);Bkl=[{lines:1,indent:0},{lines:5,indent:0},{lines:3,indent:2},{lines:2,indent:0},{lines:7,indent:0},{lines:4,indent:2},{lines:1,indent:0},{lines:6,indent:0},{lines:2,indent:2},{lines:3,indent:0}]});
export {MHo,Ldm,Mdm,Udm,LHo,Ukl,BTe,Odm,Ndm,Fdm,Bdm,Bkl,$kl};
