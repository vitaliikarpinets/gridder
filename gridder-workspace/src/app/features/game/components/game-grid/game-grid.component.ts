import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '@services';
import { GAME_CONFIG } from '@tokens';
import { GameGridCellComponent } from '../game-grid-cell/game-grid-cell.component';

@Component({
  selector: 'gridder-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GameGridCellComponent],
})
export class GameGridComponent {
  readonly #gameConfig = inject(GAME_CONFIG);
  readonly #state = inject(GameStateService);

  readonly cells = this.#state.cells.asReadonly();

  readonly gridColumns = this.#gameConfig.gridColumns;
  readonly gridRows = this.#gameConfig.gridRows;
}
