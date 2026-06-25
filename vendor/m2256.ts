// @ts-nocheck
import {Mh,mI} from "../src/config/2029_mI.ts";
import {Oet,hEn} from "./m2255.ts";
import {b} from "../runtime.ts";
function VEi(){return GEi}
function _En(e){return e.startsWith(kcd)||e.startsWith(GEi)}
function JEi(e,t,n,r){if(Mh(e))return`Reads a file from the local filesystem.

- \`file_path\` must be an absolute path.
- Reads up to ${Met} lines by default${n}.
${r}
${t}
- Reads images (PNG, JPG, \u2026) and presents them visually.${Oet()?' Reads PDFs via the `pages` parameter (e.g. "1-5", max 20 pages/request; required for PDFs over 10 pages).':""} Reads Jupyter notebooks (.ipynb) as cells with outputs.
- Reading a directory, a missing file, or an empty file returns an error or system reminder rather than content.${WEi}`;return`Reads a file from the local filesystem. You can access any file directly by using this tool.
Assume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.

Usage:
- The file_path parameter must be an absolute path, not a relative path
- By default, it reads up to ${Met} lines starting from the beginning of the file${n}
${r}
${t}
- This tool allows Claude Code to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as Claude Code is a multimodal LLM.${Oet()?`
- This tool can read PDF files (.pdf). For large PDFs (more than 10 pages), you MUST provide the pages parameter to read specific page ranges (e.g., pages: "1-5"). Reading a large PDF without the pages parameter will fail. Maximum 20 pages per request.`:""}
- This tool can read Jupyter notebooks (.ipynb files) and returns all cells with their outputs, combining code, text, and visualizations.
- This tool can only read files, not directories. To list files in a directory, use the registered shell tool.
- You will regularly be asked to read screenshots. If the user provides a path to a screenshot, ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths.
- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.${WEi}`}
var vs="Read",WEi=`
- Do NOT re-read a file you just edited to verify \u2014 Edit/Write would have errored if the change failed, and the harness tracks file state for you.`,gEn=" (file state is current in your context \u2014 no need to Read it back)",kcd="File unchanged since last read. The content from the earlier Read tool_result in this conversation is still current \u2014 refer to that instead of re-reading.",GEi="Wasted call \u2014 file unchanged since your last Read. Refer to that earlier tool_result instead.",DDt="[Truncated: PARTIAL view \u2014 ",Met=2000,KEi="Read a file from the local filesystem.",C9r="- Results are returned using cat -n format, with line numbers starting at 1",zEi,jEi="- You can optionally specify a line offset and limit (especially handy for long files), but it's recommended to read the whole file by not providing these parameters",YEi="- When you already know which part of the file you need, only read that part. This can be important for larger files.";
var dm=b(()=>{mI();hEn();zEi=`${C9r}. Each line is the line number, a single separator (a tab or \`:\`), then the verbatim file content (including any leading whitespace).`});
export {VEi,_En,JEi,vs,WEi,gEn,kcd,GEi,DDt,Met,KEi,C9r,zEi,jEi,YEi,dm};
