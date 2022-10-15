import logger from "../utils/logger.js";
import { cpus } from "os";

export default class InfoController {
  getInfo(ctx) {
    try {
      ctx.body =
          {
            argumentos: process.argv.slice(2),
            plataforma: process.platform,
            node: process.version,
            rss: process.memoryUsage(),
            path: process.argv[1],
            pid: process.pid,
            carpeta: process.cwd(),
            numProcesadores: cpus().length,
          }
    } catch (e) {
      logger.error(e.message);
    }
  }
}
