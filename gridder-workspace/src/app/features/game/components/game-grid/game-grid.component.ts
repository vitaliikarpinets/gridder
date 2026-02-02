import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStateService } from '@services';
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
  readonly #state = inject(GameStateService);

  readonly cells = this.#state.cells.asReadonly();
}
