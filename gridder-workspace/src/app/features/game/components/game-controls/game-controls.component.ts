import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService, GameStateService } from '@services';
import { normalizeTimeLimit } from '@helpers';
import { GameStatus } from '@models';
import { GAME_CONFIG } from '@tokens';

@Component({
  selector: 'gridder-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class GameControlsComponent {
  readonly #gameConfig = inject(GAME_CONFIG);
  readonly #game = inject(GameService);
  readonly #state = inject(GameStateService);

  readonly status = this.#state.status.asReadonly();
  readonly timeLimit = this.#state.timeLimit.asReadonly();

  readonly isGameRunning = computed(() => this.status() === GameStatus.Running);

  readonly initGame = () => this.#game.initGame();

  readonly minTimeLimit = this.#gameConfig.minTimeLimit;
  readonly maxTimeLimit = this.#gameConfig.maxTimeLimit;

  modelTimeLimit = this.#gameConfig.defaultTimeLimit;

  readonly updateTimeLimit = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const inputValueAsNumber = input.valueAsNumber;
    const newTimeLimit = normalizeTimeLimit(inputValueAsNumber, { config: this.#gameConfig });
    if (newTimeLimit !== inputValueAsNumber) {
      this.modelTimeLimit = newTimeLimit;
    }
    this.#state.timeLimit.set(newTimeLimit);
  };
}
