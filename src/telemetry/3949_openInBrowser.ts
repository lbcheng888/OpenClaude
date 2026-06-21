// @ts-nocheck
import {fo as Dq} from "../../vendor/m566.ts";
import {getSubscriptionType,isOverageProvisioningAllowed,Ao as Xq} from "../config/2031_withOAuthRefreshLock.ts";
import {WD as xh,_me as NOH} from "../../vendor/m1285.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as j_,zn as t6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {ra as TK,Ap as isLocalAgentTask} from "../config/0614_Ap.ts";
import {Cw as Gy,LB as Bm} from "../../vendor/m1284.ts";
import {bae as r7H,dnt as j__} from "../../vendor/m2751.ts";
import {logForDebugging,qe as UH} from "../config/0234_setHasFormattedOutput.ts";
import {WMa as hashWord,jMa as isHarborPermissionsEnabled,qMa as hashWordRaw,GMa as serializeShort} from "../../vendor/m3947.ts";
import {K_ as mA,Se as ZH,bt as allTools} from "../../vendor/m195.ts";
import {De as SH,Rn as y6} from "../session/0615_length.ts";
import {Oc as k1,b_ as JA} from "../../vendor/m2039.ts";
import {b as L} from "../../runtime.ts";
import {Gp as iO} from "../../vendor/m567.ts";
// @ts-nocheck
// 使用额度/用量信用额度管理模块:检查订阅类型、请求管理员增加额度、
// 打开浏览器到用量设置页,以及相关的 Axios 错误信息提取。

// 跨模块依赖(混淆名保持,编译期擦除)
declare const Dq: any; // Axios 实例/类
declare const getSubscriptionType: () => string | null;
declare const isOverageProvisioningAllowed: () => boolean;
declare const Xq: any;
declare const xh: () => string | null; // 返回当前 org UUID(可为 null)
declare const NOH: any;
declare const j_: (key: string, defaultValue: any) => any;
declare const t6: any;
declare const TK: () => boolean;
declare const isLocalAgentTask: () => boolean;
declare const Gy: () => boolean; // 是否是 org admin
declare const Bm: any;
declare const r7H: () => Promise<any>; // 获取使用量信息
declare const j__: any;
declare const logForDebugging: (msg: string, opts?: any) => void;
declare const UH: any;
declare const hashWord: (action: string) => Promise<any>;
declare const isHarborPermissionsEnabled: (action: string, statuses: string[]) => Promise<any[] | null>;
declare const hashWordRaw: (body: any) => Promise<void>;
declare const serializeShort: any;
declare const mA: (err: any, predicate: (e: any) => any) => boolean;
declare const ZH: (err: any) => string;
declare const allTools: any;
declare const SH: (err: any) => void;
declare const y6: any;
declare const k1: (url: string) => Promise<boolean>;
declare const JA: any;
declare const L: (init: () => void) => any;
declare const iO: any;

/** 从 Axios 错误响应中提取可读的错误消息字符串 */
function extractAxiosErrorMessage(err: any): string | null {
  if (!Dq.isAxiosError(err)) return null;
  let statusCode = err.response?.status;
  if (typeof statusCode !== "number" || statusCode >= 500) return null;
  let responseData = err.response?.data;
  if (!responseData || typeof responseData !== "object") return null;
  let typedData = responseData,
    errorObj = typedData.error;
  if (errorObj && typeof errorObj === "object") {
    let errorMsg = errorObj.message;
    if (typeof errorMsg === "string" && errorMsg.length > 0) return errorMsg;
  }
  for (let fieldName of ["message", "detail"]) {
    let fieldValue = typedData[fieldName];
    if (typeof fieldValue === "string" && fieldValue.length > 0) return fieldValue;
  }
  return null;
}

