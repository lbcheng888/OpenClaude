// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {wc,Mn,Kl,po} from "../tools/5224_userPromptCount.ts";
import {Xy,Ce,mo,allTools as R_,__export as j_,Ct} from "../../vendor/m197.ts";
import {getOriginalCwd as gr,getIsNonInteractiveSession as kr,getSessionId as It,lt} from "../session/0132_sent.ts";
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {vB,rb} from "./5211_level.ts";
import {vc,EFa} from "../api/3886_level.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {ba,i2,pd} from "../../vendor/m706.ts";
import {C} from "../../vendor/m321.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {getIsClean as K1e,gitExe as go,findGitRoot as cu,getDefaultBranch as Zx,ia} from "../../vendor/m698.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {bt,Gc} from "../../vendor/m588.ts";
import {nW,Z2e} from "../config/2612_GIT_CONFIG_COUNT.ts";
import {execFileNoThrow as Fn,Ii} from "../../vendor/m690.ts";
import {deserializeMessages as u9t,Xle} from "./3885_restoreSkillStateFromMessages.ts";
import {Sre,nt} from "../../vendor/m127.ts";
import {detectCurrentRepositoryWithHost as cM,parseGitRemote as hoe,parseGitHubRepository as G1e,_0} from "../../vendor/m697.ts";
import {isFirstPartyProvider as Nl,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {getClaudeAIOAuthTokens as qs,checkAndRefreshOAuthTokenIfNeeded as Dh,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {getOrganizationUUID as y2,aI} from "../config/1293_storeOAuthAccountInfo.ts";
import {fetchSession as Ofe,getBranchFromSession as obn,getOAuthHeaders as YS,axiosGetWithRetry as rbn,CCR_BYOC_BETA as B2r,NR} from "../api/2195_updateSessionTitle.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {mco,$2n,fco} from "../../vendor/m3877.ts";
import {AppStateProvider as IE,pq} from "../../vendor/m3370.ts";
import {KeybindingSetup as kC,WW} from "../../vendor/m3362.ts";
import {getCurrentProjectConfig as eh,saveCurrentProjectConfig as TE,getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {isPersistentRemoteSessionEnabled as P0e,isCcrV2SendEventsEnabled as put,pH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {Fj,KOn,getTrustedDeviceToken as qW} from "../telemetry/3343_untrustedDeviceHint.ts";
import {LNa,ONa,W2n} from "../../vendor/m3878.ts";
import {isTranscriptMessage as Nq,_a} from "./5175_writeRemoteAgentMetadata.ts";
import {ho} from "../../vendor/m572.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {W5,Zdn} from "../config/1296_recursive.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {Aet,Ret} from "../../vendor/m2235.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Pco,Oco} from "../telemetry/3887_cwd.ts";
import {OBt,NOn,Bee,mat,nle} from "../core/3336_environment_id.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {getSettings_DEPRECATED as $o,br} from "../config/0745_updateSettingsForSource.ts";
import {checkGate_CACHED_OR_BLOCKING as wF,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {L3e,bIe} from "../telemetry/3337_ignoreUntracked.ts";
import {getMainLoopModel as gs,Ro} from "./1458_swapShrinksContextWindow.ts";
import {toCompatSessionId as OD} from "../core/2809_toInfraSessionId.ts";
import {BOn,Rto} from "../../vendor/m3338.ts";
import {LBt,wto} from "../../vendor/m3340.ts";
import {bre} from "../../vendor/m129.ts";
import {ap} from "../../vendor/m573.ts";
import {Qr} from "../../vendor/m323.ts";
import {dn} from "../config/0137_namespace.ts";
import {Xo} from "../../vendor/m240.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Teleport / remote (cloud) code session lifecycle.
 *
 * This module implements the `--teleport` feature: validating that the local
 * checkout matches a cloud session's repository, creating/resuming remote
 * sessions on the first-party Anthropic API, polling their event stream, and
 * archiving/interrupting them.
 *
 * NOTE: This file is a 1:1 structure-exact reverse-engineering artifact. Only
 * local identifiers have been renamed and type/comment annotations added; the
 * runtime structure is preserved byte-for-byte modulo names.
 */

// Module namespace object + export table (esbuild interop shim).
var f9t = {};
ft(f9t, {
  validateSessionRepository: () => validateSessionRepository,
  validateGitState: () => validateGitState,
  teleportToRemoteWithErrorHandling: () => teleportToRemoteWithErrorHandling,
  teleportToRemote: () => teleportToRemote,
  teleportResumeCodeSession: () => teleportResumeCodeSession,
  teleportFromSessionsAPI: () => teleportFromSessionsAPI,
  subscribeRemoteSessionToPR: () => subscribeRemoteSessionToPR,
  processMessagesForTeleportResume: () => processMessagesForTeleportResume,
  pollRemoteSessionEvents: () => pollRemoteSessionEvents,
  interruptRemoteSession: () => interruptRemoteSession,
  checkOutTeleportedSessionBranch: () => checkOutTeleportedSessionBranch,
  awaitRemoteSessionResult: () => awaitRemoteSessionResult,
  archiveRemoteSession: () => archiveRemoteSession
});

/**
 * Builds the "session resumed" status notice shown after a teleport resume.
 * @param branchError - the branch-checkout error, or null if checkout succeeded.
 */
function iwp(branchError: any) {
  if (branchError === null) return wc("Session resumed", "suggestion");
  let detail = branchError instanceof Xy ? branchError.formattedMessage : branchError.message;
  return wc(`Session resumed without branch: ${detail}`, "warning");
}

/** Synthetic meta user-message announcing that the session continued on another machine. */
function awp() {
  return Mn({
    content: `This session is being continued from another machine. Application state may have changed. The updated working directory is ${gr()}`,
    isMeta: !0
  });
}

/**
 * Generates a succinct session title and `claude/`-prefixed branch name from a
 * free-text task description via a structured-output model call. Falls back to a
 * truncated description + `claude/task` on any failure.
 *
 * @param description - the task description used to seed title/branch generation.
 * @param signal - abort signal for the underlying model request.
 */
async function cwp(description: string, signal?: AbortSignal): Promise<{ title: string; branchName: string }> {
  let fallbackTitle = xs(description, 75),
    fallbackBranch = "claude/task";
  try {
    let userPrompt = lwp.replace("{description}", description),
      firstContentBlock = (await vB({
        systemPrompt: vc([]),
        userPrompt: userPrompt,
        outputFormat: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string"
              },
              branch: {
                type: "string"
              }
            },
            required: ["title", "branch"],
            additionalProperties: !1
          }
        },
        signal: signal,
        options: {
          querySource: "teleport_generate_title",
          agents: [],
          isNonInteractiveSession: !1,
          hasAppendSystemPrompt: !1,
          mcpTools: [],
          agentContext: Hm()
        }
      })).message.content[0];
    if (firstContentBlock?.type !== "text") return {
      title: fallbackTitle,
      branchName: "claude/task"
    };
    let parsedJson = ba(i2(firstContentBlock.text), !1),
      validation = C.object({
        title: C.string(),
        branch: C.string()
      }).safeParse(parsedJson);
    if (validation.success) return {
      title: validation.data.title || fallbackTitle,
      branchName: validation.data.branch || "claude/task"
    };
    return {
      title: fallbackTitle,
      branchName: "claude/task"
    };
  } catch (err) {
    return A(`Error generating title and branch: ${Ce(err)}`, {
      level: "error"
    }), {
      title: fallbackTitle,
      branchName: "claude/task"
    };
  }
}

/**
 * Asserts the git working directory is clean (ignoring untracked files).
 * Throws an Xy error with a red CLI message if dirty.
 */
async function validateGitState() {
  if (!(await K1e({
    ignoreUntracked: !0
  }))) throw W("tengu_teleport_error_git_not_clean", {}), new Xy("Git working directory is not clean. Please commit or stash your changes before using --teleport.", bt.red(`Error: Git working directory is not clean. Please commit or stash your changes before using --teleport.
`));
}

/**
 * Fetches from `origin`, optionally for a single branch. If the specific-branch
 * refspec fetch fails, retries fetching the bare ref.
 * @param branch - branch to fetch, or undefined to fetch all.
 */
async function uwp(branch?: string) {
  let fetchArgs = branch ? ["fetch", "origin", `${branch}:${branch}`] : ["fetch", "origin"],
    env = nW(),
    {
      code: exitCode,
      stderr: stderr
    } = await Fn(go(), fetchArgs, {
      env: env
    });
  if (exitCode !== 0) if (branch && stderr.includes("refspec")) {
    A(`Specific branch fetch failed, trying to fetch ref: ${branch}`);
    let {
      code: refExitCode,
      stderr: refStderr
    } = await Fn(go(), ["fetch", "origin", branch], {
      env: env
    });
    if (refExitCode !== 0) A(`Failed to fetch from remote origin: ${refStderr}`, {
      level: "error"
    });
  } else A(`Failed to fetch from remote origin: ${stderr}`, {
    level: "error"
  });
}

/**
 * Ensures the local branch tracks `origin/<branch>` as its upstream, creating
 * the tracking relationship if the remote branch exists and none is set yet.
 * @param branch - local branch name.
 */
async function dwp(branch: string) {
  let {
    code: upstreamCheckCode
  } = await Fn(go(), ["rev-parse", "--abbrev-ref", `${branch}@{upstream}`]);
  if (upstreamCheckCode === 0) {
    A(`Branch '${branch}' already has upstream set`);
    return;
  }
  let {
    code: remoteVerifyCode
  } = await Fn(go(), ["rev-parse", "--verify", `origin/${branch}`]);
  if (remoteVerifyCode === 0) {
    A(`Setting upstream for '${branch}' to 'origin/${branch}'`);
    let {
      code: setUpstreamCode,
      stderr: setUpstreamStderr
    } = await Fn(go(), ["branch", "--set-upstream-to", `origin/${branch}`, branch]);
    if (setUpstreamCode !== 0) A(`Failed to set upstream for '${branch}': ${setUpstreamStderr}`);else A(`Successfully set upstream for '${branch}'`);
  } else A(`Remote branch 'origin/${branch}' does not exist, skipping upstream setup`);
}

/**
 * Checks out `branch`, falling back to creating/tracking it from `origin` when
 * a plain local checkout fails. Throws an Xy error if all attempts fail, then
 * sets up upstream tracking.
 * @param branch - branch name to check out.
 */
async function pwp(branch: string) {
  let {
    code: checkoutCode,
    stderr: checkoutStderr
  } = await Fn(go(), ["checkout", branch]);
  if (checkoutCode !== 0) {
    A(`Local checkout failed, trying to checkout from origin: ${checkoutStderr}`);
    let trackResult = await Fn(go(), ["checkout", "-b", branch, "--track", `origin/${branch}`]);
    if (checkoutCode = trackResult.code, checkoutStderr = trackResult.stderr, checkoutCode !== 0) {
      A(`Remote checkout with -b failed, trying without -b: ${checkoutStderr}`);
      let trackNoBranchResult = await Fn(go(), ["checkout", "--track", `origin/${branch}`]);
      checkoutCode = trackNoBranchResult.code, checkoutStderr = trackNoBranchResult.stderr;
    }
  }
  if (checkoutCode !== 0) throw W("tengu_teleport_error_branch_checkout_failed", {}), new Xy(`Failed to checkout branch '${branch}': ${checkoutStderr}`, bt.red(`Failed to checkout branch '${branch}'
`));
  await dwp(branch);
}

/** Returns the name of the currently checked-out git branch (trimmed). */
async function r$n() {
  let {
    stdout: stdout
  } = await Fn(go(), ["branch", "--show-current"]);
  return stdout.trim();
}

/**
 * Assembles the message list shown when resuming a teleported session:
 * the prior conversation, the "continued on another machine" meta note, and the
 * branch-status notice.
 * @param priorMessages - messages from the resumed session.
 * @param branchError - branch checkout error (or null).
 */
function processMessagesForTeleportResume(priorMessages: any, branchError: any) {
  return [...u9t(priorMessages), awp(), iwp(branchError)];
}

/**
 * Checks out the branch associated with a resumed cloud session, fetching from
 * origin first. Returns the resulting branch name and any non-fatal error.
 * @param branch - branch name from the cloud session, or empty/undefined to stay put.
 */
async function checkOutTeleportedSessionBranch(branch?: string): Promise<{ branchName: string; branchError: any }> {
  try {
    let branchBefore = await r$n();
    if (A(`Current branch before teleport: '${branchBefore}'`), branch) {
      if (!Sre(branch)) throw new Xy(`Invalid branch name from cloud session: ${branch}`, bt.red(`Invalid branch name from cloud session
`));
      A(`Switching to branch '${branch}'...`), await uwp(branch), await pwp(branch);
      let branchAfter = await r$n();
      A(`Branch after checkout: '${branchAfter}'`);
    } else A("No branch specified, staying on current branch");
    return {
      branchName: await r$n(),
      branchError: null
    };
  } catch (err) {
    let currentBranch = await r$n(),
      normalizedError = mo(err);
    return {
      branchName: currentBranch,
      branchError: normalizedError
    };
  }
}

/**
 * Compares a cloud session's required repository against the current checkout.
 * Returns a discriminated status: no_repo_required / not_in_repo / match / mismatch.
 * @param session - the fetched session with `session_context.sources`.
 */
async function validateSessionRepository(session: any) {
  let currentRepoInfo = await cM(),
    currentRepoSlug = currentRepoInfo ? `${currentRepoInfo.owner}/${currentRepoInfo.name}` : null,
    gitSource = session.session_context.sources.find((source: any) => source.type === "git_repository");
  if (!gitSource?.url) return A(currentRepoSlug ? "Session has no associated repository, proceeding without validation" : "Session has no repo requirement and not in git directory, proceeding"), {
    status: "no_repo_required"
  };
  let sessionRepoInfo = hoe(gitSource.url),
    sessionRepoSlug = sessionRepoInfo ? `${sessionRepoInfo.owner}/${sessionRepoInfo.name}` : G1e(gitSource.url);
  if (!sessionRepoSlug) return {
    status: "no_repo_required"
  };
  if (A(`Session is for repository: ${sessionRepoSlug}, current repo: ${currentRepoSlug ?? "none"}`), !currentRepoSlug) return {
    status: "not_in_repo",
    sessionRepo: sessionRepoSlug,
    sessionHost: sessionRepoInfo?.host,
    currentRepo: null
  };
  let stripPort = (host: string) => host.replace(/:\d+$/, ""),
    reposMatch = currentRepoSlug.toLowerCase() === sessionRepoSlug.toLowerCase(),
    hostsMatch = !currentRepoInfo || !sessionRepoInfo || stripPort(currentRepoInfo.host.toLowerCase()) === stripPort(sessionRepoInfo.host.toLowerCase());
  if (reposMatch && hostsMatch) return {
    status: "match",
    sessionRepo: sessionRepoSlug,
    currentRepo: currentRepoSlug
  };
  return {
    status: "mismatch",
    sessionRepo: sessionRepoSlug,
    currentRepo: currentRepoSlug,
    sessionHost: sessionRepoInfo?.host,
    currentHost: currentRepoInfo?.host
  };
}

/**
 * Resumes a cloud (`--teleport`) code session by ID: validates auth, the org,
 * and the repository match, then fetches its logs via the Sessions API.
 * @param sessionId - the cloud session ID to resume.
 * @param onPhase - optional callback reporting progress phases.
 */
async function teleportResumeCodeSession(sessionId: string, onPhase?: (phase: string) => void) {
  if (!Nl()) throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");
  if (!Xs("allow_remote_sessions")) throw Error("Cloud sessions are disabled by your organization's policy.");
  A(`Resuming code session ID: ${sessionId}`);
  try {
    let accessToken = qs()?.accessToken;
    if (!accessToken) throw W("tengu_teleport_resume_error", {
      error_type: Ve("no_access_token")
    }), Error("Claude Code web sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");
    let orgUuid = await y2();
    if (!orgUuid) throw W("tengu_teleport_resume_error", {
      error_type: Ve("no_org_uuid")
    }), Error("Unable to get organization UUID for constructing session URL");
    onPhase?.("validating");
    let session = await Ofe(sessionId),
      repoValidation = await validateSessionRepository(session);
    switch (repoValidation.status) {
      case "match":
      case "no_repo_required":
        break;
      case "not_in_repo":
        {
          W("tengu_teleport_error_repo_not_in_git_dir_sessions_api", {
            sessionId: xr(sessionId)
          });
          let expectedCheckout = repoValidation.sessionHost && repoValidation.sessionHost.toLowerCase() !== "github.com" ? `${repoValidation.sessionHost}/${repoValidation.sessionRepo}` : repoValidation.sessionRepo;
          throw new Xy(`You must run claude --teleport ${sessionId} from a checkout of ${expectedCheckout}.`, bt.red(`You must run claude --teleport ${sessionId} from a checkout of ${bt.bold(expectedCheckout)}.
`));
        }
      case "mismatch":
        {
          W("tengu_teleport_error_repo_mismatch_sessions_api", {
            sessionId: xr(sessionId)
          });
          let includeHosts = repoValidation.sessionHost && repoValidation.currentHost && repoValidation.sessionHost.replace(/:\d+$/, "").toLowerCase() !== repoValidation.currentHost.replace(/:\d+$/, "").toLowerCase(),
            expectedCheckout = includeHosts ? `${repoValidation.sessionHost}/${repoValidation.sessionRepo}` : repoValidation.sessionRepo,
            actualCheckout = includeHosts ? `${repoValidation.currentHost}/${repoValidation.currentRepo}` : repoValidation.currentRepo;
          throw new Xy(`You must run claude --teleport ${sessionId} from a checkout of ${expectedCheckout}.
This repo is ${actualCheckout}.`, bt.red(`You must run claude --teleport ${sessionId} from a checkout of ${bt.bold(expectedCheckout)}.
This repo is ${bt.bold(actualCheckout)}.
`));
        }
      case "error":
        throw new Xy(repoValidation.errorMessage || "Failed to validate session repository", bt.red(`Error: ${repoValidation.errorMessage || "Failed to validate session repository"}
`));
      default:
        {
          let unhandledStatus = repoValidation.status;
          throw Error(`Unhandled repo validation status: ${unhandledStatus}`);
        }
    }
    return await teleportFromSessionsAPI(sessionId, orgUuid, accessToken, onPhase, session);
  } catch (err) {
    if (err instanceof Xy) throw err;
    let normalizedError = mo(err);
    throw A(`Failed to resume teleport session ${sessionId}: ${normalizedError.message}`, {
      level: "error"
    }), W("tengu_teleport_resume_error", {
      error_type: Ve("resume_session_id_catch")
    }), new Xy(normalizedError.message, bt.red(`Error: ${normalizedError.message}
`));
  }
}

/**
 * If the local repo state has teleport-blocking errors not in the ignore set,
 * renders a blocking resolution UI and waits for the user to resolve them.
 * @param renderer - Ink render host.
 * @param errorsToIgnore - error types to suppress.
 */
async function mwp(renderer: any, errorsToIgnore: Set<string>) {
  let detectedErrors = EFa(await mco(), errorsToIgnore);
  if (detectedErrors.size > 0) W("tengu_teleport_errors_detected", {
    error_types: Array.from(detectedErrors).join(","),
    errors_ignored: Array.from(errorsToIgnore).join(",")
  }), await new Promise<void>(resolve => {
    renderer.render(o$n.jsx(IE, {
      children: o$n.jsx(kC, {
        children: o$n.jsx($2n, {
          errorsToIgnore: errorsToIgnore,
          onComplete: () => {
            W("tengu_teleport_errors_resolved", {
              error_types: Array.from(detectedErrors).join(",")
            }), resolve();
          }
        })
      })
    }));
  });
}

/**
 * Emits the remote-session link telemetry event and records first-use flags in
 * project/global config.
 * @param ccrSessionId - the created remote session ID.
 * @param source - the launch source.
 * @param scope - which config scopes to mark as having used a remote session.
 */
function MFa(ccrSessionId: string, source: any, scope: { project: boolean; global: boolean }) {
  if (W("tengu_ccr_session_link", {
    ccr_session_id: ccrSessionId,
    source: Le(source)
  }), scope.project && !eh().hasUsedRemoteSession) TE((config: any) => config.hasUsedRemoteSession ? config : {
    ...config,
    hasUsedRemoteSession: !0
  });
  if (scope.global && !Ot().hasRemoteEnvironment) hn((config: any) => config.hasRemoteEnvironment ? config : {
    ...config,
    hasRemoteEnvironment: !0
  });
}

/**
 * Wraps {@link teleportToRemote} with pre-flight error resolution and maps the
 * create-flow callbacks into a structured ok/failReason result.
 * @param renderer - Ink render host for the pre-flight resolution UI.
 * @param params - teleport launch parameters.
 */
async function teleportToRemoteWithErrorHandling(renderer: any, params: any) {
  await mwp(renderer, new Set(["needsGitStash"]));
  let failReason: string | undefined,
    session = await teleportToRemote({
      initialMessage: params.description,
      initialMessageUuid: params.descriptionUuid,
      signal: params.signal,
      source: params.source,
      branchName: params.branchName,
      permissionMode: params.permissionMode,
      environmentVariables: params.environmentVariables,
      poolId: params.poolId,
      allowBundle: !0,
      onBundleFail: (message: string, reason: string) => {
        switch (reason) {
          case "env_create":
            failReason = "env_create_failed";
            break;
          case "bundle":
            failReason = "bundle_failed";
            break;
          default:
            {
              let exhaustiveCheck = reason;
            }
        }
        process.stderr.write(`
${message}
`);
      },
      onCreateFail: (message: string, reason: string) => {
        failReason = reason, process.stderr.write(`
${message}
`);
      }
    });
  if (session) return {
    ok: !0,
    session: session
  };
  return {
    ok: !1,
    failReason: failReason ?? (params.signal.aborted ? "aborted" : "unknown")
  };
}

/**
 * Fetches a cloud session's log and branch from the Sessions API, with a v2 →
 * session-ingress fallback. Filters to non-sidechain messages.
 * @param sessionId - the cloud session ID.
 * @param orgUuid - organization UUID.
 * @param accessToken - claude.ai access token.
 * @param onPhase - optional progress callback.
 * @param session - the pre-fetched session metadata (for branch extraction).
 */
async function teleportFromSessionsAPI(sessionId: string, orgUuid: string, accessToken: string, onPhase?: (phase: string) => void, session?: any) {
  let startTime = Date.now();
  try {
    A(`[teleport] Starting fetch for session: ${sessionId}`), onPhase?.("fetching_logs");
    let fetchStartTime = Date.now(),
      trustedDeviceToken: string | undefined;
    if (P0e()) {
      let {
        readStoredTrustedDeviceToken: readStoredTrustedDeviceToken
      } = await Promise.resolve().then(() => (Fj(), KOn));
      trustedDeviceToken = await readStoredTrustedDeviceToken();
    }
    let logEntries = await LNa(sessionId, accessToken, orgUuid, trustedDeviceToken);
    if (logEntries === null) A("[teleport] v2 endpoint returned null, trying session-ingress"), logEntries = await ONa(sessionId, accessToken, orgUuid);
    if (A(`[teleport] Session logs fetched in ${Date.now() - fetchStartTime}ms`), logEntries === null) throw Error("Failed to fetch session logs");
    let filterStartTime = Date.now(),
      messages = logEntries.filter((entry: any) => Nq(entry) && !entry.isSidechain);
    A(`[teleport] Filtered ${logEntries.length} entries to ${messages.length} messages in ${Date.now() - filterStartTime}ms`), onPhase?.("fetching_branch");
    let branch = session ? obn(session) : void 0;
    if (branch) A(`[teleport] Found branch: ${branch}`);
    return A(`[teleport] Total teleportFromSessionsAPI time: ${Date.now() - startTime}ms`), {
      log: messages,
      branch: branch
    };
  } catch (err) {
    if (err instanceof Xy) throw err;
    let normalizedError = mo(err);
    if (ho.isAxiosError(err) && err.response?.status === 404) throw W("tengu_teleport_error_session_not_found_404", {
      sessionId: xr(sessionId)
    }), new Xy(`${sessionId} not found.
Run /status in Claude Code to check your account.`, `${sessionId} not found.
${bt.dim("Run /status in Claude Code to check your account.")}`);
    throw Ie(normalizedError), Error(`Failed to fetch session from Sessions API: ${normalizedError.message}`);
  }
}

/**
 * Resolves the access token used for polling/archiving remote sessions:
 * the claude.ai access token, or in CCR mode the OAuth token env/secret.
 */
function i$n() {
  return qs()?.accessToken ?? (nt(process.env.CLAUDE_CODE_REMOTE) ? process.env.CLAUDE_CODE_OAUTH_TOKEN || W5() || void 0 : void 0);
}

/**
 * Polls a remote session's event stream (paginated, up to a fixed page cap),
 * collecting session-scoped payloads since `cursor`. Optionally fetches session
 * metadata (branch/status) unless `options.skipMetadata` is set.
 * @param sessionId - the cloud session ID.
 * @param cursor - last seen event cursor (sequence number) or null to start fresh.
 * @param options - optional flags, e.g. `skipMetadata`.
 */
async function pollRemoteSessionEvents(sessionId: string, cursor: string | null = null, options?: { skipMetadata?: boolean }) {
  if (!Nl()) throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");
  await Dh();
  let accessToken = i$n();
  if (!accessToken) throw Error("No access token for polling");
  let headers = YS(accessToken),
    eventsUrl = `${Hs().BASE_API_URL}/v1/code/sessions/${sessionId}/events`,
    maxPages = 50,
    newEvents: any[] = [],
    lastEventId = cursor;
  for (let page = 0; page < maxPages; page++) {
    let response = await rbn(eventsUrl, {
      headers: headers,
      params: {
        sort_order: "asc",
        ...(lastEventId && {
          cursor: lastEventId
        })
      },
      timeout: 30000
    });
    if (response.status !== 200) throw Error(`Failed to fetch session events: ${response.statusText}`);
    let responseData = response.data;
    if (!responseData?.data || !Array.isArray(responseData.data)) throw Error("Invalid events response");
    for (let event of responseData.data) {
      let sequenceNum = event?.sequence_num;
      if (sequenceNum !== void 0) lastEventId = String(sequenceNum);
      let payload = event?.payload;
      if (payload && typeof payload === "object" && "type" in payload) {
        if (payload.type === "env_manager_log" || payload.type === "control_response") continue;
        if ("session_id" in payload) newEvents.push(payload);
      }
    }
    if (!responseData.next_cursor) break;
  }
  if (options?.skipMetadata) return {
    newEvents: newEvents,
    lastEventId: lastEventId
  };
  let branch: any, sessionStatus: any, metadataFetchError: any;
  try {
    let session = await Ofe(sessionId, {
      accessToken: accessToken
    });
    branch = obn(session), sessionStatus = session.session_status;
  } catch (err) {
    metadataFetchError = Ce(err), A(`teleport: failed to fetch session ${sessionId} metadata: ${err}`, {
      level: "warn"
    });
  }
  return {
    newEvents: newEvents,
    lastEventId: lastEventId,
    branch: branch,
    sessionStatus: sessionStatus,
    metadataFetchError: metadataFetchError
  };
}

/**
 * Polls a remote session until it reaches a terminal state (archived, or idle
 * with no new events for several consecutive polls), then returns the final
 * assistant text and result usage/cost. Bails on repeated metadata failures,
 * `requires_action`, abort, or the 30-minute timeout.
 * @param sessionId - the cloud session ID.
 * @param signal - abort signal.
 */
async function awaitRemoteSessionResult(sessionId: string, signal?: AbortSignal) {
  if (!Nl()) throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");
  let pollIntervalMs = 1000,
    timeoutMs = 1800000,
    maxIdlePolls = 5,
    maxMetadataFailures = 10,
    lastEventId: string | null = null,
    lastAssistantEvent: any,
    lastResultEvent: any,
    toolCallCount = 0,
    idlePollCount = 0,
    metadataFailureCount = 0,
    completed = !1,
    startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (signal?.aborted) throw Error("Workflow aborted");
    let pollResult = await pollRemoteSessionEvents(sessionId, lastEventId);
    lastEventId = pollResult.lastEventId;
    for (let event of pollResult.newEvents) if (event.type === "assistant") {
      lastAssistantEvent = event;
      for (let contentBlock of event.message.content) if (contentBlock.type === "tool_use") toolCallCount++;
    } else if (event.type === "result") lastResultEvent = event;
    if (pollResult.sessionStatus === "archived") {
      completed = !0;
      break;
    }
    if (pollResult.sessionStatus === "requires_action") throw Error(`Cloud session ${sessionId} entered 'requires_action' (likely a permission prompt) with no client to answer it. Ensure the cloud agent's allowed_tools cover what it needs, or set a permissive mode.`);
    if (pollResult.sessionStatus === void 0) {
      if (metadataFailureCount++, metadataFailureCount >= maxMetadataFailures) throw Error(`Cloud session ${sessionId}: fetchSession failed ${maxMetadataFailures} times in a row (last error: ${pollResult.metadataFetchError ?? "unknown"}). Bailing instead of polling to the 30-min timeout.`);
    } else metadataFailureCount = 0;
    if (pollResult.sessionStatus === "idle" && pollResult.newEvents.length === 0) {
      if (idlePollCount++, idlePollCount >= maxIdlePolls) {
        completed = !0;
        break;
      }
    } else idlePollCount = 0;
    await Kn(pollIntervalMs, signal);
  }
  if (!completed) throw Error(`Cloud session ${sessionId} timed out after ${timeoutMs / 60000} min`);
  let resultText = lastAssistantEvent && lastAssistantEvent.type === "assistant" ? Kl(lastAssistantEvent.message.content, `
`) : "",
    resultEvent = lastResultEvent && lastResultEvent.type === "result" ? lastResultEvent : void 0;
  return {
    text: resultText,
    structuredOutput: resultEvent?.subtype === "success" ? resultEvent.structured_output : void 0,
    resultSubtype: resultEvent?.subtype,
    usage: resultEvent?.usage,
    totalCostUsd: resultEvent?.total_cost_usd,
    modelUsage: resultEvent?.modelUsage,
    numTurns: resultEvent?.num_turns,
    toolCalls: toolCallCount
  };
}

