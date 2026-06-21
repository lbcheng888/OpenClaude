// @ts-nocheck
import {X} from "../runtime.ts";
var qhl=X(($hl)=>{var zQp="\x1B[47m\x1B[30m",YQp="\x1B[40m\x1B[37m",JQp=function(e,t,n){return{"00":"\x1B[0m "+e,"01":"\x1B[0m"+t+"\u2584"+e,"02":"\x1B[0m"+n+"\u2584"+e,10:"\x1B[0m"+t+"\u2580"+e,11:" ",12:"\u2584",20:"\x1B[0m"+n+"\u2580"+e,21:"\u2580",22:"\u2588"}},Fhl=function(e,t,n,r){let o=t+1;if(n>=o||r>=o||r<-1||n<-1)return"0";if(n>=t||r>=t||r<0||n<0)return"1";let s=r*t+n;return e[s]?"2":"1"},Uhl=function(e,t,n,r){return Fhl(e,t,n,r)+Fhl(e,t,n,r+1)};$hl.render=function(e,t,n){let r=e.modules.size,o=e.modules.data,s=!!(t&&t.inverse),i=t&&t.inverse?YQp:zQp,c=JQp(i,s?"\x1B[30m":"\x1B[37m",s?"\x1B[37m":"\x1B[30m"),u=`\x1B[0m
`+i,d=i;for(let p=-1;p<r+1;p+=2){for(let m=-1;m<r;m++)d+=c[Uhl(o,r,m,p)];d+=c[Uhl(o,r,r,p)]+u}if(d+="\x1B[0m",typeof n==="function")n(null,d);return d}});
export {qhl};
