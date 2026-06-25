// @ts-nocheck
import {Q} from "../runtime.ts";
import {Yzo} from "./m380.ts";
import {jjo} from "./m417.ts";
import {Qjo} from "./m419.ts";
import {Zjo} from "./m420.ts";
import {qCt} from "./m371.ts";
import {Km} from "./m356.ts";
import {ftn} from "./m372.ts";
import {WCt} from "./m373.ts";
var Mtn=Q((uA,Nhr)=>{Object.defineProperty(uA,"__esModule",{value:!0});uA.MissingRefError=uA.ValidationError=uA.CodeGen=uA.Name=uA.nil=uA.stringify=uA.str=uA._=uA.KeywordCxt=uA.Ajv=void 0;var _Fc=Yzo(),yFc=jjo(),TFc=Qjo(),eYo=Zjo(),SFc=["/properties"],Ltn="http://json-schema.org/draft-07/schema";class rAt extends _Fc.default{_addVocabularies(){if(super._addVocabularies(),yFc.default.forEach((e)=>this.addVocabulary(e)),this.opts.discriminator)this.addKeyword(TFc.default)}_addDefaultMetaSchema(){if(super._addDefaultMetaSchema(),!this.opts.meta)return;let e=this.opts.$data?this.$dataMetaSchema(eYo,SFc):eYo;this.addMetaSchema(e,Ltn,!1),this.refs["http://json-schema.org/schema"]=Ltn}defaultMeta(){return this.opts.defaultMeta=super.defaultMeta()||(this.getSchema(Ltn)?Ltn:void 0)}}uA.Ajv=rAt;Nhr.exports=uA=rAt;Nhr.exports.Ajv=rAt;Object.defineProperty(uA,"__esModule",{value:!0});uA.default=rAt;var bFc=qCt();Object.defineProperty(uA,"KeywordCxt",{enumerable:!0,get:function(){return bFc.KeywordCxt}});var vze=Km();Object.defineProperty(uA,"_",{enumerable:!0,get:function(){return vze._}});Object.defineProperty(uA,"str",{enumerable:!0,get:function(){return vze.str}});Object.defineProperty(uA,"stringify",{enumerable:!0,get:function(){return vze.stringify}});Object.defineProperty(uA,"nil",{enumerable:!0,get:function(){return vze.nil}});Object.defineProperty(uA,"Name",{enumerable:!0,get:function(){return vze.Name}});Object.defineProperty(uA,"CodeGen",{enumerable:!0,get:function(){return vze.CodeGen}});var EFc=ftn();Object.defineProperty(uA,"ValidationError",{enumerable:!0,get:function(){return EFc.default}});var CFc=WCt();Object.defineProperty(uA,"MissingRefError",{enumerable:!0,get:function(){return CFc.default}})});
export {Mtn};