/**
 * Builds the initial control/event payload list for a new remote session:
 * optional set-permission-mode, optional focus-mode flag settings, and the
 * initial user message.
 * @param params - launch parameters (permission mode, initial message, etc.).
 */
function NFa(params: any) {
  let events: any[] = [];
  if (params.permissionMode) events.push({
    type: "event",
    data: {
      type: "control_request",
      request_id: `set-mode-${dut.randomUUID()}`,
      request: {
        subtype: "set_permission_mode",
        mode: params.permissionMode,
        ultraplan: params.ultraplan
      }
    }
  });
  if (!kr() && Aet()) events.push({
    type: "event",
    data: {
      type: "control_request",
      request_id: `apply-flag-settings-${dut.randomUUID()}`,
      request: {
        subtype: "apply_flag_settings",
        settings: {
          viewMode: "focus"
        }
      }
    }
  });
  if (params.initialMessage) events.push({
    type: "event",
    data: {
      uuid: params.initialMessageUuid ?? dut.randomUUID(),
      session_id: "",
      type: "user",
      parent_tool_use_id: null,
      message: {
        role: "user",
        content: params.initialMessage
      }
    }
  });
  return events;
}

/**
 * Creates a new remote (cloud) code session. Resolves auth + org, selects (or
 * uses an explicit) environment, determines the git source vs seed-bundle
 * strategy, posts the create request, and returns the created session id/title
 * (or null on any failure, via the on*Fail callbacks).
 * @param params - full launch configuration.
 */
