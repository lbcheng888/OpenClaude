// @ts-nocheck
import {Q7l,Z7l} from "../core/5487_name.ts";
import {PKl,OKl} from "../core/5512_name.ts";
import {_7l,y7l} from "../artifact/5479_name.ts";
import {tzl,nzl} from "../../vendor/m5520.ts";
import {NKl,BKl} from "../../vendor/m5513.ts";
import {mzl,fzl} from "../../vendor/m5522.ts";
import {z7l,J7l} from "../agent/5486_name.ts";
import {$Kl,qKl} from "../../vendor/m5514.ts";
import {YKl,JKl} from "../artifact/5519_JKl.ts";
import {GKl,VKl} from "../../vendor/m5516.ts";
import {jKl,WKl} from "../../vendor/m5515.ts";
import {k7l,H7l} from "../mcp/5482_rawFirstToken.ts";
import {KKl,zKl} from "../../vendor/m5517.ts";
import {b7l,E7l} from "../computer-use/5480_name.ts";
import {XKl,QKl} from "../../vendor/m5519.ts";
import {LKl,MKl} from "../mcp/5513_name.ts";
import {G7l,V7l} from "./5485_name.ts";
import {Tzl,yzl} from "./5524_registerLoopSkill.ts";
import {ro,b} from "../../runtime.ts";
import {Czl,Ezl} from "../agent/5525_registerScheduleRemoteAgentsSkill.ts";
import {st} from "../../vendor/m5.ts";
import {eXl,ZJl} from "../skills/5527_registerClaudeApiSkill.ts";
import {mXl,pXl} from "../agent/5529_registerClaudeCodeSkill.ts";
import {doesEnterpriseMcpConfigExist,px} from "../telemetry/3148_unwrapCcrProxyUrl.ts";
import {C7l,v7l} from "../../vendor/m5480.ts";
import {HXl,kXl} from "../../vendor/m5530.ts";
import {NXl,MXl} from "../../vendor/m5531.ts";
import {sn} from "./0047_namespace.ts";
import {I7l} from "../../vendor/m5482.ts";
/** Registers all built-in skills once; guarded by BXl to prevent double-init. */
function WXn() {
  if (BXl) return;
  BXl = !0, Q7l(), PKl(), _7l(), tzl(), NKl(), mzl(), z7l(), $Kl(), YKl(), GKl(), jKl(), k7l(), KKl(), b7l(), XKl(), LKl(), G7l();
  let {
    registerLoopSkill: registerLoopSkill
  } = (Tzl(), ro(yzl));
  registerLoopSkill();
  let {
    registerScheduleRemoteAgentsSkill: registerScheduleRemoteAgentsSkill
  } = (Czl(), ro(Ezl));
  if (registerScheduleRemoteAgentsSkill(), !st(process.env.CLAUDE_CODE_DISABLE_CLAUDE_API_SKILL)) {
    let {
      registerClaudeApiSkill: registerClaudeApiSkill
    } = (eXl(), ro(ZJl));
    registerClaudeApiSkill();
  }
  if (!st(process.env.CLAUDE_CODE_DISABLE_CLAUDE_CODE_SKILL)) {
    let {
      registerClaudeCodeSkill: registerClaudeCodeSkill
    } = (mXl(), ro(pXl));
    registerClaudeCodeSkill();
  }
  if (!doesEnterpriseMcpConfigExist()) C7l();
  let {
      registerRunSkill: registerRunSkill
    } = (HXl(), ro(kXl)),
    {
      registerRunSkillGeneratorSkill: registerRunSkillGeneratorSkill
    } = (NXl(), ro(MXl));
  registerRunSkill(), registerRunSkillGeneratorSkill();
}

/** Whether WXn has already been called (init guard). */
var BXl = !1;

/** Lazy module initializer for skill registration dependencies. */
var VLo = b(() => {
  px();
  sn();
  y7l();
  E7l();
  v7l();
  H7l();
  I7l();
  V7l();
  J7l();
  Z7l();
  OKl();
  MKl();
  BKl();
  qKl();
  WKl();
  VKl();
  zKl();
  JKl();
  QKl();
  nzl();
  fzl();
});
export {WXn,BXl,VLo};
