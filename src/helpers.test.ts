const validateInput = require('./helpers');

describe('validateInput', () => { 
    test('should return true when no input is provided', () => { 
        expect(validateInput({})).toBeTruthy(); 
    });

    test('should return true when valid year is provided', () => { 
        expect(validateInput({ year: 2022 })).toBeTruthy(); 
    });

    test('should throw an error when invalid year is provided', () => {
        const testYear = 100;
        expect(validateInput({year: testYear})).rejects.toThrow(new Error(`Year provided not the current, received: ${testYear}`));
    });

    test('should return true when valid country is provided', () => {
        expect(validateInput({ country: 'USA' })).toBeTruthy();
    });

    test('should throw an error when invalid country is provided', () => {
        const testCountry = 'NeverLand';
        expect(validateInput({ country: testCountry })).rejects.toThrow(new Error(`Country provided is not supported, received: ${testCountry}`));
    });
});