async function teleportToRemote(params: any) {
  let {
      initialMessage: initialMessage,
      signal: signal
    } = params,
    cwd = params.cwd ?? Lt();
  if (!Xs("allow_remote_sessions")) return params.onCreateFail?.("Cloud sessions are disabled by your organization's policy.", "policy_denied"), null;
  if (!Nl()) return params.onCreateFail?.("Cloud sessions are only available on the first-party Anthropic API provider.", "not_first_party"), null;
  try {
    await Dh();
    let accessToken = i$n();
    if (!accessToken) {
      let errMsg = "Cloud sessions require a claude.ai login. Run /login to authenticate." + (nt(process.env.CLAUDE_CODE_REMOTE) ? ` (in CCR: env=${process.env.CLAUDE_CODE_OAUTH_TOKEN ? "set" : "unset"}, fd=${process.env.CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR ? "set" : "unset"})` : "");
      return Ie(Error(errMsg)), params.onCreateFail?.(errMsg, "no_access_token"), null;
    }
    let orgUuid = await y2();
    if (!orgUuid) {
      let errMsg = "Unable to get organization UUID for cloud session creation" + (nt(process.env.CLAUDE_CODE_REMOTE) ? ` (in CCR: CLAUDE_CODE_ORGANIZATION_UUID=${process.env.CLAUDE_CODE_ORGANIZATION_UUID ? "set" : "unset"})` : "");
      return Ie(Error(errMsg)), params.onCreateFail?.(errMsg, "no_org_uuid"), null;
    }
    let envVars = {
      ...params.environmentVariables
    };
    if (delete envVars.CLAUDE_CODE_OAUTH_TOKEN, params.environmentId) {
      // --- Explicit-environment path (BYOC / specific environment id) ---
      let sessionsUrl = `${Hs().BASE_API_URL}/v1/sessions`,
        requestHeaders = {
          ...YS(accessToken),
          "anthropic-beta": "ccr-byoc-2025-07-29",
          "x-organization-uuid": orgUuid
        },
        gitSource: any = null,
        seedBundleFileId: any = null;
      if (params.useBundle) {
        let bundleResult = await Pco({
          oauthToken: accessToken,
          sessionId: It(),
          baseUrl: Hs().BASE_API_URL
        }, {
          signal: signal,
          baseRef: params.bundleBaseRef
        });
        if (!bundleResult.success) {
          if (A(`Bundle upload failed: ${bundleResult.error}`, {
            level: "error"
          }), bundleResult.failReason !== "too_large") params.onBundleFail?.(bundleResult.error, "bundle");
          return null;
        }
        seedBundleFileId = bundleResult.fileId, W("tengu_teleport_bundle_mode", {
          size_bytes: bundleResult.bundleSizeBytes,
          scope: Le(bundleResult.scope),
          has_wip: bundleResult.hasWip,
          reason: Ve("explicit_env_bundle")
        });
      } else if (params.sourceUrl) gitSource = {
        type: "git_repository",
        url: params.sourceUrl,
        revision: params.branchName
      };else {
        let repoInfo = await cM();
        if (repoInfo) gitSource = {
          type: "git_repository",
          url: `https://${repoInfo.host}/${repoInfo.owner}/${repoInfo.name}`,
          revision: params.branchName
        };
      }
      let requestBody = {
        title: params.title || params.description || "Remote task",
        events: NFa({
          initialMessage: initialMessage,
          initialMessageUuid: params.initialMessageUuid,
          permissionMode: params.permissionMode,
          ultraplan: params.ultraplan
        }),
        session_context: {
          sources: gitSource ? [gitSource] : [],
          ...(seedBundleFileId && {
            seed_bundle_file_id: seedBundleFileId
          }),
          outcomes: [],
          environment_variables: envVars,
          ...(params.model && {
            model: params.model
          }),
          ...(params.appendSystemPrompt && {
            append_system_prompt: params.appendSystemPrompt
          }),
          ...(params.outputSchema && {
            output_schema: params.outputSchema
          })
        },
        ...OBt(params.environmentId),
        ...(params.tags && {
          tags: params.tags
        })
      };
      A(`[teleportToRemote] explicit env ${params.environmentId}, ${Object.keys(envVars).length} env vars, ${seedBundleFileId ? `bundle=${seedBundleFileId}` : `source=${gitSource?.url ?? "none"}@${params.branchName ?? "default"}`}`);
      let createResponse = await ho.post(sessionsUrl, requestBody, {
        headers: requestHeaders,
        signal: signal,
        validateStatus: (status: number) => status < 500
      });
      if (createResponse.status !== 200 && createResponse.status !== 201) {
        let errMsg = `CreateSession ${createResponse.status}: ${Pe(createResponse.data)}`,
          errorData = createResponse.data;
        if ([401, 403, 429].includes(createResponse.status) || errorData?.error?.reason === "github_repo_access_denied") A(`[teleportToRemote] ${errMsg}`, {
          level: "error"
        });else {
          let sanitizeErrorField = (value: any) => value && /^[a-z][a-z0-9_]*$/.test(value) ? value : void 0;
          Ie(Error(`[type=${sanitizeErrorField(errorData?.error?.type)},reason=${sanitizeErrorField(errorData?.error?.reason)}] ${errMsg}`));
        }
        return params.onCreateFail?.(errorData?.error?.message || `${createResponse.status} ${createResponse.statusText || ""}`.trim(), "create_request_failed"), null;
      }
      let createData = createResponse.data;
      if (!createData || typeof createData.id !== "string") return Ie(Error(`No session id in response: ${Pe(createResponse.data)}`)), params.onCreateFail?.("Server returned a malformed session response (no session id)", "malformed_response"), null;
      return MFa(createData.id, params.source, {
        project: !1,
        global: !1
      }), {
        id: createData.id,
        title: createData.title || requestBody.title
      };
    }
    // --- Default-environment path (auto-select from available environments) ---
    let configuredEnvId = params.poolId ?? $o()?.remote?.defaultEnvironmentId,
      skipEnvFetch = NOn(configuredEnvId);
    A("[teleport] phase: env-select");
    let environments = skipEnvFetch ? [] : await Bee(accessToken);
    if (!skipEnvFetch && environments.length === 0) try {
      environments = [await mat(void 0, signal, accessToken)], A("[teleportToRemote] Auto-created default cloud env");
    } catch (err) {
      return A(`[teleportToRemote] auto-create env failed: ${Ce(err)}`, {
        level: "warn"
      }), params.onBundleFail?.("Could not create a cloud environment. Set one up at https://claude.ai/code/onboarding?magic=env-setup", "env_create"), null;
    }
    A(`Available environments: ${environments.map((env: any) => `${env.environment_id} (${env.name}, ${env.kind})`).join(", ")}`);
    let defaultEnvId = configuredEnvId,
      configuredEnv = defaultEnvId ? environments.find((env: any) => env.environment_id === defaultEnvId) : void 0,
      anthropicCloudEnv = environments.find((env: any) => env.kind === "anthropic_cloud");
    if (!skipEnvFetch && params.useDefaultEnvironment && !configuredEnv && !anthropicCloudEnv) {
      if (A(`No configured default or anthropic_cloud in env list (${environments.length} envs); retrying fetchEnvironments`), environments = await Bee(accessToken), configuredEnv = defaultEnvId ? environments.find((env: any) => env.environment_id === defaultEnvId) : void 0, anthropicCloudEnv = environments.find((env: any) => env.kind === "anthropic_cloud"), !configuredEnv && !anthropicCloudEnv) {
        let errMsg = `No configured default or anthropic_cloud environment available after retry (got: ${environments.map((env: any) => `${env.name} (${env.kind})`).join(", ")}${defaultEnvId ? `; configured default ${defaultEnvId} not in list` : ""})`;
        return A(`[teleportToRemote] ${errMsg}. Silent byoc fallthrough would launch into a dead env — fail fast instead.`, {
          level: "error"
        }), params.onCreateFail?.(errMsg, "no_default_env"), null;
      }
    }
    let selectedEnv = skipEnvFetch ? void 0 : configuredEnv || anthropicCloudEnv || environments.find((env: any) => env.kind !== "bridge") || environments[0];
    if (!selectedEnv && !skipEnvFetch) return Ie(Error("No environments available for session creation")), params.onCreateFail?.("No environments available for session creation", "no_environments"), null;
    if (defaultEnvId && selectedEnv) {
      let usingConfiguredDefault = selectedEnv.environment_id === defaultEnvId;
      A(usingConfiguredDefault ? `Using configured default environment: ${defaultEnvId}` : `Configured default environment ${defaultEnvId} not found, using first available`);
    }
    let selectedEnvId = skipEnvFetch ? defaultEnvId : selectedEnv.environment_id;
    A(selectedEnv ? `Selected environment: ${selectedEnvId} (${selectedEnv.name}, ${selectedEnv.kind})` : `Selected environment: ${selectedEnvId}`);
    let gitSource: any = null,
      gitOutcome: any = null,
      seedBundleFileId: any = null;
    if (params.sourceUrl) gitSource = {
      type: "git_repository",
      url: params.sourceUrl,
      revision: params.branchName
    };
    A("[teleport] phase: branch-detect");
    let repoInfo = gitSource ? null : await cM(params.cwd),
      sessionTitle: string | undefined,
      outcomeBranch: string | undefined;
    if (params.title && params.reuseOutcomeBranch) sessionTitle = params.title, outcomeBranch = params.reuseOutcomeBranch;else {
      let generated = await cwp(params.description || initialMessage || "Background task", signal);
      sessionTitle = params.title || generated.title, outcomeBranch = params.reuseOutcomeBranch || generated.branchName;
    }
    let canUseGitSource = !1,
      sourceReason = params.sourceUrl ? "explicit_source_url" : "no_git_at_all",
      isShallowOrUnusualRepo = cu(cwd),
      isByocEnv = skipEnvFetch || selectedEnv?.kind === "byoc",
      forceBundle = params.allowBundle && !isByocEnv && nt(process.env.CCR_FORCE_BUNDLE),
      bundleEnabled = params.allowBundle && !isByocEnv && isShallowOrUnusualRepo !== null && (nt(process.env.CCR_ENABLE_BUNDLE) || (await wF("tengu_ccr_bundle_seed_enabled")));
    if (repoInfo && !forceBundle) {
      if (isByocEnv) canUseGitSource = !0, sourceReason = "byoc_env_skip_preflight";else if (repoInfo.host === "github.com") canUseGitSource = await L3e(repoInfo.owner, repoInfo.name, signal), sourceReason = canUseGitSource ? "github_preflight_ok" : "github_preflight_failed";else canUseGitSource = !0, sourceReason = "ghes_optimistic";
    } else if (forceBundle) sourceReason = "forced_bundle";else if (isShallowOrUnusualRepo) sourceReason = "no_github_remote";
    if (!canUseGitSource && !bundleEnabled && repoInfo) canUseGitSource = !0;
    if (canUseGitSource && repoInfo) {
      let {
          host: host,
          owner: owner,
          name: name
        } = repoInfo,
        revision = params.branchName ?? (await Zx()) ?? void 0;
      A(`[teleportToRemote] Git source: ${host}/${owner}/${name}, revision: ${revision ?? "none"}`), gitSource = {
        type: "git_repository",
        url: `https://${host}/${owner}/${name}`,
        revision: revision,
        ...(params.reuseOutcomeBranch && {
          allow_unrestricted_git_push: !0
        })
      }, gitOutcome = {
        type: "git_repository",
        git_info: {
          type: "github",
          repo: `${owner}/${name}`,
          branches: [outcomeBranch]
        }
      };
    }
    if (!gitSource && bundleEnabled) {
      A("[teleport] phase: bundle-upload"), A(`[teleportToRemote] Bundling (reason: ${sourceReason})`);
      let bundleResult = await Pco({
        oauthToken: accessToken,
        sessionId: It(),
        baseUrl: Hs().BASE_API_URL
      }, {
        signal: signal
      });
      if (!bundleResult.success) {
        A(`Bundle upload failed: ${bundleResult.error}`, {
          level: "error"
        });
        let githubSetupHint = repoInfo ? ". Please setup GitHub on https://claude.ai/code" : "",
          bundleFailMessage: string;
        switch (bundleResult.failReason) {
          case "empty_repo":
            bundleFailMessage = 'Repository has no commits — run `git add . && git commit -m "initial"` then retry';
            break;
          case "too_large":
            bundleFailMessage = `Repo is too large to teleport${githubSetupHint}`;
            break;
          case "git_error":
            bundleFailMessage = `Failed to create git bundle (${bundleResult.error})${githubSetupHint}`;
            break;
          case "stash_failed":
          case "no_changes":
            bundleFailMessage = bundleResult.error;
            break;
          case void 0:
            bundleFailMessage = `Bundle upload failed: ${bundleResult.error}${githubSetupHint}`;
            break;
          default:
            {
              let exhaustiveCheck = bundleResult.failReason;
              bundleFailMessage = `Bundle upload failed: ${bundleResult.error}`;
            }
        }
        return params.onBundleFail?.(bundleFailMessage, "bundle"), null;
      }
      seedBundleFileId = bundleResult.fileId, W("tengu_teleport_bundle_mode", {
        size_bytes: bundleResult.bundleSizeBytes,
        scope: Le(bundleResult.scope),
        has_wip: bundleResult.hasWip,
        reason: Le(sourceReason)
      });
    }
    if (W("tengu_teleport_source_decision", {
      reason: Le(sourceReason),
      path: Ve(gitSource ? "github" : seedBundleFileId ? "bundle" : "empty")
    }), !gitSource && !seedBundleFileId) {
      if (isByocEnv) {
        let errMsg = `The selected environment "${selectedEnv?.name ?? selectedEnvId}" requires a git source, but no GitHub remote was detected. Check that \`git remote get-url origin\` returns a GitHub URL.`;
        return A(`[teleportToRemote] ${errMsg} (byoc env, sourceReason=${sourceReason})`, {
          level: "error"
        }), params.onCreateFail?.(errMsg, "byoc_no_git_source"), null;
      }
      A("[teleportToRemote] No repository detected — session will have an empty sandbox");
    }
    let sessionsUrl = `${Hs().BASE_API_URL}/v1/sessions`,
      requestHeaders = {
        ...YS(accessToken),
        "anthropic-beta": "ccr-byoc-2025-07-29",
        "x-organization-uuid": orgUuid
      },
      sessionContext = {
        sources: gitSource ? [gitSource] : [],
        ...(seedBundleFileId && {
          seed_bundle_file_id: seedBundleFileId
        }),
        outcomes: gitOutcome ? [gitOutcome] : [],
        model: params.model ?? gs(),
        ...(params.reuseOutcomeBranch && {
          reuse_outcome_branches: !0
        }),
        ...(params.githubPr && {
          github_pr: params.githubPr
        }),
        ...(Object.keys(envVars).length > 0 && {
          environment_variables: envVars
        }),
        ...(params.appendSystemPrompt && {
          append_system_prompt: params.appendSystemPrompt
        }),
        ...(params.outputSchema && {
          output_schema: params.outputSchema
        })
      },
      events = NFa({
        initialMessage: initialMessage,
        initialMessageUuid: params.initialMessageUuid,
        permissionMode: params.permissionMode,
        ultraplan: params.ultraplan
      }),
      requestBody = {
        title: params.ultraplan ? `ultraplan: ${sessionTitle}` : sessionTitle,
        events: events,
        session_context: sessionContext,
        ...OBt(selectedEnvId),
        ...(params.tags && {
          tags: params.tags
        })
      };
    A(`Creating session with payload: ${Pe(requestBody, null, 2)}`), A("[teleport] phase: POST-sent");
    let createResponse = await ho.post(sessionsUrl, requestBody, {
      headers: requestHeaders,
      signal: signal,
      validateStatus: (status: number) => status < 500
    });
    if (A(`[teleport] phase: POST-response status=${createResponse.status}`), !(createResponse.status === 200 || createResponse.status === 201)) {
      let errMsg = `API request failed with status ${createResponse.status}: ${createResponse.statusText}

Response data: ${Pe(createResponse.data, null, 2)}`,
        errorData = createResponse.data,
        errorType = errorData?.error?.type,
        errorReason = errorData?.error?.reason,
        errorMessage = errorData?.error?.message,
        parsedSource = gitSource ? hoe(gitSource.url) : null,
        sourceDescription = parsedSource ? `${parsedSource.owner}/${parsedSource.name}` : seedBundleFileId ? "a seed bundle (no git source)" : gitSource?.url ?? "no source",
        sentAnthropicMonorepo = parsedSource !== null && parsedSource.host.toLowerCase() === "github.com" && parsedSource.owner.toLowerCase() === "anthropics" && parsedSource.name.toLowerCase() === "anthropic",
        isMonorepoSourceError = typeof errorMessage === "string" && errorMessage.includes("source repository configuration is not permitted for this environment") || typeof errorReason === "string" && ["monorepo_source_disallowed", "monorepo_byoc_source_missing", "monorepo_source_env_mismatch"].includes(errorReason) || createResponse.status === 400 && !errorReason && errorType === "invalid_request_error" && !isByocEnv && gitSource !== null && !seedBundleFileId && sentAnthropicMonorepo && typeof errorMessage === "string" && /^the request was invalid\.?$/i.test(errorMessage);
      if ([401, 403, 429].includes(createResponse.status) || errorReason === "github_repo_access_denied" || isMonorepoSourceError) A(errMsg, {
        level: "error"
      });else {
        let sanitizeErrorField = (value: any) => value && /^[a-z][a-z0-9_]*$/.test(value) ? value : void 0;
        Ie(Error(`[type=${sanitizeErrorField(errorType)},reason=${sanitizeErrorField(errorReason)},isByocEnv=${isByocEnv},sentMonorepo=${sentAnthropicMonorepo}] ${errMsg}`));
      }
      let createFailMessage = errorMessage || `${createResponse.status} ${createResponse.statusText || ""}`.trim();
      if (isMonorepoSourceError) createFailMessage = sentAnthropicMonorepo ? `The source anthropics/anthropic requires a monorepo environment, but "${selectedEnv?.name ?? selectedEnvId}" was selected. Configure a monorepo environment, or run from a different repository.` : `The selected environment "${selectedEnv?.name ?? selectedEnvId}" only accepts the Anthropic monorepo (anthropics/anthropic), but the source was ${sourceDescription}. Run this from a monorepo checkout, or select a different environment.`;
      return params.onCreateFail?.(createFailMessage, "create_request_failed"), null;
    }
    let createData = createResponse.data;
    if (!createData || typeof createData.id !== "string") return Ie(Error(`Cannot determine session ID from API response: ${Pe(createResponse.data)}`)), params.onCreateFail?.("Server returned a malformed session response (no session id)", "malformed_response"), null;
    return A(`Successfully created remote session: ${createData.id}`), MFa(createData.id, params.source, {
      project: gitSource !== null && sourceReason !== "github_preflight_failed",
      global: seedBundleFileId === null
    }), {
      id: createData.id,
      title: createData.title || requestBody.title
    };
  } catch (err) {
    let normalizedError = mo(err);
    if (R_(err) || ho.isCancel(err)) return A(`Remote session create aborted: ${normalizedError.message}`), null;
    let isNetworkError = j_(err);
    if (isNetworkError) A(`Remote session create failed (network): ${normalizedError.message}`, {
      level: "error"
    });else Ie(normalizedError);
    return params.onCreateFail?.(`Cloud session create failed: ${normalizedError.message}`, isNetworkError ? "network_error" : "exception"), null;
  }
}

