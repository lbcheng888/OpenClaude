// @ts-nocheck
import {Fme,$mn} from "./m1465.ts";
import {pFe,eHt} from "./m1479.ts";
import {He,Pt,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
function w8s(e,t){let n={name:`${e.name}-with-${t.name}-fallback`,read(){let r=e.read();if(r!==null&&r!==void 0)return r;return t.read()||{}},async readAsync(){let r=await e.readAsync();if(r!==null&&r!==void 0)return r;return await t.readAsync()||{}},async readAsyncStrict(){let r=await(e.readAsyncStrict?.()??e.readAsync());if(r===Fme)return Fme;if(r!==null)return r;return await(t.readAsyncStrict?.()??t.readAsync())||{}},invalidateCache(){e.invalidateCache?.(),t.invalidateCache?.()},mutate(r){return pFe(n,r)},async update(r){let o=await e.readAsync(),s=await e.update(r);if(s.success){if(o===null)await t.delete();return He("secure_storage_credentials_write"),s}if(s.transient)return Pt("secure_storage_credentials_write","primary_transient_skip_fallback"),s;let i=await t.update(r);if(i.success){if(o!==null)await e.delete();return Pt("secure_storage_credentials_write","plaintext_fallback_used"),{success:!0,warning:i.warning}}return xe("secure_storage_credentials_write","primary_and_fallback_failed"),{success:!1}},async delete(){let r=await t.readAsync()!==null,[o,s]=await Promise.all([e.delete(),t.delete()]);return o||r&&s}};return n}
var k8s=b(()=>{mn();$mn();eHt()});
export {w8s,k8s};
