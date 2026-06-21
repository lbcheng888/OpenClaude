// @ts-nocheck
import {QY,Lce,S_e} from "./m4169.ts";
import {O9n} from "./m4170.ts";
import {ado} from "./m4171.ts";
import {b,M} from "../runtime.ts";
import {Xt,Le} from "../src/config/0228_encoding.ts";
function YIe(e){return Object.setPrototypeOf(e,null),delete e.constructor,delete e.prototype,e}
function N9n(e){M9n.runInContext(JIp,e)}
function p6a(e){let t=new Set,n=(r)=>r();return e?.addEventListener("abort",()=>{for(let r of t)clearTimeout(r);t.clear()},{once:!0}),{setTimeout:QY((r,o)=>{if(e?.aborted)return 0;let s=Number(setTimeout(()=>{try{n(r)}catch{}},o));return t.add(s),s}),clearTimeout:QY((r)=>{t.delete(r),clearTimeout(r)}),bindVMInvoke:(r)=>{n=r}}}
function XIp(e){let{parse:t}=O9n(),n=ado(),r=`(async () => {'use strict';
`,o=`(async () => {'use strict';
${e}
})()`,s=t(o,{ecmaVersion:"latest",sourceType:"script",allowHashBang:!0});n.full(s,(u)=>{if(u.name?.startsWith(im))throw SyntaxError(`Identifier '${u.name}' is reserved.`);if(u.type==="WithStatement")throw SyntaxError("'with' statements are not supported in workflow scripts.")});let i=[],a=(u)=>{if(!u)return;i.push([u.start,` ${im}((`],[u.end,"))"])},l=(u)=>{for(let d=u.length-2;d>=0;d--){let p=u[d];if(p&&(p.type==="FunctionDeclaration"||p.type==="FunctionExpression"||p.type==="ArrowFunctionExpression"))return p}return};if(n.ancestor(s,{VariableDeclaration(u){if(u.kind==="await using")throw SyntaxError("'await using' declarations are not supported in workflow scripts.")},AwaitExpression(u){a(u.argument)},ArrowFunctionExpression(u){if(u.async&&u.expression)a(u.body)},ForOfStatement(u){if(u.await)i.push([u.right.start,` ${im}a((`],[u.right.end,"))"])},ReturnStatement(u,d,p){let m=l(p);if(!m?.async)return;if(m.generator){if(u.argument)i.push([u.argument.start,` await ${im}((`],[u.argument.end,"))"])}else a(u.argument)},YieldExpression(u,d,p){let m=l(p);if(!(m?.async&&m.generator))return;if(u.delegate){if(u.argument)i.push([u.argument.start,` ${im}a((`],[u.argument.end,"))"])}else a(u.argument)}}),i.length===0)return e;i.sort((u,d)=>d[0]-u[0]);let c=o;for(let[u,d]of i)c=c.slice(0,u)+d+c.slice(u);return c.slice(28,c.length-5)}
function F9n(e){try{Function(`async function _check() {'use strict';
${e}
}`);let t=XIp(e),n=`((${im} => ((${im}a) => async () => {'use strict';
${t}
})(${im}it => ({[Symbol.asyncIterator](){const ${im}ai = ${im}it[Symbol.asyncIterator];if (${im}ai != null && typeof ${im}ai !== 'function') throw new TypeError('@@asyncIterator is not a function');const ${im}i = ${im}ai != null ? ${im}ai.call(${im}it) : ${im}it[Symbol.iterator]();if (${im}i === null || (typeof ${im}i !== 'object' && typeof ${im}i !== 'function')) throw new TypeError('Iterator is not an object');const ${im}nxt = ${im}i.next;if (typeof ${im}nxt !== 'function') throw new TypeError('Iterator.next is not a function');const ${im}ret = ${im}i.return;const ${im}thr = ${im}i.throw;const ${im}w = s => ${im}(s).then(s => { if (s === null || (typeof s !== 'object' && typeof s !== 'function')) throw new TypeError('Iterator result is not an object'); const done = s.done; return ${im}(s.value).then(value => ({value, done})) });return {next:v=>${im}w(${im}nxt.call(${im}i,v)),return:v=>${im}w(typeof ${im}ret==='function'?${im}ret.call(${im}i,v):{value:v,done:true}),throw:e=>typeof ${im}thr==='function'?${im}w(${im}thr.call(${im}i,e)):${im}(typeof ${im}ret==='function'?${im}ret.call(${im}i):undefined).then(()=>{throw new TypeError('The iterator does not provide a throw method')})}}})))(Promise.resolve.bind(Promise)))()`;return{ok:!0,vmScript:new M9n.Script(n,{filename:"workflow.js",importModuleDynamically:()=>{throw Lce("import() is not available in workflow scripts.")}})}}catch(t){return{ok:!1,error:`SyntaxError: ${t instanceof Error?t.message:String(t)}`}}}
var M9n,zIp="Date.now() / new Date() are unavailable in workflow scripts (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.",YIp="Math.random() is unavailable in workflow scripts (breaks resume). For N independent samples, include the index in the agent label or prompt.",JIp,B9n=30000,im="__wRg$";
var Out=b(()=>{Xt();S_e();M9n=M(require("vm"));JIp=`(() => {
      const NOW_ERR = ${Le(zIp)};
      const RANDOM_ERR = ${Le(YIp)};
      Math.random = function random() { throw new Error(RANDOM_ERR) };
      const RealDate = Date;
      RealDate.now = function now() { throw new Error(NOW_ERR) };
      function ShimDate(...a) {
        if (!new.target) throw new Error(NOW_ERR); // bare Date() \u2192 now-string
        if (a.length === 0) throw new Error(NOW_ERR);
        return Reflect.construct(RealDate, a, new.target);
      }
      ShimDate.now = RealDate.now;
      ShimDate.parse = RealDate.parse;
      ShimDate.UTC = RealDate.UTC;
      ShimDate.prototype = RealDate.prototype;
      // Close the (new Date(x)).constructor backdoor to RealDate.now \u2014 point
      // .constructor at the shim, then freeze RealDate so it can't be undone.
      RealDate.prototype.constructor = ShimDate;
      Object.freeze(RealDate);
      globalThis.Date = ShimDate;
    })()`});
export {YIe,N9n,p6a,XIp,F9n,M9n,zIp,YIp,JIp,B9n,im,Out};
