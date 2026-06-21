// @ts-nocheck
import {b,M as L} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {qe as je,logForDebugging as v} from "../config/0234_setHasFormattedOutput.ts";
import {zn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {gT as dT,si as ei} from "../../vendor/m2190.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function isValidSkillHealth(value) {
  return typeof value === "string" && VALID_HEALTH_VALUES.has(value);
}
function useSkillHealthMap() {
  let [skillHealthMap, setSkillHealthMap] = EU6.useState(null);
  return EU6.useEffect(() => {
    let cancelled = false;
    return fetchSkillHealthMap().then(result => {
      if (!cancelled && result) setSkillHealthMap(result);
    }), () => {
      cancelled = true;
    };
  }, []), skillHealthMap;
}
var EU6, VALID_HEALTH_VALUES, fetchSkillHealthMap;
var VALID_HEALTH_VALUES_2 = b(() => {
  na();
  je();
  Yn();
  dT();
  EU6 = L(Te(), 1), VALID_HEALTH_VALUES = new Set(["good", "warn", "poor"]);
  fetchSkillHealthMap = bn(async () => {
    if (!ut("tengu_skills_dashboard_enabled", false)) return null;
    try {
      let e = await ei.get("/api/claude_code/skills", {
        auth: "async",
        timeout: 5000,
        validateStatus: () => true
      });
      if (!e.ok) return v(`Skill health fetch skipped: ${e.reason}`), null;
      if (e.status >= 400) return v(`Skill health fetch skipped: status ${e.status}`), null;
      let t = e.data?.skills;
      if (!Array.isArray(t)) return null;
      let n = new Map();
      for (let r of t) if (r.skill_name && isValidSkillHealth(r.health)) n.set(r.skill_name, r.health);
      return n;
    } catch (e) {
      return v(`Skill health fetch skipped: ${e}`), null;
    }
  });
});

export {isValidSkillHealth as qYp,useSkillHealthMap as Qml,EU6 as uWn,VALID_HEALTH_VALUES as $Yp,fetchSkillHealthMap as jYp,VALID_HEALTH_VALUES_2 as Zml};
