import {
  ViewsNumFormatter,
  HandleDuration,
  numberWithCommas,
  moveDown,
  moveUp,
  replace,
} from "./index";

describe("Number Formatter with K/M/B/LIKE/DISLIKE", () => {
  test.each([
    [1000, null, "1K"],
    [1000000, null, "1M"],
    [1000000000, null, "1B"],
    [null, "like", "LIKE"],
    [null, "dislike", "DISLIKE"],
  ])(`Number Formatter pass (%s, %s, %s) `, (num, dis, expected) => {
    expect(ViewsNumFormatter(num, dis)).toBe(expected);
    expect(ViewsNumFormatter(num, dis)).toEqual(expect.any(String));
  });
});

describe("Handle Duration", () => {
  test.each([
    ["PT12H3M44S", "12:03:44"],
    ["PT2H30M", "02:30:00"],
    ["PT1H", "01:00:00"],
  ])(`Duration pass (%s, %s) `, (value, expected) => {
    expect(HandleDuration(value)).toBe(expected);
    expect(HandleDuration(value)).toEqual(expect.any(String));
  });
});

describe("number With Commas", () => {
  test.each([
    ["10", "10"],
    ["1000", "1,000"],
    ["1000000", "1,000,000"],
  ])(`pass (%s, %s) `, (value, expected) => {
    expect(numberWithCommas(value)).toBe(expected);
    expect(numberWithCommas(value)).toEqual(expect.any(String));
  });
});

const TestArray = ["1", "2", "3", "4", "5", "6", "7"];

describe("move items in array", () => {
  test.each([
    ["1", ["1", "3", "2", "4", "5", "6", "7"]],
    ["2", ["1", "2", "4", "3", "5", "6", "7"]],
  ])(`pass moveDown %s`, (index, expected) => {
    expect(moveDown(TestArray, index)).toEqual(expected);
    expect(moveDown(TestArray, index)).toEqual(expect.any(Array));
  });

  test.each([
    ["1", ["2", "1", "3", "4", "5", "6", "7"]],
    ["2", ["1", "3", "2", "4", "5", "6", "7"]],
  ])(`pass moveUp %s `, (index, expected) => {
    expect(moveUp(TestArray, index)).toEqual(expected);
    expect(moveUp(TestArray, index)).toEqual(expect.any(Array));
  });

  const arrayvid = [
    { videoId: "1" },
    { videoId: "2" },
    { videoId: "3" },
    { videoId: "4" },
    { videoId: "5" },
    { videoId: "6" },
    { videoId: "7" },
  ];

  test.each([
    [
      "3",
      "2",
      [
        { videoId: "1" },
        { videoId: "3" },
        { videoId: "2" },
        { videoId: "4" },
        { videoId: "5" },
        { videoId: "6" },
        { videoId: "7" },
      ],
    ],
    [
      "2",
      "5",
      [
        { videoId: "1" },
        { videoId: "5" },
        { videoId: "2" },
        { videoId: "3" },
        { videoId: "4" },
        { videoId: "6" },
        { videoId: "7" },
      ],
    ],
  ])(`pass replace %s to %s `, (index, rep, expected) => {
    expect(replace(arrayvid, index, rep)).toEqual(expected);
    expect(replace(arrayvid, index, rep)).toEqual(expect.any(Array));
  });
});
