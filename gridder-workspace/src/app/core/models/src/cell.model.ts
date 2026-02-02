export enum CellState {
  Idle = 'idle',
  Active = 'active',
  Success = 'success',
  Failed = 'fail',
}

export class Cell {
  id: number;
  state: CellState;

  constructor(id: number) {
    this.id = id;
    this.state = CellState.Idle;
  }

  setState(state: CellState) {
    this.state = state;
  }
}
