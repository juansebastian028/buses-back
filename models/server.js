const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const { createServer } = require("http");
const { dbConnection } = require("../database/config");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server, { cors: { origin: "*" } });

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      busRoutes: "/api/bus-routes",
      roles: "/api/roles",
      posts: "/api/posts",
      uploads: "/api/uploads",
    };

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    // Sockets
    this.sockets();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));

    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        // tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.busRoutes, require("../routes/busRoute"));
    this.app.use(this.paths.roles, require("../routes/role"));
    this.app.use(this.paths.posts, require("../routes/posts"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
