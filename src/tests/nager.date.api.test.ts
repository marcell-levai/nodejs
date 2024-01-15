import axios from 'axios';

const customSerializer = {
  print(val: any): string {
    return JSON.stringify(val, null, 2);
  },
  test(val: any): boolean {
    return val && typeof val === 'object' && val.constructor.name === 'Object';
  },
};

expect.addSnapshotSerializer(customSerializer);

describe('Nager.Date API E2E tests', () => {
  const baseUrl = 'https://date.nager.at/api/v3';

  describe('NextPublicHolidays endpoint', () => {
    it('should retrieve the next public holidays for a country', async () => {
      const countryCode = 'US';

      const response = await axios.get(`${baseUrl}/NextPublicHolidays/${countryCode}`);

      expect(response.status).toBe(200);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('PublicHolidays endpoint', () => {
    it('should retrieve the public holidays for a specific year and country', async () => {
      const countryCode = 'US';
      const year = 2022; // Replace with the desired year

      const response = await axios.get(`${baseUrl}/PublicHolidays/${year}/${countryCode}`);

      expect(response.status).toBe(200);
      expect(response.data).toMatchSnapshot();
    });
  });
});