/**
 * Archives a remote session (best-effort). Treats 200 and 409 (already
 * archived) as success.
 * @param sessionId - the cloud session ID.
 * @param timeoutMs - request timeout (default 10s).
 */
async function archiveRemoteSession(sessionId: string, timeoutMs: number = 1e4) {
  if (!Nl()) return A(`[archiveRemoteSession] ${sessionId} skipped: non-first-party provider`), !1;
  let accessToken = i$n();
  if (!accessToken) return !1;
  let archiveUrl = `${Hs().BASE_API_URL}/v1/code/sessions/${sessionId}/archive`;
  try {
    let response = await ho.post(archiveUrl, {}, {
      headers: YS(accessToken),
      timeout: timeoutMs,
      validateStatus: (status: number) => status < 500
    });
    if (response.status === 200 || response.status === 409) return A(`[archiveRemoteSession] archived ${sessionId}`), !0;
    return A(`[archiveRemoteSession] ${sessionId} failed ${response.status}: ${Pe(response.data)}`), !1;
  } catch (err) {
    return A(`[archiveRemoteSession] ${sessionId} failed: ${Ce(err)}`, {
      level: "error"
    }), !1;
  }
}

/**
 * Sends an interrupt control-request to a remote session (best-effort).
 * @param sessionId - the cloud session ID.
 * @param timeoutMs - request timeout (default 10s).
 */
