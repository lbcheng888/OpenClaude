// @ts-nocheck
import {NY,kce,Uye} from "./m4181.ts";
import {Dqn} from "./m4182.ts";
import {Gho} from "./m4183.ts";
import {b,x} from "../runtime.ts";
import {tn,TeamDeleteToolName} from "../src/config/0230_encoding.ts";
function $xe(e){return Object.setPrototypeOf(e,null),delete e.constructor,delete e.prototype,e}
function Lqn(e){Oqn.runInContext(pFp,e)}
function _Ka(e){let t=new Set,n=(r)=>r();return e?.addEventListener("abort",()=>{for(let r of t)clearTimeout(r);t.clear()},{once:!0}),{setTimeout:NY((r,o)=>{if(e?.aborted)return 0;let s=Number(setTimeout(()=>{try{n(r)}catch{}},o));return t.add(s),s}),clearTimeout:NY((r)=>{t.delete(r),clearTimeout(r)}),bindVMInvoke:(r)=>{n=r}}}
function mFp(e){let{parse:t}=Dqn(),n=Gho(),r=`(async () => {'use strict';
`,o=`(async () => {'use strict';
${e}
})()`,s=t(o,{ecmaVersion:"latest",sourceType:"script",allowHashBang:!0});n.full(s,(u)=>{if(u.name?.startsWith(wp))throw SyntaxError(`Identifier '${u.name}' is reserved.`);if(u.type==="WithStatement")throw SyntaxError("'with' statements are not supported in workflow scripts.")});let i=[],a=(u)=>{if(!u)return;i.push([u.start,` ${wp}((`],[u.end,"))"])},l=(u)=>{for(let d=u.length-2;d>=0;d--){let p=u[d];if(p&&(p.type==="FunctionDeclaration"||p.type==="FunctionExpression"||p.type==="ArrowFunctionExpression"))return p}return};if(n.ancestor(s,{VariableDeclaration(u){if(u.kind==="await using")throw SyntaxError("'await using' declarations are not supported in workflow scripts.")},AwaitExpression(u){a(u.argument)},ArrowFunctionExpression(u){if(u.async&&u.expression)a(u.body)},ForOfStatement(u){if(u.await)i.push([u.right.start,` ${wp}a((`],[u.right.end,"))"])},ReturnStatement(u,d,p){let m=l(p);if(!m?.async)return;if(m.generator){if(u.argument)i.push([u.argument.start,` await ${wp}((`],[u.argument.end,"))"])}else a(u.argument)},YieldExpression(u,d,p){let m=l(p);if(!(m?.async&&m.generator))return;if(u.delegate){if(u.argument)i.push([u.argument.start,` ${wp}a((`],[u.argument.end,"))"])}else a(u.argument)}}),i.length===0)return e;i.sort((u,d)=>d[0]-u[0]);let c=o;for(let[u,d]of i)c=c.slice(0,u)+d+c.slice(u);return c.slice(28,c.length-5)}
function Ppt(e){try{Function(`async function _check() {'use strict';
${e}
}`);let t=mFp(e),n=`((${wp} => ((${wp}a) => async () => {'use strict';
${t}
})(${wp}it => ({[Symbol.asyncIterator](){const ${wp}ai = ${wp}it[Symbol.asyncIterator];if (${wp}ai != null && typeof ${wp}ai !== 'function') throw new TypeError('@@asyncIterator is not a function');const ${wp}i = ${wp}ai != null ? ${wp}ai.call(${wp}it) : ${wp}it[Symbol.iterator]();if (${wp}i === null || (typeof ${wp}i !== 'object' && typeof ${wp}i !== 'function')) throw new TypeError('Iterator is not an object');const ${wp}nxt = ${wp}i.next;if (typeof ${wp}nxt !== 'function') throw new TypeError('Iterator.next is not a function');const ${wp}ret = ${wp}i.return;const ${wp}thr = ${wp}i.throw;const ${wp}w = s => ${wp}(s).then(s => { if (s === null || (typeof s !== 'object' && typeof s !== 'function')) throw new TypeError('Iterator result is not an object'); const done = s.done; return ${wp}(s.value).then(value => ({value, done})) });return {next:v=>${wp}w(${wp}nxt.call(${wp}i,v)),return:v=>${wp}w(typeof ${wp}ret==='function'?${wp}ret.call(${wp}i,v):{value:v,done:true}),throw:e=>typeof ${wp}thr==='function'?${wp}w(${wp}thr.call(${wp}i,e)):${wp}(typeof ${wp}ret==='function'?${wp}ret.call(${wp}i):undefined).then(()=>{throw new TypeError('The iterator does not provide a throw method')})}}})))(Promise.resolve.bind(Promise)))()`;return{ok:!0,vmScript:new Oqn.Script(n,{filename:"workflow.js",importModuleDynamically:()=>{throw kce("import() is not available in workflow scripts.")}})}}catch(t){return{ok:!1,error:`SyntaxError: ${t instanceof Error?t.message:String(t)}`}}}
var Oqn,uFp="Date.now() / new Date() are unavailable in workflow scripts (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.",dFp="Math.random() is unavailable in workflow scripts (breaks resume). For N independent samples, include the index in the agent label or prompt.",pFp,Mqn=30000,wp="__wRg$";
var m5e=b(()=>{tn();Uye();Oqn=x(require("vm"));pFp=`(() => {
      const NOW_ERR = ${TeamDeleteToolName(uFp)};
      const RANDOM_ERR = ${TeamDeleteToolName(dFp)};
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
export {$xe,Lqn,_Ka,mFp,Ppt,Oqn,uFp,dFp,pFp,Mqn,wp,m5e};
