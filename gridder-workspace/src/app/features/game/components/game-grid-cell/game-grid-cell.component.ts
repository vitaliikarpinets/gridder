import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { CellState } from '../../../../core/models/cell.model';
import { GameStatus } from '../../../../core/models/game.model';
import { NgClass } from '@angular/common';
import { GameService } from '../../../../core/services/game.service';
import { GameStateService } from '../../../../core/services/game-state.service';

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
