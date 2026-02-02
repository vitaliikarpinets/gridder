import { Component, signal } from '@angular/core';
import { GameComponent } from './features/game/game.component';

@Component({
  selector: 'gridder-root',
  imports: [GameComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass',
})
export class App {
  protected readonly title = signal('gridder');
  protected readonly fn = () => {
    return 'Then, create an empty config file to let editors and other tool Prettier';
  };
}
