import util from "util";
import child_porcess from "child_process";
export const execPromisify = util.promisify(child_porcess.exec);
