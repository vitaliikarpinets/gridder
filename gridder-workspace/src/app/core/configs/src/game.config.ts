import { GameConfig } from '@models';

export const DEFAULT_GAME_CONFIG: GameConfig = {
  gridColumns: 10,
  gridRows: 10,
  defaultTimeLimit: 1000,
  minTimeLimit: 500,
  maxTimeLimit: 10000,
  winScore: 10,
};
