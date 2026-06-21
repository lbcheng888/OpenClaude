// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {$4a} from "./m4149.ts";
var Q4a={};
isFullscreenWithTTY(Q4a,{default:()=>FHp});
function AHp(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)if(n.hasOwnProperty(r))e[r]=n[r]}return e}
function Iuo(e,t){return Array(t+1).join(e)}
function hHp(e){return e.replace(/^\n*/,"")}
function gHp(e){var t=e.length;while(t>0&&e[t-1]===`
`)t--;return e.substring(0,t)}
function Duo(e){return Puo(e,_Hp)}
function G4a(e){return Puo(e,W4a)}
function yHp(e){return K4a(e,W4a)}
function THp(e){return Puo(e,V4a)}
function SHp(e){return K4a(e,V4a)}
function Puo(e,t){return t.indexOf(e.nodeName)>=0}
function K4a(e,t){return e.getElementsByTagName&&t.some(function(n){return e.getElementsByTagName(n).length})}
function n9n(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}
function z4a(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}
function xuo(e,t,n){for(var r=0;r<e.length;r++){var o=e[r];if(bHp(o,t,n))return o}return}
function bHp(e,t,n){var r=e.filter;if(typeof r==="string"){if(r===t.nodeName.toLowerCase())return!0}else if(Array.isArray(r)){if(r.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof r==="function"){if(r.call(e,t,n))return!0}else throw TypeError("`filter` needs to be a string, array, or function")}
function EHp(e){var{element:t,isBlock:n,isVoid:r}=e,o=e.isPre||function(d){return d.nodeName==="PRE"};if(!t.firstChild||o(t))return;var s=null,i=!1,a=null,l=q4a(a,t,o);while(l!==t){if(l.nodeType===3||l.nodeType===4){var c=l.data.replace(/[ \r\n\t]+/g," ");if((!s||/ $/.test(s.data))&&!i&&c[0]===" ")c=c.substr(1);if(!c){l=kuo(l);continue}l.data=c,s=l}else if(l.nodeType===1){if(n(l)||l.nodeName==="BR"){if(s)s.data=s.data.replace(/ $/,"");s=null,i=!1}else if(r(l)||o(l))s=null,i=!0;else if(s)i=!1}else{l=kuo(l);continue}var u=q4a(a,l,o);a=l,l=u}if(s){if(s.data=s.data.replace(/ $/,""),!s.data)kuo(s)}}
function kuo(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}
function q4a(e,t,n){if(e&&e.parentNode===t||n(t))return t.nextSibling||t.parentNode;return t.firstChild||t.nextSibling||t.parentNode}
function CHp(){var e=Y4a.DOMParser,t=!1;try{if(new e().parseFromString("","text/html"))t=!0}catch(n){}return t}
function vHp(){var e=function(){};{var t=$4a();e.prototype.parseFromString=function(n){return t.createDocument(n)}}return e}
function RHp(e,t){var n;if(typeof e==="string"){var r=xHp().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");n=r.getElementById("turndown-root")}else n=e.cloneNode(!0);return EHp({element:n,isBlock:Duo,isVoid:G4a,isPre:t.preformattedCode?kHp:null}),n}
function xHp(){return Huo=Huo||new wHp,Huo}
function kHp(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}
function HHp(e,t){return e.isBlock=Duo(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=IHp(e),e.flankingWhitespace=DHp(e,t),e}
function IHp(e){return!G4a(e)&&!THp(e)&&/^\s*$/i.test(e.textContent)&&!yHp(e)&&!SHp(e)}
function DHp(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var n=PHp(e.textContent);if(n.leadingAscii&&j4a("left",e,t))n.leading=n.leadingNonAscii;if(n.trailingAscii&&j4a("right",e,t))n.trailing=n.trailingNonAscii;return{leading:n.leading,trailing:n.trailing}}
function PHp(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}
function j4a(e,t,n){var r,o,s;if(e==="left")r=t.previousSibling,o=/ $/;else r=t.nextSibling,o=/^ /;if(r){if(r.nodeType===3)s=o.test(r.nodeValue);else if(n.preformattedCode&&r.nodeName==="CODE")s=!1;else if(r.nodeType===1&&!Duo(r))s=o.test(r.textContent)}return s}
function r9n(e){if(!(this instanceof r9n))return new r9n(e);var t={rules:_U,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(n,r){return r.isBlock?`

`:""},keepReplacement:function(n,r){return r.isBlock?`

`+r.outerHTML+`

`:r.outerHTML},defaultReplacement:function(n,r){return r.isBlock?`

`+n+`

`:n}};this.options=AHp({},t,e),this.rules=new z4a(this.options)}
function J4a(e){var t=this;return OHp.call(e.childNodes,function(n,r){r=new HHp(r,t.options);var o="";if(r.nodeType===3)o=r.isCode?r.nodeValue:t.escape(r.nodeValue);else if(r.nodeType===1)o=NHp.call(t,r);return X4a(n,o)},"")}
function MHp(e){var t=this;return this.rules.forEach(function(n){if(typeof n.append==="function")e=X4a(e,n.append(t.options))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}
function NHp(e){var t=this.rules.forNode(e),n=J4a.call(this,e),r=e.flankingWhitespace;if(r.leading||r.trailing)n=n.trim();return r.leading+t.replacement(n,e,this.options)+r.trailing}
function X4a(e,t){var n=gHp(e),r=hHp(t),o=Math.max(e.length-n.length,t.length-r.length),s=`

`.substring(0,o);return n+s+r}
function BHp(e){return e!=null&&(typeof e==="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}
var _Hp,W4a,V4a,_U,Y4a,wHp,Huo,OHp,LHp,FHp;
var Z4a=b(()=>{_Hp=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];W4a=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];V4a=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];_U={};_U.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};_U.lineBreak={filter:"br",replacement:function(e,t,n){return n.br+`
`}};_U.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,n){var r=Number(t.nodeName.charAt(1));if(n.headingStyle==="setext"&&r<3){var o=Iuo(r===1?"=":"-",e.length);return`

`+e+`
`+o+`

`}else return`

`+Iuo("#",r)+" "+e+`

`}};_U.blockquote={filter:"blockquote",replacement:function(e){return e=e.replace(/^\n+|\n+$/g,""),e=e.replace(/^/gm,"> "),`

`+e+`

`}};_U.list={filter:["ul","ol"],replacement:function(e,t){var n=t.parentNode;if(n.nodeName==="LI"&&n.lastElementChild===t)return`
`+e;else return`

`+e+`

`}};_U.listItem={filter:"li",replacement:function(e,t,n){e=e.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var r=n.bulletListMarker+"   ",o=t.parentNode;if(o.nodeName==="OL"){var s=o.getAttribute("start"),i=Array.prototype.indexOf.call(o.children,t);r=(s?Number(s)+i:i+1)+".  "}return r+e+(t.nextSibling&&!/\n$/.test(e)?`
`:"")}};_U.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};_U.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,n){var r=t.firstChild.getAttribute("class")||"",o=(r.match(/language-(\S+)/)||[null,""])[1],s=t.firstChild.textContent,i=n.fence.charAt(0),a=3,l=new RegExp("^"+i+"{3,}","gm"),c;while(c=l.exec(s))if(c[0].length>=a)a=c[0].length+1;var u=Iuo(i,a);return`

`+u+o+`
`+s.replace(/\n$/,"")+`
`+u+`

`}};_U.horizontalRule={filter:"hr",replacement:function(e,t,n){return`

`+n.hr+`

`}};_U.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var n=t.getAttribute("href");if(n)n=n.replace(/([()])/g,"\\$1");var r=n9n(t.getAttribute("title"));if(r)r=' "'+r.replace(/"/g,"\\\"")+'"';return"["+e+"]("+n+r+")"}};_U.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,n){var r=t.getAttribute("href"),o=n9n(t.getAttribute("title"));if(o)o=' "'+o+'"';var s,i;switch(n.linkReferenceStyle){case"collapsed":s="["+e+"][]",i="["+e+"]: "+r+o;break;case"shortcut":s="["+e+"]",i="["+e+"]: "+r+o;break;default:var a=this.references.length+1;s="["+e+"]["+a+"]",i="["+a+"]: "+r+o}return this.references.push(i),s},references:[],append:function(e){var t="";if(this.references.length)t=`

`+this.references.join(`
`)+`

`,this.references=[];return t}};_U.emphasis={filter:["em","i"],replacement:function(e,t,n){if(!e.trim())return"";return n.emDelimiter+e+n.emDelimiter}};_U.strong={filter:["strong","b"],replacement:function(e,t,n){if(!e.trim())return"";return n.strongDelimiter+e+n.strongDelimiter}};_U.code={filter:function(e){var t=e.previousSibling||e.nextSibling,n=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!n},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",n="`",r=e.match(/`+/gm)||[];while(r.indexOf(n)!==-1)n=n+"`";return n+t+e+t+n}};_U.image={filter:"img",replacement:function(e,t){var n=n9n(t.getAttribute("alt")),r=t.getAttribute("src")||"",o=n9n(t.getAttribute("title")),s=o?' "'+o+'"':"";return r?"!["+n+"]("+r+s+")":""}};z4a.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;if(t=xuo(this.array,e,this.options))return t;if(t=xuo(this._keep,e,this.options))return t;if(t=xuo(this._remove,e,this.options))return t;return this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};Y4a=typeof window<"u"?window:{};wHp=CHp()?Y4a.DOMParser:vHp();OHp=Array.prototype.reduce,LHp=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];r9n.prototype={turndown:function(e){if(!BHp(e))throw TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=J4a.call(this,new RHp(e,this.options));return MHp.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e==="function")e(this);else throw TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return LHp.reduce(function(t,n){return t.replace(n[0],n[1])},e)}};FHp=r9n});
export {Q4a,AHp,Iuo,hHp,gHp,Duo,G4a,yHp,THp,SHp,Puo,K4a,n9n,z4a,xuo,bHp,EHp,kuo,q4a,CHp,vHp,RHp,xHp,kHp,HHp,IHp,DHp,PHp,j4a,r9n,J4a,MHp,NHp,X4a,BHp,_Hp,W4a,V4a,_U,Y4a,wHp,Huo,OHp,LHp,FHp,Z4a};
