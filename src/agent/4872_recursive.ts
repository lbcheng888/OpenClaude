// @ts-nocheck
import {tr as $8,sn as w6} from "../config/0047_namespace.ts";
import {findGitRoot as y5,Ba as mK} from "../../vendor/m693.ts";
import {Qqe as gpH,D6 as YU} from "./5186_bigint.ts";
import {Wfe as wzH,fsModule as at} from "../../vendor/m2246.ts";
import {dn as L6,bt as G_} from "../../vendor/m195.ts";
import {invalidateWorkflowCache as dI6,j9t as sI_} from "../../vendor/m4183.ts";
import {Sf as Lz,mvo as RMq} from "../tools/5142_toSlashCommands.ts";
import {Bv as L2,Ftl as nsK} from "./4429_tryGetPDFReference.ts";
import {logEvent as c,Ct as E_} from "../../vendor/m131.ts";
import {fromEnum as cH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getWorkflowsDir(scope, cwd) {
  if (scope === "user") return fsPathModule.join($8(), "workflows");
  let gitRoot = y5(cwd);
  if (gitRoot === null) return fsPathModule.join(cwd, ".claude", "workflows");
  let projectClaudePath = gpH("workflows", cwd)[0];
  if (projectClaudePath !== undefined) return projectClaudePath;
  return fsPathModule.join(gitRoot, ".claude", "workflows");
}
async function fJ4(workflowDef) {
  let sanitizedName = wzH(workflowDef.name),
    workflowsDir = getWorkflowsDir(workflowDef.scope, workflowDef.cwd),
    filePath = fsPathModule.join(workflowsDir, `${sanitizedName}.js`);
  await fsPromisesModule.mkdir(workflowsDir, {
    recursive: true,
    mode: 448
  });
  try {
    await fsPromisesModule.writeFile(filePath, workflowDef.script, {
      encoding: "utf8",
      mode: 384,
      flag: workflowDef.overwrite ? "w" : "wx"
    });
  } catch (err) {
    if (L6(err) === "EEXIST") throw Error(`Dynamic workflow "${sanitizedName}" already exists at ${filePath}. Use a different name or overwrite.`);
    throw err;
  }
  dI6();
  let [{
    clearCommandMemoizationCaches: clearCommandMemoizationCaches
  }, {
    resetSentSkillNames: resetSentSkillNames
  }] = await Promise.all([Promise.resolve().then(() => (Lz(), RMq)), Promise.resolve().then(() => (L2(), nsK))]);
  return clearCommandMemoizationCaches(), resetSentSkillNames(), c("tengu_workflow_saved", {
    scope: cH(workflowDef.scope),
    overwrite: workflowDef.overwrite,
    script_size_chars: workflowDef.script.length
  }), {
    name: sanitizedName,
    path: filePath,
    scope: workflowDef.scope
  };
}
var fsPromisesModule, fsPathModule;
var jJ4 = L(() => {
  E_();
  w6();
  G_();
  mK();
  YU();
  sI_();
  at();
  fsPromisesModule = require("fs/promises"), fsPathModule = require("path");
});

export {getWorkflowsDir as Qom,fJ4 as AEl,fsPromisesModule as JGn,fsPathModule as s8t,jJ4 as hEl};
