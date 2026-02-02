import { computed, Injectable, signal } from '@angular/core';
import { Cell, GameStatus, GameWinner } from '@models';

//todo add .env file ❗❗❗
// const GRID_SIZE = 100;
const WIN_SCORE = 10;
const DEFAULT_TIME_LIMIT = 1000;

@Injectable()
export class GameStateService {
  readonly cells = signal<Cell[]>([]);

  readonly status = signal<GameStatus>(GameStatus.Idle);

  readonly activeCellId = signal<number | null>(null);

  readonly timeLimit = signal(DEFAULT_TIME_LIMIT);

  readonly computerScore = signal(0);

  readonly playerScore = signal(0);

  readonly winner = computed(() => {
    if (this.playerScore() >= WIN_SCORE) return GameWinner.Player;
    if (this.computerScore() >= WIN_SCORE) return GameWinner.Computer;
    return null;
  });

  private roundTimeoutId: number | null = null;

  setRoundTimeoutId(id: number | null) {
    this.roundTimeoutId = id;
  }

  getRoundTimeoutId() {
    return this.roundTimeoutId;
  }
}
