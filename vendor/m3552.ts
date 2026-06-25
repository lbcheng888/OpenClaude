// @ts-nocheck
import {Q} from "../runtime.ts";
var vAa=Q((pP_,RAa)=>{RAa.exports=Aoo;var wcp=/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;function Aoo(e,t){if(typeof e==="string")t=e,e=void 0;var n=[];function r(s){if(typeof s!=="string"){var i=o();if(Aoo.verbose)console.log("codegen: "+i);if(i="return "+i,s){var a=Object.keys(s),l=Array(a.length+1),c=Array(a.length),u=0;while(u<a.length)l[u]=a[u],c[u]=s[a[u++]];return l[u]=i,Function.apply(null,l).apply(null,c)}return Function(i)()}var d=Array(arguments.length-1),p=0;while(p<d.length)d[p]=arguments[++p];if(p=0,s=s.replace(/%([%dfijs])/g,function(f,h){var g=d[p++];switch(h){case"d":case"f":return String(Number(g));case"i":return String(Math.floor(g));case"j":return JSON.stringify(g);case"s":return String(g)}return"%"}),p!==d.length)throw Error("parameter count mismatch");return n.push(s),r}function o(s){return"function "+kcp(s||t)+"("+(e&&e.join(",")||"")+`){
  `+n.join(`
  `)+`
}`}return r.toString=o,r}Aoo.verbose=!1;function kcp(e){if(!e)return"";if(e=String(e).replace(/[^\w$]/g,""),!e)return"";if(/^\d/.test(e))e="_"+e;return wcp.test(e)?e+"_":e}});
export {vAa};
