// @ts-nocheck
import {logEvent as c,kt as v_} from "../../vendor/m132.ts";
import {Le as QH} from "../../vendor/m5.ts";
import {xr as a8,QT as LJ} from "../../vendor/m1461.ts";
import {A8 as zg,vu as D3} from "../mcp/2200_mcpServerName.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
async function logUnaryEvent(options) {
  c("tengu_unary_event", {
    event: QH(options.event),
    completion_type: QH(options.completion_type),
    language_name: await options.metadata.language_name,
    message_id: a8(options.metadata.message_id),
    platform: zg(options.metadata.platform),
    ...(options.metadata.hasFeedback !== undefined && {
      hasFeedback: options.metadata.hasFeedback
    })
  });
}
var ZkK = L(() => {
  v_();
  D3();
  LJ();
});
export {logUnaryEvent as Pho,ZkK as HVa};
