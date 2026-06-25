// @ts-nocheck
import {b} from "../runtime.ts";
import {dm,vs} from "./m2256.ts";
var WUa="Edit a cell in a Jupyter notebook \u2014 replace, insert, or delete.",GUa;
var VUa=b(()=>{dm();GUa=`Replaces, inserts, or deletes a single cell in a Jupyter notebook (.ipynb file).

Usage:
- You must use the ${vs} tool on the notebook in this conversation before editing \u2014 this tool will fail otherwise.
- \`notebook_path\` must be an absolute path.
- \`cell_id\` is the \`id\` attribute shown in the ${vs} tool's \`<cell id="...">\` output. It is required for \`replace\` and \`delete\`.
- \`edit_mode\` defaults to \`replace\`. Use \`insert\` to add a new cell after the cell with the given \`cell_id\` (or at the beginning of the notebook if \`cell_id\` is omitted) \u2014 \`cell_type\` is required when inserting. Use \`delete\` to remove the cell.`});
export {WUa,GUa,VUa};
