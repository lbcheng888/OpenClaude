// @ts-nocheck
import {X} from "../runtime.ts";
import {DDe} from "./m4697.ts";
import {SWn} from "./m4698.ts";
import {tAl} from "./m4699.ts";
import {rAl} from "./m4700.ts";
import {oAl} from "./m4701.ts";
import {iAl} from "./m4702.ts";
import {aAl} from "./m4703.ts";
import {wbo} from "./m4704.ts";
import {pAl} from "./m4707.ts";
import {gAl} from "./m4711.ts";
import {TAl} from "./m4712.ts";
import {ODe} from "./m4710.ts";
import {NAl} from "./m4718.ts";
var qbo=X((BAl)=>{var HWn=DDe(),Nbo=SWn(),EXp=tAl(),CXp=rAl(),vXp=oAl(),wXp=iAl(),Ubo=aAl(),$bo=wbo(),RXp=pAl(),kWn=gAl(),xXp=TAl(),kXp=ODe(),Bbo=NAl();function HXp(e,t){let n=e.size,r=wXp.getPositions(t);for(let o=0;o<r.length;o++){let s=r[o][0],i=r[o][1];for(let a=-1;a<=7;a++){if(s+a<=-1||n<=s+a)continue;for(let l=-1;l<=7;l++){if(i+l<=-1||n<=i+l)continue;if(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4)e.set(s+a,i+l,!0,!0);else e.set(s+a,i+l,!1,!0)}}}}function IXp(e){let t=e.size;for(let n=8;n<t-8;n++){let r=n%2===0;e.set(n,6,r,!0),e.set(6,n,r,!0)}}function DXp(e,t){let n=vXp.getPositions(t);for(let r=0;r<n.length;r++){let o=n[r][0],s=n[r][1];for(let i=-2;i<=2;i++)for(let a=-2;a<=2;a++)if(i===-2||i===2||a===-2||a===2||i===0&&a===0)e.set(o+i,s+a,!0,!0);else e.set(o+i,s+a,!1,!0)}}function PXp(e,t){let n=e.size,r=kWn.getEncodedBits(t),o,s,i;for(let a=0;a<18;a++)o=Math.floor(a/3),s=a%3+n-8-3,i=(r>>a&1)===1,e.set(o,s,i,!0),e.set(s,o,i,!0)}function Fbo(e,t,n){let r=e.size,o=xXp.getEncodedBits(t,n),s,i;for(s=0;s<15;s++){if(i=(o>>s&1)===1,s<6)e.set(s,8,i,!0);else if(s<8)e.set(s+1,8,i,!0);else e.set(r-15+s,8,i,!0);if(s<8)e.set(8,r-s-1,i,!0);else if(s<9)e.set(8,15-s-1+1,i,!0);else e.set(8,15-s-1,i,!0)}e.set(r-8,8,1,!0)}function OXp(e,t){let n=e.size,r=-1,o=n-1,s=7,i=0;for(let a=n-1;a>0;a-=2){if(a===6)a--;while(!0){for(let l=0;l<2;l++)if(!e.isReserved(o,a-l)){let c=!1;if(i<t.length)c=(t[i]>>>s&1)===1;if(e.set(o,a-l,c),s--,s===-1)i++,s=7}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}}function LXp(e,t,n){let r=new EXp;n.forEach(function(l){r.put(l.mode.bit,4),r.put(l.getLength(),kXp.getCharCountIndicator(l.mode,e)),l.write(r)});let o=HWn.getSymbolTotalCodewords(e),s=$bo.getTotalCodewordsCount(e,t),i=(o-s)*8;if(r.getLengthInBits()+4<=i)r.put(0,4);while(r.getLengthInBits()%8!==0)r.putBit(0);let a=(i-r.getLengthInBits())/8;for(let l=0;l<a;l++)r.put(l%2?17:236,8);return MXp(r,e,t)}function MXp(e,t,n){let r=HWn.getSymbolTotalCodewords(t),o=$bo.getTotalCodewordsCount(t,n),s=r-o,i=$bo.getBlocksCount(t,n),a=r%i,l=i-a,c=Math.floor(r/i),u=Math.floor(s/i),d=u+1,p=c-u,m=new RXp(p),f=0,A=Array(i),h=Array(i),g=0,_=new Uint8Array(e.buffer);for(let R=0;R<i;R++){let k=R<l?u:d;A[R]=_.slice(f,f+k),h[R]=m.encode(A[R]),f+=k,g=Math.max(g,k)}let y=new Uint8Array(r),T=0,S,v;for(S=0;S<g;S++)for(v=0;v<i;v++)if(S<A[v].length)y[T++]=A[v][S];for(S=0;S<p;S++)for(v=0;v<i;v++)y[T++]=h[v][S];return y}function NXp(e,t,n,r){let o;if(Array.isArray(e))o=Bbo.fromArray(e);else if(typeof e==="string"){let c=t;if(!c){let u=Bbo.rawSplit(e);c=kWn.getBestVersionForData(u,n)}o=Bbo.fromString(e,c||40)}else throw Error("Invalid data");let s=kWn.getBestVersionForData(o,n);if(!s)throw Error("The amount of data is too big to be stored in a QR Code");if(!t)t=s;else if(t<s)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+s+`.
`);let i=LXp(t,n,o),a=HWn.getSymbolSize(t),l=new CXp(a);if(HXp(l,t),IXp(l),DXp(l,t),Fbo(l,n,0),t>=7)PXp(l,t);if(OXp(l,i),isNaN(r))r=Ubo.getBestMask(l,Fbo.bind(null,l,n));return Ubo.applyMask(r,l),Fbo(l,n,r),{modules:l,version:t,errorCorrectionLevel:n,maskPattern:r,segments:o}}BAl.create=function(t,n){if(typeof t>"u"||t==="")throw Error("No input text");let r=Nbo.M,o,s;if(typeof n<"u"){if(r=Nbo.from(n.errorCorrectionLevel,Nbo.M),o=kWn.from(n.version),s=Ubo.from(n.maskPattern),n.toSJISFunc)HWn.setToSJISFunction(n.toSJISFunc)}return NXp(t,o,r,s)}});
export {qbo};