async function interruptRemoteSession(sessionId: string, timeoutMs: number = 1e4) {
  if (!Nl()) return A(`[interruptRemoteSession] ${sessionId} skipped: non-first-party provider`), !1;
  let accessToken = i$n();
  if (!accessToken) return !1;
  try {
    let normalizedSessionId = OD(sessionId);
    if (!/^session_[A-Za-z0-9_-]+$/.test(normalizedSessionId)) return !1;
    let orgUuid = await y2();
    if (!orgUuid) return !1;
    let {
        url: interruptUrl,
        body: interruptBody
      } = BOn(Hs().BASE_API_URL, normalizedSessionId, [{
        type: "control_request",
        request_id: dut.randomUUID(),
        request: {
          subtype: "interrupt"
        },
        uuid: dut.randomUUID()
      }], put()),
      trustedDeviceToken = await qW(),
      response = await ho.post(interruptUrl, interruptBody, {
        headers: {
          ...YS(accessToken),
          "anthropic-beta": B2r,
          "x-organization-uuid": orgUuid,
          ...(trustedDeviceToken && {
            "X-Trusted-Device-Token": trustedDeviceToken
          })
        },
        timeout: timeoutMs,
        validateStatus: (status: number) => status < 500
      });
    if (response.status >= 200 && response.status < 300) return A(`[interruptRemoteSession] interrupted ${sessionId}`), !0;
    return A(`[interruptRemoteSession] ${sessionId} failed ${response.status}: ${Pe(response.data)}`), !1;
  } catch (err) {
    return A(`[interruptRemoteSession] ${sessionId} failed: ${Ce(err)}`, {
      level: "error"
    }), !1;
  }
}

