// @ts-nocheck
import {Q} from "../runtime.ts";
import {IPe} from "./m4729.ts";
import {azn} from "./m4730.ts";
import {XEl} from "./m4731.ts";
import {ZEl} from "./m4732.ts";
import {eCl} from "./m4733.ts";
import {nCl} from "./m4734.ts";
import {rCl} from "./m4735.ts";
import {Vwo} from "./m4736.ts";
import {lCl} from "./m4739.ts";
import {mCl} from "./m4743.ts";
import {gCl} from "./m4744.ts";
import {DPe} from "./m4742.ts";
import {PCl} from "./m4750.ts";
var ako=Q((OCl)=>{var gzn=IPe(),nko=azn(),Mim=XEl(),Nim=ZEl(),Fim=eCl(),Bim=nCl(),sko=rCl(),iko=Vwo(),Uim=lCl(),hzn=mCl(),$im=gCl(),qim=DPe(),rko=PCl();function Wim(e,t){let n=e.size,r=Bim.getPositions(t);for(let o=0;o<r.length;o++){let s=r[o][0],i=r[o][1];for(let a=-1;a<=7;a++){if(s+a<=-1||n<=s+a)continue;for(let l=-1;l<=7;l++){if(i+l<=-1||n<=i+l)continue;if(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4)e.set(s+a,i+l,!0,!0);else e.set(s+a,i+l,!1,!0)}}}}function Gim(e){let t=e.size;for(let n=8;n<t-8;n++){let r=n%2===0;e.set(n,6,r,!0),e.set(6,n,r,!0)}}function Vim(e,t){let n=Fim.getPositions(t);for(let r=0;r<n.length;r++){let o=n[r][0],s=n[r][1];for(let i=-2;i<=2;i++)for(let a=-2;a<=2;a++)if(i===-2||i===2||a===-2||a===2||i===0&&a===0)e.set(o+i,s+a,!0,!0);else e.set(o+i,s+a,!1,!0)}}function Kim(e,t){let n=e.size,r=hzn.getEncodedBits(t),o,s,i;for(let a=0;a<18;a++)o=Math.floor(a/3),s=a%3+n-8-3,i=(r>>a&1)===1,e.set(o,s,i,!0),e.set(s,o,i,!0)}function oko(e,t,n){let r=e.size,o=$im.getEncodedBits(t,n),s,i;for(s=0;s<15;s++){if(i=(o>>s&1)===1,s<6)e.set(s,8,i,!0);else if(s<8)e.set(s+1,8,i,!0);else e.set(r-15+s,8,i,!0);if(s<8)e.set(8,r-s-1,i,!0);else if(s<9)e.set(8,15-s-1+1,i,!0);else e.set(8,15-s-1,i,!0)}e.set(r-8,8,1,!0)}function zim(e,t){let n=e.size,r=-1,o=n-1,s=7,i=0;for(let a=n-1;a>0;a-=2){if(a===6)a--;while(!0){for(let l=0;l<2;l++)if(!e.isReserved(o,a-l)){let c=!1;if(i<t.length)c=(t[i]>>>s&1)===1;if(e.set(o,a-l,c),s--,s===-1)i++,s=7}if(o+=r,o<0||n<=o){o-=r,r=-r;break}}}}function jim(e,t,n){let r=new Mim;n.forEach(function(l){r.put(l.mode.bit,4),r.put(l.getLength(),qim.getCharCountIndicator(l.mode,e)),l.write(r)});let o=gzn.getSymbolTotalCodewords(e),s=iko.getTotalCodewordsCount(e,t),i=(o-s)*8;if(r.getLengthInBits()+4<=i)r.put(0,4);while(r.getLengthInBits()%8!==0)r.putBit(0);let a=(i-r.getLengthInBits())/8;for(let l=0;l<a;l++)r.put(l%2?17:236,8);return Yim(r,e,t)}function Yim(e,t,n){let r=gzn.getSymbolTotalCodewords(t),o=iko.getTotalCodewordsCount(t,n),s=r-o,i=iko.getBlocksCount(t,n),a=r%i,l=i-a,c=Math.floor(r/i),u=Math.floor(s/i),d=u+1,p=c-u,m=new Uim(p),f=0,h=Array(i),g=Array(i),_=0,T=new Uint8Array(e.buffer);for(let w=0;w<i;w++){let H=w<l?u:d;h[w]=T.slice(f,f+H),g[w]=m.encode(h[w]),f+=H,_=Math.max(_,H)}let y=new Uint8Array(r),S=0,E,R;for(E=0;E<_;E++)for(R=0;R<i;R++)if(E<h[R].length)y[S++]=h[R][E];for(E=0;E<p;E++)for(R=0;R<i;R++)y[S++]=g[R][E];return y}function Jim(e,t,n,r){let o;if(Array.isArray(e))o=rko.fromArray(e);else if(typeof e==="string"){let c=t;if(!c){let u=rko.rawSplit(e);c=hzn.getBestVersionForData(u,n)}o=rko.fromString(e,c||40)}else throw Error("Invalid data");let s=hzn.getBestVersionForData(o,n);if(!s)throw Error("The amount of data is too big to be stored in a QR Code");if(!t)t=s;else if(t<s)throw Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+s+`.
`);let i=jim(t,n,o),a=gzn.getSymbolSize(t),l=new Nim(a);if(Wim(l,t),Gim(l),Vim(l,t),oko(l,n,0),t>=7)Kim(l,t);if(zim(l,i),isNaN(r))r=sko.getBestMask(l,oko.bind(null,l,n));return sko.applyMask(r,l),oko(l,n,r),{modules:l,version:t,errorCorrectionLevel:n,maskPattern:r,segments:o}}OCl.create=function(t,n){if(typeof t>"u"||t==="")throw Error("No input text");let r=nko.M,o,s;if(typeof n<"u"){if(r=nko.from(n.errorCorrectionLevel,nko.M),o=hzn.from(n.version),s=sko.from(n.maskPattern),n.toSJISFunc)gzn.setToSJISFunction(n.toSJISFunc)}return Jim(t,o,r,s)}});
export {ako};
