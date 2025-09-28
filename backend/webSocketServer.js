import { WebSocketServer } from "ws";
import logger from "./util/logger.js";

let webSocketServer;

function initWebSocketServer(server) {
  webSocketServer = new WebSocketServer({ server });

  // userId: socket
  webSocketServer.userSockets = new Map();

  webSocketServer.on("connection", (socket, req) => {
    logger.info("Starting websocket connection...");

    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const userId = reqUrl.searchParams.get("userId");

    if (!userId) {
      socket.close();
      logger.error("missing query params");
      return;
    }

    webSocketServer.userSockets.set(userId, socket);
    logger.info(
      "Active connections with users: " +
        Array.from(webSocketServer.userSockets.keys())
    );

    socket.on("close", () => {
      logger.info("Closing websocket connection");
      logger.info(
        "Active connections with users: " +
          Array.from(webSocketServer.userSockets.keys())
      );
      webSocketServer.userSockets.delete(userId);
    });
  });
}

function sendNotification(userId, notification) {
  logger.info(`Sending ${notification.type} notification to user ${userId}`);

  const userSocket = webSocketServer.userSockets.get(String(userId));
  if (userSocket) {
    userSocket.send(
      JSON.stringify({ ...notification, messageType: "notification" })
    );
  }
}

export { initWebSocketServer, webSocketServer, sendNotification };
