import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService, GameStateService } from '@services';
import { GameStatus } from '@models';
import { ModalComponent } from '@shared/components';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { GameScoreboardComponent } from './components/game-scoreboard/game-scoreboard.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';

@Component({
  selector: 'gridder-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ModalComponent, GameControlsComponent, GameScoreboardComponent, GameGridComponent],
  providers: [GameService, GameStateService],
})
export class GameComponent {
  readonly #game = inject(GameService);
  readonly #state = inject(GameStateService);

  readonly computerScore = this.#state.computerScore.asReadonly();
  readonly playerScore = this.#state.playerScore.asReadonly();
  readonly winner = this.#state.winner;

  readonly isGameFinished = computed(() => this.#state.status() === GameStatus.Finished);

  dissmissModal(): void {
    this.#state.status.set(GameStatus.Idle);
  }

  restartGame(): void {
    this.#game.initGame();
  }
}
