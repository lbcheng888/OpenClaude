// @ts-nocheck
import {b} from "../runtime.ts";
function Eou(e){var t=0,n=0;return function(){var r=bou(),o=Sou-(r-n);if(n=r,o>0){if(++t>=Tou)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}
var Tou=800,Sou=16,bou,_rs;
var yrs=b(()=>{bou=Date.now;_rs=Eou});
export {Eou,Tou,Sou,bou,_rs,yrs};
