import { Component } from '@angular/core';
import { GameComponent } from './features/game/game.component';

@Component({
  selector: 'gridder-root',
  imports: [GameComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App {}
