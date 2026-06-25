// @ts-nocheck
import {b} from "../runtime.ts";
function qRi(e,t){if(e<2)return;if(cCn.size>=(Xdd??Jdd)){v3r=!0;return}cCn.add(e*Ydd+t)}
function KDt(e){uCn=e}
function VRi(e){QUe=e}
function k3r(e){KRi++,zRi=e,jRi=performance.now()}
function H3r(){return{count:KRi,lastReason:zRi,lastResetAt:jRi}}
function zDt(){return{atlasKeys:cCn.size,saturated:v3r}}
function I3r(){cCn.clear(),v3r=!1}
function YRi(e){lCn=e}
function JRi(){if(!lCn)return null;return{size:lCn.size,overflowed:lCn.overflowed}}
function XRi(){if(URi)return!1;return URi=!0,!0}
function QRi(){if($Ri)return!1;return $Ri=!0,!0}
var uCn=!1,QUe=!1,Ydd=32768,Jdd=131072,cCn,v3r=!1,Xdd=null,lCn=null,URi=!1,$Ri=!1,WRi=!1,GRi=!1,w3r=!1,KRi=0,zRi="none",jRi=0;
var ett=b(()=>{cCn=new Set});
export {qRi,KDt,VRi,k3r,H3r,zDt,I3r,YRi,JRi,XRi,QRi,uCn,QUe,Ydd,Jdd,cCn,v3r,Xdd,lCn,URi,$Ri,WRi,GRi,w3r,KRi,zRi,jRi,ett};
