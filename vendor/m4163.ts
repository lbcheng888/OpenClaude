// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {JGa} from "./m4162.ts";
var aVa={};
ft(aVa,{default:()=>nNp});
function D1p(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)if(n.hasOwnProperty(r))e[r]=n[r]}return e}
function Tho(e,t){return Array(t+1).join(e)}
function P1p(e){return e.replace(/^\n*/,"")}
function O1p(e){var t=e.length;while(t>0&&e[t-1]===`
`)t--;return e.substring(0,t)}
function Sho(e){return bho(e,L1p)}
function eVa(e){return bho(e,ZGa)}
function M1p(e){return nVa(e,ZGa)}
function N1p(e){return bho(e,tVa)}
function F1p(e){return nVa(e,tVa)}
function bho(e,t){return t.indexOf(e.nodeName)>=0}
function nVa(e,t){return e.getElementsByTagName&&t.some(function(n){return e.getElementsByTagName(n).length})}
function eqn(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}
function rVa(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}
function gho(e,t,n){for(var r=0;r<e.length;r++){var o=e[r];if(B1p(o,t,n))return o}return}
function B1p(e,t,n){var r=e.filter;if(typeof r==="string"){if(r===t.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof r==="function"){if(r.call(e,t,n))return!0}else throw TypeError("`filter` needs to be a string, array, or function")}
function U1p(e){var{element:t,isBlock:n,isVoid:r}=e,o=e.isPre||function(d){return d.nodeName==="PRE"};if(!t.firstChild||o(t))return;var s=null,i=!1,a=null,l=XGa(a,t,o);while(l!==t){if(l.nodeType===3||l.nodeType===4){var c=l.data.replace(/[ \r\n\t]+/g," ");if((!s||/ $/.test(s.data))&&!i&&c[0]===" ")c=c.substr(1);if(!c){l=_ho(l);continue}l.data=c,s=l}else if(l.nodeType===1){if(n(l)||l.nodeName==="BR"){if(s)s.data=s.data.replace(/ $/,"");s=null,i=!1}else if(r(l)||o(l))s=null,i=!0;else if(s)i=!1}else{l=_ho(l);continue}var u=XGa(a,l,o);a=l,l=u}if(s){if(s.data=s.data.replace(/ $/,""),!s.data)_ho(s)}}
function _ho(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}
function XGa(e,t,n){if(e&&e.parentNode===t||n(t))return t.nextSibling||t.parentNode;return t.firstChild||t.nextSibling||t.parentNode}
function $1p(){var e=oVa.DOMParser,t=!1;try{if(new e().parseFromString("","text/html"))t=!0}catch(n){}return t}
function q1p(){var e=function(){};{var t=JGa();e.prototype.parseFromString=function(n){return t.createDocument(n)}}return e}
function G1p(e,t){var n;if(typeof e==="string"){var r=V1p().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");n=r.getElementById("turndown-root")}else n=e.cloneNode(!0);return U1p({element:n,isBlock:Sho,isVoid:eVa,isPre:t.preformattedCode?K1p:null}),n}
function V1p(){return yho=yho||new W1p,yho}
function K1p(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}
function z1p(e,t){return e.isBlock=Sho(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=j1p(e),e.flankingWhitespace=Y1p(e,t),e}
function j1p(e){return!eVa(e)&&!N1p(e)&&/^\s*$/i.test(e.textContent)&&!M1p(e)&&!F1p(e)}
function Y1p(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var n=J1p(e.textContent);if(n.leadingAscii&&QGa("left",e,t))n.leading=n.leadingNonAscii;if(n.trailingAscii&&QGa("right",e,t))n.trailing=n.trailingNonAscii;return{leading:n.leading,trailing:n.trailing}}
function J1p(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}
function QGa(e,t,n){var r,o,s;if(e==="left")r=t.previousSibling,o=/ $/;else r=t.nextSibling,o=/^ /;if(r){if(r.nodeType===3)s=o.test(r.nodeValue);else if(n.preformattedCode&&r.nodeName==="CODE")s=!1;else if(r.nodeType===1&&!Sho(r))s=o.test(r.textContent)}return s}
function tqn(e){if(!(this instanceof tqn))return new tqn(e);var t={rules:FB,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(n,r){return r.isBlock?`

`:""},keepReplacement:function(n,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(n,r){return r.isBlock?`

`+n+`

`:n}};this.options=D1p({},t,e),this.rules=new rVa(this.options)}
function sVa(e){var t=this;return X1p.call(e.childNodes,function(n,r){r=new z1p(r,t.options);var o="";if(r.nodeType===3)o=r.isCode?r.nodeValue:t.escape(r.nodeValue);else if(r.nodeType===1)o=eNp.call(t,r);return iVa(n,o)},"")}
function Z1p(e){var t=this;return this.rules.forEach(function(n){if(typeof n.append==="function")e=iVa(e,n.append(t.options))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}
function eNp(e){var t=this.rules.forNode(e),n=sVa.call(this,e),r=e.flankingWhitespace;if(r.leading||r.trailing)n=n.trim();return r.leading+t.replacement(n,e,this.options)+r.trailing}
function iVa(e,t){var n=O1p(e),r=P1p(t),o=Math.max(e.length-n.length,t.length-r.length),s=`

`.substring(0,o);return n+s+r}
function tNp(e){return e!=null&&(typeof e==="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}
var L1p,ZGa,tVa,FB,oVa,W1p,yho,X1p,Q1p,nNp;
var lVa=b(()=>{L1p=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];ZGa=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];tVa=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];FB={};FB.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};FB.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+`
`}};FB.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,n){var r=Number(t.nodeName.charAt(1));if(n.headingStyle==="setext"&&r<3){var o=Tho(r===1?"=":"-",e.length);return`

`+e+`
`+o+`

`}else return`

`+Tho("#",r)+" "+e+`

`}};FB.blockquote={filter:"blockquote",replacement:function(e){return e=e.replace(/^\n+|\n+$/g,""),e=e.replace(/^/gm,"> "),`

`+e+`

`}};FB.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;if(n.nodeName==="LI"&&n.lastElementChild===t)return`
`+e;else return`

`+e+`

`}};FB.listItem={filter:"li",replacement:function(e,t,n){e=e.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var r=n.bulletListMarker+"   ",o=t.parentNode;if(o.nodeName==="OL"){var s=o.getAttribute("start"),i=Array.prototype.indexOf.call(o.children,t);r=(s?Number(s)+i:i+1)+".  "}return r+e+(t.nextSibling&&!/\n$/.test(e)?`
`:"")}};FB.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};FB.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){var r=t.firstChild.getAttribute("class")||"",o=(r.match(/language-(\S+)/)||[null,""])[1],s=t.firstChild.textContent,i=n.fence.charAt(0),a=3,l=new RegExp("^"+i+"{3,}","gm"),c;while(c=l.exec(s))if(c[0].length>=a)a=c[0].length+1;var u=Tho(i,a);return`

`+u+o+`
`+s.replace(/\n$/,"")+`
`+u+`

`}};FB.horizontalRule={filter:"hr",replacement:function(e,t,n){return`

`+n.hr+`

`}};FB.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var n=t.getAttribute("href");if(n)n=n.replace(/([()])/g,"\\$1");var r=eqn(t.getAttribute("title"));if(r)r=' "'+r.replace(/"/g,"\\\"")+'"';return"["+e+"]("+n+r+")"}};FB.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,n){var r=t.getAttribute("href"),o=eqn(t.getAttribute("title"));if(o)o=' "'+o+'"';var s,i;switch(n.linkReferenceStyle){case"collapsed":s="["+e+"][]",i="["+e+"]: "+r+o;break;case"shortcut":s="["+e+"]",i="["+e+"]: "+r+o;break;default:var a=this.references.length+1;s="["+e+"]["+a+"]",i="["+a+"]: "+r+o}return this.references.push(i),s},references:[],append:function(e){var t="";if(this.references.length)t=`

`+this.references.join(`
`)+`

`,this.references=[];return t}};FB.emphasis={filter:["em","i"],replacement:function(e,t,n){if(!e.trim())return"";return n.emDelimiter+e+n.emDelimiter}};FB.strong={filter:["strong","b"],replacement:function(e,t,n){if(!e.trim())return"";return n.strongDelimiter+e+n.strongDelimiter}};FB.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",n="`",r=e.match(/`+/gm)||[];while(r.indexOf(n)!==-1)n=n+"`";return n+t+e+t+n}};FB.image={filter:"img",replacement:function(e,t){var n=eqn(t.getAttribute("alt")),r=t.getAttribute("src")||"",o=eqn(t.getAttribute("title")),s=o?' "'+o+'"':"";return r?"!["+n+"]("+r+s+")":""}};rVa.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;if(t=gho(this.array,e,this.options))return t;if(t=gho(this._keep,e,this.options))return t;if(t=gho(this._remove,e,this.options))return t;return this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};oVa=typeof window<"u"?window:{};W1p=$1p()?oVa.DOMParser:q1p();X1p=Array.prototype.reduce,Q1p=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];tqn.prototype={turndown:function(e){if(!tNp(e))throw TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=sVa.call(this,new G1p(e,this.options));return Z1p.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e==="function")e(this);else throw TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return Q1p.reduce(function(t,n){return t.replace(n[0],n[1])},e)}};nNp=tqn});
export {aVa,D1p,Tho,P1p,O1p,Sho,eVa,M1p,N1p,F1p,bho,nVa,eqn,rVa,gho,B1p,U1p,_ho,XGa,$1p,q1p,G1p,V1p,K1p,z1p,j1p,Y1p,J1p,QGa,tqn,sVa,Z1p,eNp,iVa,tNp,L1p,ZGa,tVa,FB,oVa,W1p,yho,X1p,Q1p,nNp,lVa};
