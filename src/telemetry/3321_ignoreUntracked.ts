// @ts-nocheck
import {isClaudeAISubscriber as Lq,checkAndRefreshOAuthTokenIfNeeded as sY,getClaudeAIOAuthTokens as H7,Ao as Mq} from "../config/2031_withOAuthRefreshLock.ts";
import {getIsClean as MVH,findGitRoot as V5,gitExe as Rq,Ba as gK} from "../../vendor/m693.ts";
import {Gee as xHH,rle as Z4H} from "../core/3320_environment_id.ts";
import {fo as $q} from "../../vendor/m566.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,bt as L_} from "../../vendor/m195.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {execFileNoThrowWithCwd as c8,oa as l7} from "../../vendor/m684.ts";
import {getOrganizationUUID as vI,DH as Ih} from "../config/1288_storeOAuthAccountInfo.ts";
import {getOauthConfig as F9,Dc as u1} from "../api/0459_getOauthConfig.ts";
import {getOAuthHeaders as vJ,Dw as RW} from "../api/2190_updateSessionTitle.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b as L} from "../../runtime.ts";
import {Gp as BO} from "../../vendor/m567.ts";
import {ZI as Vh} from "../../vendor/m692.ts";
/**
 * Remote session eligibility helpers: git-repo detection, GitHub App / token-sync
 * checks, and repository access-method resolution.
 */

/** Returns whether the user is not logged in (true = not logged in). */
async function ZS6(): Promise<boolean> {
  if (!Lq()) return !1;
  return sY();
}

/** Checks git working-directory cleanliness, ignoring untracked files. */
async function xNK(): Promise<boolean> {
  return await MVH({
    ignoreUntracked: !0
  });
}

/**
 * Fetches the list of remote environments for eligibility checking.
 * Returns null on non-401 errors.
 */
async function uNK(): Promise<unknown[] | null> {
  try {
    return await xHH();
  } catch (err) {
    if ($q.isAxiosError(err) && err.response?.status === 401) throw err;
    return N(`fetchRemoteEnvironmentsForEligibility failed: ${GH(err)}`), null;
  }
}

/**
 * Returns true if the given (or current) directory is inside a git work-tree.
 * Falls back to running `git rev-parse --is-inside-work-tree`.
 */
async function rK_(dir?: string): Promise<boolean> {
  let resolvedDir = dir ?? u_();
  if (V5(resolvedDir) !== null) return !0;
  let {
    stdout: output,
    code: exitCode
  } = await c8(Rq(), ["rev-parse", "--is-inside-work-tree"], {
    cwd: resolvedDir
  });
  return exitCode === 0 && output.trim() === "true";
}

/**
 * Checks whether the Claude GitHub App is installed on `owner/repo`.
 * Uses the org UUID and the current user's access token.
 * Returns false on any non-fatal error.
 */
async function ZmH(owner: string, repo: string, signal?: AbortSignal): Promise<boolean> {
  try {
    let accessToken = H7()?.accessToken;
    if (!accessToken) return N("checkGithubAppInstalled: No access token found, assuming app not installed"), !1;
    let orgUuid = await vI();
    if (!orgUuid) return N("checkGithubAppInstalled: No org UUID found, assuming app not installed"), !1;
    let url = `${F9().BASE_API_URL}/api/oauth/organizations/${orgUuid}/code/repos/${owner}/${repo}`,
      headers = {
        ...vJ(accessToken),
        "x-organization-uuid": orgUuid
      };
    N(`Checking GitHub app installation for ${owner}/${repo}`);
    let response = await $q.get(url, {
      headers: headers,
      timeout: 15000,
      signal: signal
    });
    if (response.status === 200) {
      if (response.data.status) {
        let appInstalled = response.data.status.app_installed;
        return N(`GitHub app ${appInstalled ? "is" : "is not"} installed on ${owner}/${repo}`), appInstalled;
      }
      return N(`GitHub app is not installed on ${owner}/${repo} (status is null)`), !1;
    }
    return N(`checkGithubAppInstalled: Unexpected response status ${response.status}`), !1;
  } catch (err) {
    if ($q.isAxiosError(err)) {
      let status = err.response?.status;
      if (status && status >= 400 && status < 500) return N(`checkGithubAppInstalled: Got ${status} error, app likely not installed on ${owner}/${repo}`), !1;
    }
    return N(`checkGithubAppInstalled error: ${GH(err)}`), !1;
  }
}

/**
 * Checks whether the user's GitHub token has been synced via the web-setup flow.
 * Returns false on any non-fatal error.
 */
async function eYO(): Promise<boolean> {
  try {
    let accessToken = H7()?.accessToken;
    if (!accessToken) return N("checkGithubTokenSynced: No access token found"), !1;
    let orgUuid = await vI();
    if (!orgUuid) return N("checkGithubTokenSynced: No org UUID found"), !1;
    let url = `${F9().BASE_API_URL}/api/oauth/organizations/${orgUuid}/sync/github/auth`,
      headers = {
        ...vJ(accessToken),
        "x-organization-uuid": orgUuid
      };
    N("Checking if GitHub token is synced via web-setup");
    let response = await $q.get(url, {
        headers: headers,
        timeout: 15000
      }),
      isSynced = response.status === 200 && response.data?.is_authenticated === !0;
    return N(`GitHub token synced: ${isSynced} (status=${response.status}, data=${bH(response.data)})`), isSynced;
  } catch (err) {
    if ($q.isAxiosError(err)) {
      let status = err.response?.status;
      if (status && status >= 400 && status < 500) return N(`checkGithubTokenSynced: Got ${status}, token not synced`), !1;
    }
    return N(`checkGithubTokenSynced error: ${GH(err)}`), !1;
  }
}

/**
 * Resolves whether the current user has access to `owner/repo`, and which
 * method grants that access: "github-app", "token-sync", or "none".
 */
async function mNK(
  owner: string,
  repo: string
): Promise<{ hasAccess: boolean; method: "github-app" | "token-sync" | "none" }> {
  if (await ZmH(owner, repo)) return {
    hasAccess: !0,
    method: "github-app"
  };
  if (Y_("tengu_cobalt_lantern", !1) && (await eYO())) return {
    hasAccess: !0,
    method: "token-sync"
  };
  return {
    hasAccess: !1,
    method: "none"
  };
}

/** Lazy-init module registering all dependencies for this module. */
var JGH = L(() => {
  BO();
  u1();
  Ih();
  o6();
  Mq();
  Fq();
  FH();
  Vh();
  L_();
  l7();
  gK();
  H6();
  RW();
  Z4H();
});

export {ZS6 as K0n,xNK as tca,uNK as nca,rK_ as Ast,ZmH as C9e,eYO as jWd,mNK as rca,JGH as Oke};
