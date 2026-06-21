// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {is1PEventLoggingEnabled,I1} from "../session/2197_shutdown1PEventLogging.ts";
import {getCurrentProjectConfig,saveCurrentProjectConfig,Qn,checkHasTrustDialogAccepted} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Ie,ln} from "../telemetry/0594_feature_name.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Go,Pt} from "../../vendor/m632.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {oa,execFileNoThrowWithCwd} from "../../vendor/m684.ts";
import {Ba,findGitRoot,gitExe} from "../../vendor/m693.ts";
import {JQ,Ise} from "../../vendor/m2034.ts";
/**
 * Parse a .claude/ path string into a typed artifact descriptor (skill or command).
 * Returns null if the path does not match a recognized artifact pattern.
 */
function MLa(path: string): any {
  let parts = path.split("/");
  if (parts[0] !== ".claude" || parts.length < 3) return null;
  switch (parts[1]) {
    case "skills":
      if (parts.length === 4 && parts[3] === "SKILL.md") return {
        kind: "skill",
        name: parts[2]
      };
      return null;
    case "commands":
      {
        let fileName = parts.at(-1);
        if (!fileName.endsWith(".md")) return null;
        // skill.md files nested inside commands are treated specially
        if (/^skill\.md$/i.test(fileName)) return parts.length < 4 ? null : {
          kind: "command",
          name: parts.slice(2, -1).join(":")
        };
        return {
          kind: "command",
          name: parts.slice(2).join(":").slice(0, -3)
        };
      }
    default:
      return null;
  }
}

/**
 * Returns the author of a team artifact by name if the feature flag is enabled
 * and the artifact was not authored by the current user.
 */
function U2t(configKind: string, artifactName: string): any {
  if (configKind !== "projectSettings" || !getFeatureValue_CACHED_MAY_BE_STALE("tengu_tussock_oriole", !1)) return null;
  return NLa?.find((artifact: any) => !artifact.byCurrentUser && artifact.name === artifactName)?.author || null;
}

/**
 * Returns true if there are unseen team artifacts in the current project config,
 * and triggers async 1P event logging side-effect if enabled.
 */
function BLa(): any {
  if (is1PEventLoggingEnabled()) Sio().catch(() => {});
  if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_tussock_oriole", !1)) return !1;
  return getCurrentProjectConfig().hasUnseenTeamArtifacts === !0;
}

/**
 * Returns team artifacts that have not yet been seen by the current user.
 */
async function FLa(): Promise<any> {
  let allArtifacts = await Sio();
  if (allArtifacts.length === 0) return [];
  let seenPaths = new Set(getCurrentProjectConfig().seenTeamArtifactPaths ?? []);
  return allArtifacts.filter((artifact: any) => !artifact.byCurrentUser && !seenPaths.has(artifact.path));
}

/**
 * Marks all team artifacts as seen by persisting their paths in the project config.
 */
async function ULa(): Promise<any> {
  let teamPaths = (await Sio()).filter((artifact: any) => !artifact.byCurrentUser).map((artifact: any) => artifact.path),
    teamPathSet = new Set(teamPaths);
  saveCurrentProjectConfig((config: any) => {
    let existing = config.seenTeamArtifactPaths ?? [],
      merged = [...existing.filter((p: any) => !teamPathSet.has(p)), ...teamPaths].slice(-LLa);
    if (merged.length === existing.length && merged.every((p: any, idx: any) => p === existing[idx]) && config.hasUnseenTeamArtifacts === !1) return config;
    return {
      ...config,
      seenTeamArtifactPaths: merged,
      hasUnseenTeamArtifacts: !1
    };
  });
}

/**
 * Logs a telemetry event for showing the team artifact tip banner,
 * including counts of skills, commands, and overflow.
 */
function $La(artifacts: any[]): any {
  let counts = {
    skill: 0,
    command: 0
  };
  for (let artifact of artifacts) counts[artifact.kind]++;
  Ie("tips_team_artifact_show"), logEvent("tengu_team_artifact_tip_shown", {
    skill_count: counts.skill,
    command_count: counts.command,
    overflow_count: Math.max(0, artifacts.length - OLa)
  });
}

/**
 * Returns metadata about how an artifact was surfaced (e.g. via team tip).
 */
function z4e(configKind: string, artifactName: string): any {
  if (configKind !== "projectSettings") return {};
  return {
    via_team_tip: (getCurrentProjectConfig().seenTeamArtifactPaths ?? []).some((p: any) => MLa(p)?.name === artifactName)
  };
}

/**
 * Formats a human-readable summary of new team artifacts for display in the UI.
 */
