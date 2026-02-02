import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '../../../../core/services/game-state.service';

@Component({
  selector: 'gridder-game-scoreboard',
  templateUrl: './game-scoreboard.component.html',
  styleUrls: ['./game-scoreboard.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class GameScoreboardComponent {
  readonly #state = inject(GameStateService);

  readonly playerScore = this.#state.playerScore.asReadonly();
  readonly computerScore = this.#state.computerScore.asReadonly();
}
