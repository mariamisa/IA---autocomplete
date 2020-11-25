const search = require('../utils/logic');

const cities = ['gaza', 'hss'];

// eslint-disable-next-line no-undef
describe('test search function', () => {
  // eslint-disable-next-line no-undef
  test('Filter cities by world', () => {
    // eslint-disable-next-line no-undef
    expect(search(cities, 'ga')).toEqual(['gaza']);
  });
});
