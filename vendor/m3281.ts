// @ts-nocheck
import {b} from "../runtime.ts";
var gXd,pma;
var mma=b(()=>{gXd={name:"srun",description:"Run a command on SLURM cluster nodes",options:[{name:["-n","--ntasks"],description:"Number of tasks",args:{name:"count",description:"Number of tasks to run"}},{name:["-N","--nodes"],description:"Number of nodes",args:{name:"count",description:"Number of nodes to allocate"}}],args:{name:"command",description:"Command to run on the cluster",isCommand:!0}},pma=gXd});
export {gXd,pma,mma};
