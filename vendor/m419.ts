// @ts-nocheck
import {X} from "../runtime.ts";
import {e5o} from "./m378.ts";
import {Z5o} from "./m415.ts";
import {rWo} from "./m417.ts";
import {oWo} from "./m418.ts";
import {hSt} from "./m369.ts";
import {initLf} from "./m354.ts";
import {LQt} from "./m370.ts";
import {gSt} from "./m371.ts";
var rZt=X((ov,udr)=>{Object.defineProperty(ov,"__esModule",{value:!0});ov.MissingRefError=ov.ValidationError=ov.CodeGen=ov.Name=ov.nil=ov.stringify=ov.str=ov._=ov.KeywordCxt=ov.Ajv=void 0;var mHc=e5o(),fHc=Z5o(),AHc=rWo(),sWo=oWo(),hHc=["/properties"],nZt="http://json-schema.org/draft-07/schema";class ISt extends mHc.default{_addVocabularies(){if(super._addVocabularies(),fHc.default.forEach((e)=>this.addVocabulary(e)),this.opts.discriminator)this.addKeyword(AHc.default)}_addDefaultMetaSchema(){if(super._addDefaultMetaSchema(),!this.opts.meta)return;let e=this.opts.$data?this.$dataMetaSchema(sWo,hHc):sWo;this.addMetaSchema(e,nZt,!1),this.refs["http://json-schema.org/schema"]=nZt}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(nZt)?nZt:void 0)}}ov.Ajv=ISt;udr.exports=ov=ISt;udr.exports.Ajv=ISt;Object.defineProperty(ov,"__esModule",{value:!0});ov.default=ISt;var gHc=hSt();Object.defineProperty(ov,"KeywordCxt",{enumerable:!0,get:function(){return gHc.KeywordCxt}});var xVe=initLf();Object.defineProperty(ov,"_",{enumerable:!0,get:function(){return xVe._}});Object.defineProperty(ov,"str",{enumerable:!0,get:function(){return xVe.str}});Object.defineProperty(ov,"stringify",{enumerable:!0,get:function(){return xVe.stringify}});Object.defineProperty(ov,"nil",{enumerable:!0,get:function(){return xVe.nil}});Object.defineProperty(ov,"Name",{enumerable:!0,get:function(){return xVe.Name}});Object.defineProperty(ov,"CodeGen",{enumerable:!0,get:function(){return xVe.CodeGen}});var _Hc=LQt();Object.defineProperty(ov,"ValidationError",{enumerable:!0,get:function(){return _Hc.default}});var yHc=gSt();Object.defineProperty(ov,"MissingRefError",{enumerable:!0,get:function(){return yHc.default}})});
export {rZt};
