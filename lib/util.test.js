const util = require("./util");

describe('testing utility functions', () => {
    test('parseTimeStringToNumber()', () => {
        expect(util.parseTimeStringToNumber("8:00")).toBe(480);
        expect(util.parseTimeStringToNumber("8:05")).toBe(485);
    });
  
    test('parseTimeNumberToString()', () => {
        expect(util.parseTimeNumberToString(480)).toBe("8:00");
        expect(util.parseTimeNumberToString(485)).toBe("8:05");
    });

    test('parseMovie()', () => {
        expect(util.parseMovie({
            'Movie Title': 'The Proposal',
            ' Release Year': ' 2009',
            ' MPAA Rating': ' PG-13',
            ' Run Time': ' 1:48'
        })).toMatchObject({
            'Movie Title': 'The Proposal',
            'Release Year': '2009',
            'MPAA Rating': 'PG-13',
            'Run Time': '1:48',
            'Run Time Minutes': 108
        });
    });

    test('getDay()', () => {
        expect(util.getDay(0)).toBe("Monday");
        expect(util.getDay(1)).toBe("Tuesday");
    });

    test('getTimes()', () => {
        expect(util.getTimes(630,1408,108,5,35,[])).toMatchObject([
            [ '12:00', '13:48' ],
            [ '14:25', '16:13' ],
            [ '16:50', '18:38' ],
            [ '19:15', '21:03' ],
            [ '21:40', '23:28' ]
        ]);
    });

});




