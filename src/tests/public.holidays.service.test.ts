import axios from 'axios';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from '../services/public-holiday.service';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

//unit tests
describe('unit tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get list of public holidays', async () => {
    const mockYear = 2024;
    const mockCountry = 'GB';
    const mockPublicHolidays = [
        { name: 'New Year\'s Day', localName: 'New Year\'s Day', date: '2024-01-01' },
        { name: 'Good Friday', localName: 'Good Friday', date: '2024-04-10' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockPublicHolidays });

    const holidays = await getListOfPublicHolidays(mockYear, mockCountry);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`/PublicHolidays/${mockYear}/${mockCountry}`));
    expect(holidays).toEqual(mockPublicHolidays);
  });

  it('should check if today is a public holiday', async () => {
    const mockCountry = 'GB';

    mockedAxios.get.mockResolvedValueOnce({ status: 200 });

    const isPublicHoliday = await checkIfTodayIsPublicHoliday(mockCountry);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`/IsTodayPublicHoliday/${mockCountry}`));
    expect(isPublicHoliday).toBeTruthy();
  });

  it('should get next public holidays', async () => {
    const mockCountry = 'GB';
    const mockNextHolidays = [
        { name: 'Easter Monday', localName: 'Easter Monday', date: '2024-04-13' },
        { name: 'Early May Bank Holiday', localName: 'Early May Bank Holiday', date: '2024-05-06' },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockNextHolidays });

    const nextHolidays = await getNextPublicHolidays(mockCountry);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`/NextPublicHolidays/${mockCountry}`));
    expect(nextHolidays).toEqual(mockNextHolidays);
  });
});


//integration tests
describe('integration tests', () => {
    const mockPublicHolidays = [
        { name: 'New Year\'s Day', localName: 'New Year\'s Day', date: '2024-01-01' },
        { name: 'Good Friday', localName: 'Good Friday', date: '2024-04-10' },
    ];
  
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should retrieve a list of public holidays', async () => {
      const year = 2024;
      const country = 'GB';
  
      axios.get = jest.fn().mockResolvedValueOnce({ data: mockPublicHolidays });
  
      const holidays = await getListOfPublicHolidays(year, country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/PublicHolidays/${year}/${country}`)
      );
      expect(holidays).toEqual(mockPublicHolidays);
    });
  
    it('should check if today is a public holiday', async () => {
      const country = 'GB';
  
      axios.get = jest.fn().mockResolvedValueOnce({ status: 200 });
  
      const isPublicHoliday = await checkIfTodayIsPublicHoliday(country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/IsTodayPublicHoliday/${country}`)
      );
      expect(isPublicHoliday).toBeTruthy();
    });
  
    it('should retrieve the next public holidays', async () => {
      const country = 'GB';
  
      axios.get = jest.fn().mockResolvedValueOnce({ data: mockPublicHolidays });
  
      const nextHolidays = await getNextPublicHolidays(country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/NextPublicHolidays/${country}`)
      );
      expect(nextHolidays).toEqual(mockPublicHolidays);
    });
  
    it('should handle API error gracefully while getting list of public holidays', async () => {
      const year = 2024;
      const country = 'GB';
  
      axios.get = jest.fn().mockRejectedValueOnce(new Error('API error'));
  
      const holidays = await getListOfPublicHolidays(year, country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/PublicHolidays/${year}/${country}`)
      );
      expect(holidays).toEqual([]);
    });
  
    it('should handle API error gracefully while checking if today is a public holiday', async () => {
      const country = 'GB';
  
      axios.get = jest.fn().mockRejectedValueOnce(new Error('API error'));
  
      const isPublicHoliday = await checkIfTodayIsPublicHoliday(country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/IsTodayPublicHoliday/${country}`)
      );
      expect(isPublicHoliday).toBeFalsy();
    });
  
    it('should handle API error gracefully while getting next public holidays', async () => {
      const country = 'GB';
  
      axios.get = jest.fn().mockRejectedValueOnce(new Error('API error'));
  
      const nextHolidays = await getNextPublicHolidays(country);
  
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/NextPublicHolidays/${country}`)
      );
      expect(nextHolidays).toEqual([]);
    });
  });