/** 检查当前用户是否可以触发超额使用申请 */
function canRequestOverageProvision(): boolean {
  {
    let subscriptionType = getSubscriptionType(),
      hasOrgAccess = xh() !== null,
      hasEmberLatch = j_("tengu_ember_latch", !1) || hasOrgAccess,
      canProvision =
        hasOrgAccess ||
        ((subscriptionType === "pro" || subscriptionType === "max") &&
          isOverageProvisioningAllowed() &&
          !TK());
    return hasEmberLatch && canProvision;
  }
  return !1;
}

/**
 * 处理使用量超额请求或打开用量管理页。
 * - team/enterprise 用户:尝试向管理员发送申请
 * - 其他用户:直接打开浏览器到用量设置页
 */
async function openUsageManagementPage(opts: { openInBrowser: boolean } = { openInBrowser: !0 }): Promise<{
  type: "message" | "browser-opened";
  value?: string;
  url?: string;
  opened?: boolean;
}> {
  let subscriptionType = getSubscriptionType(),
    isOrgAccount = subscriptionType === "team" || subscriptionType === "enterprise";
  if (!Gy() && isOrgAccount) {
    let extraUsage: any;
    try {
      extraUsage = (await r7H())?.extra_usage;
    } catch (err) {
      logForDebugging(`extra-usage: fetchUtilization failed, falling through to ask user: ${err}`, {
        level: "error",
      });
    }
    if (extraUsage?.is_enabled && extraUsage.monthly_limit === null)
      return {
        type: "message",
        value: "Your organization already has unlimited usage credits. No request needed.",
      };
    try {
      if ((await hashWord("limit_increase"))?.is_allowed === !1)
        return { type: "message", value: "Contact your admin to manage usage credit settings." };
    } catch (err) {
      logForDebugging(`Extra usage eligibility check failed: ${err}`, { level: "error" });
    }
    try {
      let pendingRequests = await isHarborPermissionsEnabled("limit_increase", ["pending", "dismissed"]);
      if (pendingRequests && pendingRequests.length > 0)
        return {
          type: "message",
          value: "You've already sent a usage credit request to your admin.",
        };
    } catch (err) {
      logForDebugging(`Failed to fetch pending admin requests: ${err}`, { level: "error" });
    }
    try {
      return (
        await hashWordRaw({ request_type: "limit_increase", details: null }),
        {
          type: "message",
          value: extraUsage?.is_enabled
            ? "Request sent to your admin to increase your usage credit limit."
            : "Request sent to your admin to turn on usage credits.",
        }
      );
    } catch (err) {
      let axiosMsg = extractAxiosErrorMessage(err);
      if (mA(err, (e) => extractAxiosErrorMessage(e) !== null))
        logForDebugging(`Admin request rejected: ${axiosMsg ?? ZH(err)}`, { level: "error" });
      else SH(err);
      if (axiosMsg) return { type: "message", value: axiosMsg };
    }
    return { type: "message", value: "Contact your admin to manage usage credit settings." };
  }
  let settingsUrl = isOrgAccount
    ? "https://claude.ai/admin-settings/usage"
    : "https://claude.ai/settings/usage";
  if (!opts.openInBrowser) return { type: "browser-opened", url: settingsUrl, opened: !1 };
  try {
    let browserOpened = await k1(settingsUrl);
    return { type: "browser-opened", url: settingsUrl, opened: browserOpened };
  } catch (err) {
    return (
      logForDebugging(`Failed to open browser for ${settingsUrl}: ${err}`, { level: "error" }),
      {
        type: "message",
        value: `Couldn't open your browser. Visit ${settingsUrl} to manage usage credits.`,
      }
    );
  }
}

var YC6 = L(() => {
  iO();
  t6();
  serializeShort();
  j__();
  NOH();
  Xq();
  Bm();
  JA();
  UH();
  allTools();
  y6();
  isLocalAgentTask();
});

export {extractAxiosErrorMessage as VMa,canRequestOverageProvision as CUn,openUsageManagementPage as cct,YC6 as vUn};
