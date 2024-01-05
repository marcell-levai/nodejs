// import { getListOfPublicHolidays } from "./public-holiday.service";
// import axios from "axios";
// import { validateInput } from "../helpers";

// jest.mock('axios');
// jest.mock('./public-holiday.service');

// const PUBLIC_HOLIDAYS = [
//     {
//         "date": "2023-12-25",
//         "localName": "Christmas Day",
//         "name": "Christmas Day",
//         "countryCode": "GB",
//         "fixed": false,
//         "global": true,
//         "counties": null,
//         "launchYear": null,
//         "types": [
//         "Public"
//         ],
//     },
//     {
//         "date": "2023-12-26",
//         "localName": "Boxing Day",
//         "name": "St. Stephen's Day",
//         "countryCode": "GB",
//         "fixed": false,
//         "global": true,
//         "counties": null,
//         "launchYear": null,
//         "types": [
//           "Public"
//         ]
//       }
// ];

// describe('getListOfPublicHolidays', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('should return list of public holidays', async () => {
//         const year = 2023;
//         const country = 'GB';
//         const publicHolidays = [
//             { name: 'Christmas Day', date: '2023-12-25' },
//         ];

//         validateInput.mockImplementation(() => {});
//         axios.get.mockResolvedValueOnce({ data: publicHolidays });

//         const result = await getListOfPublicHolidays(year, country);

//         expect(validateInput).toHaveBeenCalledTimes(1);
//         expect(validateInput).toHaveBeenCalledWith({ year, country });
//         expect(axios.get).toHaveBeenCalledTimes(1);
//         expect(axios.get).toHaveBeenCalledWith(
//         `https://public-holidays-api.com/PublicHolidays/2022/US`,
//         );
//         expect(result).toEqual(publicHolidays);
//     })
// });