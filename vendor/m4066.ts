// @ts-nocheck
import {b} from "../runtime.ts";
import {ef,Ws} from "./m2248.ts";
var f2a="Edit a cell in a Jupyter notebook \u2014 replace, insert, or delete.",A2a;
var h2a=b(()=>{ef();A2a=`Replaces, inserts, or deletes a single cell in a Jupyter notebook (.ipynb file).

Usage:
- You must use the ${Ws} tool on the notebook in this conversation before editing \u2014 this tool will fail otherwise.
- \`notebook_path\` must be an absolute path.
- \`cell_id\` is the \`id\` attribute shown in the ${Ws} tool's \`<cell id="...">\` output. It is required for \`replace\` and \`delete\`.
- \`edit_mode\` defaults to \`replace\`. Use \`insert\` to add a new cell after the cell with the given \`cell_id\` (or at the beginning of the notebook if \`cell_id\` is omitted) \u2014 \`cell_type\` is required when inserting. Use \`delete\` to remove the cell.`});
export {f2a,A2a,h2a};
