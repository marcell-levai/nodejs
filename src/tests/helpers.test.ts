import { validateYear, validateCountry, validateInput } from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';


describe('validateYear', () => {
  it('should return true when the given year is the current year', () => {
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(2022);
    
    expect(validateYear(2022)).toBe(true);
  });

  it('should return false when the given year is different from the current year', () => {
    jest.spyOn(global.Date.prototype, 'getFullYear').mockReturnValue(2022);
    
    expect(validateYear(2023)).toBe(false);
  });
});

describe('validateCountry', () => {
  it('should return true for supported countries', () => {
    expect(validateCountry('GB')).toBe(true);
    expect(validateCountry('FR')).toBe(true);
  });

  it('should return false for unsupported countries', () => {
    expect(validateCountry('ES')).toBe(false);
    expect(validateCountry('IT')).toBe(false);
  });

  it('should correctly validate against the SUPPORTED_COUNTRIES array', () => {
    for (const country of SUPPORTED_COUNTRIES) {
      expect(validateCountry(country)).toBe(true);
    }
  });
});

describe('validateInput', () => {
  it('should not throw an error if valid year and supported country are provided', () => {
    expect(() => validateInput({ year: 2022, country: 'GB' })).not.toThrow();
  });

  it('should throw an error if unsupported country is provided', () => {
    expect(() => validateInput({ country: 'ES' })).toThrowError('Country provided is not supported, received: ES');
  });

  it('should throw an error if invalid year is provided', () => {
    expect(() => validateInput({ year: 2023 })).toThrowError('Year provided not the current, received: 2023');
  });

  it('should not throw an error if no country or year is provided', () => {
    expect(() => validateInput({})).not.toThrow();
  });
});