function qLa(artifacts: any[]): any {
  let teamArtifacts = artifacts.filter((artifact: any) => !artifact.byCurrentUser);
  if (teamArtifacts.length === 0) return "";
  let visible = teamArtifacts.slice(0, OLa),
    names = visible.map((artifact: any) => `/${artifact.name} (${artifact.author || "a teammate"})`),
    joined = names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`,
    overflow = teamArtifacts.length - visible.length;
  return `New from your team: ${joined}${overflow > 0 ? `, plus ${overflow} more` : ""}`;
}
var aSp: any,
  OLa: any = 3,
  LLa: any = 100,
  Sio: any,
  NLa: any;

/** Module initializer: sets up watched directories and the memoized Sio fetcher. */
var $2t = b(() => {
  ta();
  Qn();
  Go();
  qe();
  oa();
  Ba();
  JQ();
  ln();
  I1();
  zn();
  Ct();
  // Directories to scan for team artifacts
  aSp = [".claude/skills", ".claude/commands"];
  Sio = wn(async () => {
    if (!checkHasTrustDialogAccepted()) return [];
    let gitRoot = findGitRoot(Pt());
    if (!gitRoot) return [];
    let [{
      stdout: gitLog,
      code: exitCode
    }, currentUserEmail] = await Promise.all([execFileNoThrowWithCwd(gitExe(), ["-c", "core.quotePath=false", "-c", "core.fsmonitor=", "-c", "core.hooksPath=/dev/null", "-c", "core.pager=", "-c", "log.showSignature=false", "log", "--since=7.days", "--diff-filter=A", "--name-only", "--format=COMMIT%x00%an%x00%ae", "--", ...aSp], {
      cwd: gitRoot,
      timeout: 5000
    }), Ise()]);
    if (exitCode !== 0) return [];
    let currentEmailLower = currentUserEmail?.toLowerCase(),
      artifacts: any[] = [],
      seenFiles = new Set(),
      currentAuthor = "",
      currentAuthorEmail = "";
    // Parse git log output: COMMIT lines set context, file lines become artifacts
    for (let line of gitLog.split(`
`)) {
      if (line.startsWith("COMMIT\x00")) {
        let parts = line.split("\x00");
        currentAuthor = parts[1] ?? "", currentAuthorEmail = (parts[2] ?? "").toLowerCase();
        continue;
      }
      if (!line || seenFiles.has(line)) continue;
      seenFiles.add(line);
      let parsed = MLa(line);
      if (parsed) {
        let isByCurrentUser = Boolean(currentEmailLower && currentAuthorEmail === currentEmailLower);
        artifacts.push({
          path: line,
          author: currentAuthor,
          byCurrentUser: isByCurrentUser,
          ...parsed
        });
      }
    }
    NLa = artifacts;
    let config = getCurrentProjectConfig(),
      seenPaths = new Set(config.seenTeamArtifactPaths ?? []),
      hasUnseen = artifacts.some((artifact: any) => !artifact.byCurrentUser && !seenPaths.has(artifact.path)),
      loggedAuthoredPaths = new Set(config.loggedAuthoredArtifactPaths ?? []),
      newAuthoredArtifacts = artifacts.filter((artifact: any) => artifact.byCurrentUser && !loggedAuthoredPaths.has(artifact.path));
    // Log telemetry for newly authored artifacts
    for (let artifact of newAuthoredArtifacts) logEvent("tengu_skill_authored", {
      is_skill: artifact.kind === "skill"
    });
    try {
      saveCurrentProjectConfig((config: any) => {
        let unseenUnchanged = config.hasUnseenTeamArtifacts === hasUnseen;
        if (newAuthoredArtifacts.length === 0 && unseenUnchanged) return config;
        let updated = unseenUnchanged ? config : {
          ...config,
          hasUnseenTeamArtifacts: hasUnseen
        };
        if (newAuthoredArtifacts.length === 0) return updated;
        let existingLogged = updated.loggedAuthoredArtifactPaths ?? [],
          newPaths = newAuthoredArtifacts.map((artifact: any) => artifact.path),
          newPathSet = new Set(newPaths),
          mergedLogged = [...existingLogged.filter((p: any) => !newPathSet.has(p)), ...newPaths].slice(-LLa);
        return {
          ...updated,
          loggedAuthoredArtifactPaths: mergedLogged
        };
      });
    } catch (err: any) {
      logForDebugging(`team-artifact eligibility persist failed: ${err}`);
    }
    return artifacts;
  });
});
export {MLa,U2t,BLa,FLa,ULa,$La,z4e,qLa,aSp,OLa,LLa,Sio,NLa,$2t};