/**
 * Subscribes a remote session to a GitHub PR (delegates to the shared
 * subscribe/unsubscribe helper).
 */
function subscribeRemoteSessionToPR(sessionId: any, prNumber: any, options: any) {
  return LBt("subscribe", sessionId, prNumber, options, Hs().BASE_API_URL, () => qs()?.accessToken, qW);
}

var dut: typeof import("crypto"),
  o$n: any,
  lwp = `You are coming up with a succinct title and git branch name for a coding session based on the provided description. The title should be clear, concise, and accurately reflect the content of the coding task.
You should keep it short and simple, ideally no more than 6 words. Avoid using jargon or overly technical terms unless absolutely necessary. The title should be easy to understand for anyone reading it.
Use sentence case for the title (capitalize only the first word and proper nouns), not Title Case.

The branch name should be clear, concise, and accurately reflect the content of the coding task.
You should keep it short and simple, ideally no more than 4 words. The branch should always start with "claude/" and should be all lower case, with words separated by dashes.

Return a JSON object with "title" and "branch" fields.

Example 1: {"title": "Fix login button not working on mobile", "branch": "claude/fix-mobile-login-button"}
Example 2: {"title": "Update README with installation instructions", "branch": "claude/update-readme"}
Example 3: {"title": "Improve performance of data processing script", "branch": "claude/improve-data-processing"}

Here is the session description:
<description>{description}</description>
Please generate a title and branch name for this session.`;
var qD = b(() => {
  bre();
  ap();
  Gc();
  lt();
  jn();
  kt();
  Bu();
  Qr();
  pH();
  Rto();
  wto();
  Fj();
  fco();
  Sc();
  WW();
  QT();
  rb();
  W2n();
  aI();
  pq();
  Ph();
  lo();
  Zdn();
  bIe();
  tr();
  Xle();
  Po();
  qe();
  _0();
  dn();
  Ct();
  Ii();
  Ret();
  Xo();
  ia();
  pd();
  vn();
  po();
  Ro();
  Ps();
  Z2e();
  _a();
  br();
  tn();
  NR();
  nle();
  Oco();
  dut = require("crypto"), o$n = x(oe(), 1);
});

export {f9t,iwp,awp,cwp,validateGitState,uwp,dwp,pwp,r$n,processMessagesForTeleportResume,checkOutTeleportedSessionBranch,validateSessionRepository,teleportResumeCodeSession,mwp,MFa,teleportToRemoteWithErrorHandling,teleportFromSessionsAPI,i$n,pollRemoteSessionEvents,awaitRemoteSessionResult,NFa,teleportToRemote,archiveRemoteSession,interruptRemoteSession,subscribeRemoteSessionToPR,dut,o$n,lwp,qD};
