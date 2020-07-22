import { ViewsNumFormatter, HandleDuration, numberWithCommas } from "./index";

describe("Number Formatter with K/M/B/LIKE/DISLIKE", () => {

  test.each([
    [1000, null, '1K'],
    [1000000, null, '1M'],
    [1000000000, null, '1B'],
    [null, "like", 'LIKE'],
    [null, "dislike", 'DISLIKE'],
  ])(`Number Formatter pass (%s, %s, %s) `, (num, dis, expected) => {
    expect(ViewsNumFormatter(num, dis)).toBe(expected);
    expect(ViewsNumFormatter(num, dis)).toEqual(expect.any(String))
  });
});

describe("Handle Duration", () => {

  test.each([
    ['PT12H3M44S', '12:03:44'],
    ['PT2H30M', '02:30:00'],
    ['PT1H', '01:00:00'],
  ])(`Duration pass (%s, %s) `, (value, expected) => {
    expect(HandleDuration(value)).toBe(expected);
    expect(HandleDuration(value)).toEqual(expect.any(String))
  });
});

describe("number With Commas", () => {

  test.each([
    ['10', '10'],
    ['1000', '1,000'],
    ['1000000', '1,000,000'],
  ])(`pass (%s, %s) `, (value, expected) => {
    expect(numberWithCommas(value)).toBe(expected);
    expect(numberWithCommas(value)).toEqual(expect.any(String))
  });
});

