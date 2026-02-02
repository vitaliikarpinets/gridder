import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { GameService } from '../../../../core/services/game.service';
import { GameStateService } from '../../../../core/services/game-state.service';
import { GameStatus } from '../../../../core/models/game.model';
import { normalizeTimeLimit, timeLimitValidator } from '../../../../core/validators/time-limit.validator';
import { FormsModule } from '@angular/forms';

//todo add .env file ❗❗❗
const DEFAULT_TIME_LIMIT = 1000;
const MIN_TIME_LIMIT = 500;
const MAX_TIME_LIMIT = 10000;

@Component({
  selector: 'gridder-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule],
})
export class GameControlsComponent {
  readonly #game = inject(GameService);
  readonly #state = inject(GameStateService);

  readonly status = this.#state.status.asReadonly();
  readonly timeLimit = this.#state.timeLimit.asReadonly();

  readonly isGameRunning = computed(() => this.status() === GameStatus.Running);

  readonly initGame = () => this.#game.initGame();

  readonly minTimeLimit = MIN_TIME_LIMIT;
  readonly maxTimeLimit = MAX_TIME_LIMIT;

  modelTimeLimit = DEFAULT_TIME_LIMIT;

  readonly updateTimeLimit = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const inputValueAsNumber = input.valueAsNumber;

    const validatorResult = timeLimitValidator(inputValueAsNumber);
    const newTimeLimit = normalizeTimeLimit(inputValueAsNumber, validatorResult);

    if (newTimeLimit !== inputValueAsNumber) {
      this.modelTimeLimit = newTimeLimit;
    }
    this.#state.timeLimit.set(newTimeLimit);
  };
}
