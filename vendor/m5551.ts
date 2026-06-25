// @ts-nocheck
import {b} from "../runtime.ts";
import {lt} from "../src/session/0132_sent.ts";
import {nge} from "../src/tools/2691_getSkillToolInfo.ts";
import {L6t} from "../src/config/4379_commit.ts";
import {ia} from "./m698.ts";
import {Q5e} from "./m4347.ts";
import {_3e} from "./m3266.ts";
import {H6t} from "./m4364.ts";
import {Zm} from "../src/config/2709_Zm.ts";
import {gDe} from "./m4377.ts";
import {Cb} from "./m5036.ts";
var Iqm,DaE;
var Hnc=b(()=>{lt();nge();L6t();ia();Q5e();_3e();H6t();Zm();gDe();Cb();Iqm=["git status *","git log *","git diff *","git branch *","git checkout -b *","git push *","gh pr create *","gh pr view *"],DaE=Iqm.flatMap((e)=>[`Bash(${e})`,`PowerShell(${e})`])});
export {Iqm,DaE,Hnc};
