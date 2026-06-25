// @ts-nocheck
import {ho} from "../../vendor/m572.ts";
import {getSubscriptionType as vi,isOverageProvisioningAllowed as MRe,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {iI,qoe} from "../../vendor/m1290.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Vi,$d} from "../config/0620_$d.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {bae,_ge} from "./2750_title.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {h3a,f3a,m3a,g3a} from "../../vendor/m4014.ts";
import {__export as j_,Ce,Ct} from "../../vendor/m197.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {b} from "../../runtime.ts";
import {ap} from "../../vendor/m573.ts";
// 使用额度/用量信用额度管理模块:检查订阅类型、请求管理员增加额度、
// 打开浏览器到用量设置页,以及相关的 Axios 错误信息提取。

/** 从 Axios 错误响应中提取可读的错误消息字符串 */
function extractAxiosErrorMessage(err: any): string | null {
  if (!ho.isAxiosError(err)) return null;
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
    let subscriptionType = vi(),
      hasOrgAccess = iI() !== null,
      hasEmberLatch = it("tengu_ember_latch", !1) || hasOrgAccess,
      canProvision =
        hasOrgAccess ||
        ((subscriptionType === "pro" || subscriptionType === "max") && MRe() && !Vi());
    return hasEmberLatch && canProvision;
  }
  return !1;
}

/**
 * 处理使用量超额请求或打开用量管理页。
 * - team/enterprise 用户:尝试向管理员发送申请
 * - 其他用户:直接打开浏览器到用量设置页
 */
async function openUsageManagementPage(opts: { openInBrowser: boolean } = {
  openInBrowser: !0
}): Promise<{
  type: "message" | "browser-opened";
  value?: string;
  url?: string;
  opened?: boolean;
}> {
  let subscriptionType = vi(),
    isOrgAccount = subscriptionType === "team" || subscriptionType === "enterprise";
  if (!oE() && isOrgAccount) {
    let extraUsage: any;
    try {
      extraUsage = (await bae())?.extra_usage;
    } catch (err) {
      A(`extra-usage: fetchUtilization failed, falling through to ask user: ${err}`, {
        level: "error"
      });
    }
    switch (extraUsage?.disabled_reason) {
      case "out_of_credits":
        return {
          type: "message",
          value: "Your organization is out of usage credits. Contact your admin to add more."
        };
      case "org_level_disabled_until":
      case "org_spend_cap_reached":
        return {
          type: "message",
          value: "Your organization's usage credit cap is reached for this period. Contact your admin to raise it."
        };
      default:
    }
    if (extraUsage?.is_enabled && extraUsage.monthly_limit === null) return {
      type: "message",
      value: "Your organization already has unlimited usage credits. No request needed."
    };
    try {
      if ((await h3a("limit_increase"))?.is_allowed === !1) return {
        type: "message",
        value: "Contact your admin to manage usage credit settings."
      };
    } catch (err) {
      A(`Extra usage eligibility check failed: ${err}`, {
        level: "error"
      });
    }
    try {
      let pendingRequests = await f3a("limit_increase", ["pending", "dismissed"]);
      if (pendingRequests && pendingRequests.length > 0) return {
        type: "message",
        value: "You've already sent a usage credit request to your admin."
      };
    } catch (err) {
      A(`Failed to fetch pending admin requests: ${err}`, {
        level: "error"
      });
    }
    try {
      return await m3a({
        request_type: "limit_increase",
        details: null
      }), {
        type: "message",
        value: extraUsage?.is_enabled ? "Request sent to your admin to increase your usage credit limit." : "Request sent to your admin to turn on usage credits."
      };
    } catch (err) {
      let axiosMsg = extractAxiosErrorMessage(err);
      if (j_(err, predicate => extractAxiosErrorMessage(predicate) !== null)) A(`Admin request rejected: ${axiosMsg ?? Ce(err)}`, {
        level: "error"
      });else Ie(err);
      if (axiosMsg) return {
        type: "message",
        value: axiosMsg
      };
    }
    return {
      type: "message",
      value: "Contact your admin to manage usage credit settings."
    };
  }
  let settingsUrl = isOrgAccount ? "https://claude.ai/admin-settings/usage" : "https://claude.ai/settings/usage";
  if (!opts.openInBrowser) return {
    type: "browser-opened",
    url: settingsUrl,
    opened: !1
  };
  try {
    let browserOpened = await Zl(settingsUrl);
    return {
      type: "browser-opened",
      url: settingsUrl,
      opened: browserOpened
    };
  } catch (err) {
    return A(`Failed to open browser for ${settingsUrl}: ${err}`, {
      level: "error"
    }), {
      type: "message",
      value: `Couldn't open your browser. Visit ${settingsUrl} to manage usage credits.`
    };
  }
}

var s3n = b(() => {
  ap();
  jn();
  g3a();
  _ge();
  qoe();
  lo();
  RM();
  Jg();
  qe();
  Ct();
  vn();
  $d();
});

export {extractAxiosErrorMessage as _3a,canRequestOverageProvision as W3t,openUsageManagementPage as Cdt,s3n};
