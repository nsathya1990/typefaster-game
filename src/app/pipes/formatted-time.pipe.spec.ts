import { FormattedTimePipe } from './formatted-time.pipe';

describe('FormattedTimePipe', () => {
  let pipe: FormattedTimePipe;

  beforeEach(() => {
    pipe = new FormattedTimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('passing time in milliseconds', () => {
    expect(pipe.transform(26701)).toBe('26s:701ms');
  });
});
