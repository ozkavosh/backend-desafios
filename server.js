import httpServer from "./app.js";
import cluster from "cluster";
import { cpus } from "os";
import minimist from "minimist";
const argv = minimist(process.argv.slice(2));
const PORT = argv.puerto || argv.PUERTO || argv.port || argv.PORT || 8080;
const mode = argv.mode || argv.MODE || argv.modo || argv.MODO || "FORK";

if (cluster.isPrimary && mode == "CLUSTER") {
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }
} else {
  const server = httpServer.listen(PORT, () => {
    console.log(
      `Servidor listo y escuchando en el puerto ${server.address().port} Modo: ${mode}`
    );
  });
}
