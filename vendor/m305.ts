// @ts-nocheck
import {parse,parseAsync,AQt} from "./m258.ts";
import {$ZodTuple,$ZodArray,$ZodUnknown,wEt} from "./m262.ts";
import {_tuple,_array,_unknown,_pr} from "./m304.ts";
import {b} from "../runtime.ts";
class $ZodFunction{constructor(e){this._def=e,this.def=e}implement(e){if(typeof e!=="function")throw Error("implement() must be called with a function");let t=(...n)=>{let r=this._def.input?parse(this._def.input,n,void 0,{callee:t}):n;if(!Array.isArray(r))throw Error("Invalid arguments schema: not an array or tuple schema.");let o=e(...r);return this._def.output?parse(this._def.output,o,void 0,{callee:t}):o};return t}implementAsync(e){if(typeof e!=="function")throw Error("implement() must be called with a function");let t=async(...n)=>{let r=this._def.input?await parseAsync(this._def.input,n,void 0,{callee:t}):n;if(!Array.isArray(r))throw Error("Invalid arguments schema: not an array or tuple schema.");let o=await e(...r);return this._def.output?parseAsync(this._def.output,o,void 0,{callee:t}):o};return t}input(...e){let t=this.constructor;if(Array.isArray(e[0]))return new t({type:"function",input:new $ZodTuple({type:"tuple",items:e[0],rest:e[1]}),output:this._def.output});return new t({type:"function",input:e[0],output:this._def.output})}output(e){return new this.constructor({type:"function",input:this._def.input,output:e})}}
function ren(e){return new $ZodFunction({type:"function",input:Array.isArray(e?.input)?_tuple($ZodTuple,e?.input):e?.input??_array($ZodArray,_unknown($ZodUnknown)),output:e?.output??_unknown($ZodUnknown)})}
var uVo=b(()=>{_pr();AQt();wEt();wEt()});
export {$ZodFunction,ren,uVo};
