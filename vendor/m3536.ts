// @ts-nocheck
import {X} from "../runtime.ts";
var dga=X((xTg,uga)=>{uga.exports=qZr;var FQd=/^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;function qZr(e,t){if(typeof e==="string")t=e,e=void 0;var n=[];function r(s){if(typeof s!=="string"){var i=o();if(qZr.verbose)console.log("codegen: "+i);if(i="return "+i,s){var a=Object.keys(s),l=Array(a.length+1),c=Array(a.length),u=0;while(u<a.length)l[u]=a[u],c[u]=s[a[u++]];return l[u]=i,Function.apply(null,l).apply(null,c)}return Function(i)()}var d=Array(arguments.length-1),p=0;while(p<d.length)d[p]=arguments[++p];if(p=0,s=s.replace(/%([%dfijs])/g,function(f,A){var h=d[p++];switch(A){case"d":case"f":return String(Number(h));case"i":return String(Math.floor(h));case"j":return JSON.stringify(h);case"s":return String(h)}return"%"}),p!==d.length)throw Error("parameter count mismatch");return n.push(s),r}function o(s){return"function "+UQd(s||t)+"("+(e&&e.join(",")||"")+`){
  `+n.join(`
  `)+`
}`}return r.toString=o,r}qZr.verbose=!1;function UQd(e){if(!e)return"";if(e=String(e).replace(/[^\w$]/g,""),!e)return"";if(/^\d/.test(e))e="_"+e;return FQd.test(e)?e+"_":e}});
export {dga};
