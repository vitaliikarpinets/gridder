import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CellState, GameStatus } from '@models';
import { GameService, GameStateService } from '@services';

@Component({
  selector: 'gridder-game-grid-cell',
  templateUrl: './game-grid-cell.component.html',
  styleUrls: ['./game-grid-cell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
})
export class GameGridCellComponent {
  @Input() cellId!: number;
  @Input() cellState!: CellState;

  readonly #game = inject(GameService);
  readonly #state = inject(GameStateService);

  readonly isGameRunning = computed(() => this.#state.status() === GameStatus.Running);

  readonly gameStatuses = GameStatus;
  readonly cellStates = CellState;

  readonly clickCell = () => this.#game.clickCell(this.cellId);
}
