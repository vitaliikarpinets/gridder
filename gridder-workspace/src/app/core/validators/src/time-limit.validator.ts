//todo add .env file ❗❗❗
const DEFAULT_TIME_LIMIT = 1000;
const MIN_TIME_LIMIT = 500;
const MAX_TIME_LIMIT = 10000;

export function timeLimitValidator(value: number) {
  if (isNaN(value)) {
    return { invalidNumber: true };
  }

  if (value < MIN_TIME_LIMIT) {
    return { lessThanMin: true };
  }

  if (value > MAX_TIME_LIMIT) {
    return { greaterThanMax: true };
  }

  return null;
}

export function normalizeTimeLimit(value: number, validatorResult: ReturnType<typeof timeLimitValidator>): number {
  let newTimeLimit = value;

  if (validatorResult?.invalidNumber) {
    newTimeLimit = DEFAULT_TIME_LIMIT;
  }

  if (validatorResult?.greaterThanMax) {
    newTimeLimit = MAX_TIME_LIMIT;
  }

  if (validatorResult?.lessThanMin) {
    newTimeLimit = MIN_TIME_LIMIT;
  }

  return newTimeLimit;
}
