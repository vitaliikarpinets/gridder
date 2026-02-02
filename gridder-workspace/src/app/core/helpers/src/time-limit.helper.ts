import { GameConfig } from '@models';

interface TimeLimitValidationResult {
  error: 'invalidNumber' | 'lessThanMin' | 'greaterThanMax';
}

function validate(value: number, config: GameConfig): TimeLimitValidationResult | null {
  if (isNaN(value)) return { error: 'invalidNumber' };
  if (value < config.minTimeLimit) return { error: 'lessThanMin' };
  if (value > config.maxTimeLimit) return { error: 'greaterThanMax' };
  return null;
}

export function normalizeTimeLimit(value: number, options: { config: GameConfig }): number {
  const { config } = options;
  const result = validate(value, config);
  if (result?.error === 'invalidNumber') return config.defaultTimeLimit;
  if (result?.error === 'greaterThanMax') return config.maxTimeLimit;
  if (result?.error === 'lessThanMin') return config.minTimeLimit;
  return value;
}
