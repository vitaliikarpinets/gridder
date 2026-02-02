import { InjectionToken } from '@angular/core';
import { GameConfig } from '@models';

export const GAME_CONFIG = new InjectionToken<GameConfig>('GAME_CONFIG');
