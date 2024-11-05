import http from "http";
import express, { Request, Response } from "express";
import { compute } from "./compute";
import { Game, Frame, LastFrame } from "./types";

export const app = express();

app.use(express.json()); //Middleware om te parsen naar Json formaat

app.post("/compute", (request, response) => {
  const game: Game = request.body.game;
  // TODO: Validate input

  // Validatie: Controleer of het een Game is met precies 10 frames
  if (game.length !== 10) {
    return response
      .status(400)
      .send({ error: "Invalid input: Een game heeft altijd exact 10 frames!" });
  }

  // Controleer of de eerste 9 elementen Frames zijn en het 10e element een LastFrame is
  // 1. Checken alle elementen van game zijn een array
  // 2. Checken of de eerste 9 elementen een Frame zijn -> 2 elementen -> voor elk element typeof number
  // 3. Checken of het 10e element een LastFrame is -> 3 elementen -> voor elk element typeof number

  const isValidGame =
    game.every((frame) => frame instanceof Array) &&
    game
      .slice(0, 9)
      .every(
        (frame) =>
          frame.length === 2 && frame.every((pins) => typeof pins === "number")
      ) &&
    game[9].length === 3 &&
    game[9].every((pins) => typeof pins === "number");

  if (!isValidGame) {
    return response
      .status(400)
      .send({ error: "Invalid input" });
  }

  const score = compute(game);

  // TODO: Return response

  return response.status(200).send({ score });
});
