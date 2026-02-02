import { Provider } from '@angular/core';
import { DEFAULT_GAME_CONFIG } from '@configs';
import { GAME_CONFIG } from '@tokens';

export function provideGameConfig(): Provider {
  return {
    provide: GAME_CONFIG,
    useValue: DEFAULT_GAME_CONFIG,
  };
}
