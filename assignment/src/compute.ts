import { Game, Frame, LastFrame } from "./types";

export function compute(game: Game): number {
  let totalScore = 0;

  // Doorloop de eerste negen frames
  for (let frameIndex = 0; frameIndex < 9; frameIndex++) {
    const frame = game[frameIndex] as Frame;
    const [firstThrow, secondThrow] = frame;

    if (firstThrow === 10) {
      // Strike
      totalScore += 10 + strikeBonus(game, frameIndex);
    } else if (firstThrow + secondThrow === 10) {
      // Spare
      totalScore += 10 + spareBonus(game, frameIndex);
    } else {
      // Open Frame
      totalScore += firstThrow + secondThrow;
    }
  }

  // Verwerk het laatste frame apart
  const lastFrame = game[9];
  for (let pins of lastFrame) {
    totalScore += pins;
  }

  return totalScore;
}

function strikeBonus(game: Game, frameIndex: number): number {
    const nextFrame = game[frameIndex + 1];
    
    // Controleer of het volgende frame ook een strike is
    if (nextFrame[0] === 10) {
      // Controleer of nextFrame van het type LastFrame is en dus lengte 3 heeft
      if (nextFrame.length === 3) {
        // Voeg alleen de eerste twee worpen van het laatste frame toe als bonus
        return 10 + nextFrame[1];
      } else {
        // Voeg de eerste worp van het frame na nextFrame toe als bonus
        const frameAfterNext = game[frameIndex + 2];
        return 10 + (frameAfterNext ? frameAfterNext[0] : 0);
      }
    } else {
      // Als het volgende frame geen strike is, tel de twee worpen van dat frame op
      return nextFrame[0] + nextFrame[1];
    }
  }

function spareBonus(game: Game, frameIndex: number): number {
  const nextFrame = game[frameIndex + 1];
  return nextFrame[0];
}
