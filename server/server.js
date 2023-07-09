const { instrument } = require("@socket.io/admin-ui");
const connect = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: ["http://127.0.0.1:5500", "https://admin.socket.io", "*"],
      credentials: false,
    },
  });

  //   const io = require("socket.io")(server, {
  //     cors: {},
  //   });

  io.on("connection", (stream) => {
    console.log("someone connected...", stream.id);
  });
  instrument(io, {
    auth: false,
    mode: "development",
  });
};

module.exports = connect;
