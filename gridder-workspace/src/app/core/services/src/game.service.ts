import { Injectable, inject } from '@angular/core';
import { Cell, CellState, GameStatus } from '@models';
import { getRandomNumber } from '@utils';
import { GameStateService } from './game-state.service';
import { GAME_CONFIG } from '@tokens';

@Injectable()
export class GameService {
  readonly #state = inject(GameStateService);
  readonly #gameConfig = inject(GAME_CONFIG);

  constructor() {
    this.initCells();
  }

  private initCells(): void {
    const length = this.#gameConfig.gridColumns * this.#gameConfig.gridRows;
    const cells = Array.from({ length }, (_, i) => new Cell(i));
    this.#state.cells.set(cells);
  }

  private resetCells(): void {
    const cells = this.#state.cells();
    cells.forEach((c) => c.setState(CellState.Idle));
    this.#state.cells.update(() => [...cells]);
  }

  initGame(): void {
    this.resetCells();
    this.#state.playerScore.set(0);
    this.#state.computerScore.set(0);
    this.#state.status.set(GameStatus.Running);
    this.startRound();
  }

  startRound(): void {
    if (this.#state.status() !== GameStatus.Running) {
      return;
    }

    this.clearRoundTimeout();

    const idleCells = this.#state.cells().filter((c) => c.state === CellState.Idle);
    if (!idleCells.length) {
      return;
    }

    const randomIndex = getRandomNumber(idleCells.length);
    const randomCell = idleCells[randomIndex];
    this.#state.activeCellId.set(randomCell.id);
    this.updateCell(randomCell.id, CellState.Active);

    const roundTimeoutId = window.setTimeout(() => {
      if (this.#state.activeCellId() === randomCell.id) {
        this.updateCell(randomCell.id, CellState.Failed);
        this.#state.computerScore.update((v) => v + 1);
        this.#state.activeCellId.set(null);
        this.checkEnd();
        this.startRound();
      }
    }, this.#state.timeLimit());
    this.#state.setRoundTimeoutId(roundTimeoutId);
  }

  private clearRoundTimeout(): void {
    const roundTimeoutId = this.#state.getRoundTimeoutId();
    if (roundTimeoutId !== null) {
      clearTimeout(roundTimeoutId);
      this.#state.setRoundTimeoutId(null);
    }
  }

  clickCell(id: number): void {
    if (this.#state.status() !== GameStatus.Running) {
      return;
    }
    if (this.#state.activeCellId() !== id) {
      return;
    }
    this.updateCell(id, CellState.Success);
    this.#state.playerScore.update((v) => v + 1);
    this.#state.activeCellId.set(null);
    this.checkEnd();
    this.startRound();
  }

  private updateCell(id: number, state: CellState): void {
    const cells = this.#state.cells();
    const cell = cells.find((c) => c.id === id);
    if (!cell) {
      return;
    }
    cell.setState(state);
    this.#state.cells.update(() => [...cells]);
  }

  private checkEnd(): void {
    if (this.#state.winner()) {
      this.#state.status.set(GameStatus.Finished);
    }
  }
}
