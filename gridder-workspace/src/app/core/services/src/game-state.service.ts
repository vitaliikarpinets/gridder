import { computed, inject, Injectable, signal } from '@angular/core';
import { Cell, GameStatus, GameWinner } from '@models';
import { GAME_CONFIG } from '@tokens';

@Injectable()
export class GameStateService {
  private readonly gameConfig = inject(GAME_CONFIG);

  readonly cells = signal<Cell[]>([]);

  readonly status = signal<GameStatus>(GameStatus.Idle);

  readonly activeCellId = signal<number | null>(null);

  readonly timeLimit = signal(this.gameConfig.defaultTimeLimit);

  readonly computerScore = signal(0);

  readonly playerScore = signal(0);

  readonly winner = computed(() => {
    if (this.playerScore() >= this.gameConfig.winScore) return GameWinner.Player;
    if (this.computerScore() >= this.gameConfig.winScore) return GameWinner.Computer;
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
