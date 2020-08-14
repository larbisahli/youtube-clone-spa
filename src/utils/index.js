export const ViewsNumFormatter = (num, from = false) => {
  let FormatNum = 0;

  const Num = (num) => {
    return num.toFixed(1).split(".")[1] >= 5 ? num.toFixed(1) : Math.floor(num);
  };

  if ((Math.abs(num) > 999) & (Math.abs(num) < 999999)) {
    FormatNum = (Math.sign(num) * Num(Math.abs(num) / 1000)).toFixed() + "K";
  } else if ((Math.abs(num) > 999999) & (Math.abs(num) < 999999999)) {
    FormatNum = (Math.sign(num) * Num(Math.abs(num) / 1000000)).toFixed() + "M";
  } else if (Math.abs(num) > 999999999) {
    FormatNum =
      (Math.sign(num) * Num(Math.abs(num) / 1000000000)).toFixed() + "B";
  } else {
    FormatNum = num;
  }

  if ((num === 0 || num === undefined || num === null) && from) {
    if (from === "like") {
      return "LIKE";
    } else if (from === "dislike") {
      return "DISLIKE";
    }
  } else {
    return FormatNum || 0;
  }
};

export const HandleDuration = (duration) => {
  let H, M, S, X;

  if (duration) {
    if (duration.includes("PT")) {
      const HasH = duration.split("PT")[1].includes("H");
      const HasM = duration.split("PT")[1].includes("M");
      const HasS = duration.split("PT")[1].includes("S");

      [H, X] = HasH ? duration.split("PT")[1].split("H") : duration.split("PT");

      if (HasM) {
        [M, X] = X.split("M");
      }

      S = HasS ? X.split("S")[0] : 0;

      return `${HasH ? (H > 9 ? `${H}:` : `0${H}:`) : ""}${
        HasM ? (M > 9 ? `${M}` : `0${M}`) : "00"
      }:${HasS ? (S > 9 ? S : `0${S}`) : "00"}`;
    } else {
      return duration;
    }
  }
};

export const numberWithCommas = (x) => {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return "";
  }
};

export const PageLocation = (home = false) => {
  const url = window.location.href;

  if (url.search("/trending/") > -1) {
    return "trending";
  } else if (url.search("/subscriptions/") > -1) {
    return "subscriptions";
  } else if (url.search("/library/") > -1) {
    return "library";
  } else if (url.search("/history/") > -1) {
    return "history";
  } else if (url.search("/results?") > -1) {
    return "results";
  } else if (url.search("list=WL") > -1) {
    return "WL";
  } else if (url.search("list=LV") > -1) {
    return "LV";
  } else if (url.search("/watch?") > -1) {
    return "watch";
  } else if (home) {
    return "home";
  } else {
    return null;
  }
};

export const moveDown = (array, index_) => {
  let index = Number(index_);
  if (array.length === index + 1) {
    let p1 = array.slice(0, index);
    let p2 = array.slice(index);
    return p2.concat(p1);
  } else {
    let p1 = array.slice(0, index);
    let pp = array.slice(index, index + 2);
    let p2 = [pp[1], pp[0]];
    let p3 = array.slice(index + 2, array.length);
    return p1.concat(p2, p3);
  }
};

export const moveUp = (array, index_) => {
  let index = Number(index_);
  if (index === 0) return array;

  let p1 = array.slice(0, index - 1);
  let pp = array.slice(index - 1, index + 1);
  let p2 = [pp[1], pp[0]];
  let p3 = array.slice(index + 1, array.length);
  return p1.concat(p2, p3);
};

export const replace = (array, current_draggable_item_id, replacer) => {
  if (array.length === 1) return array;

  const index = array
    .map((e) => {
      if (e) return e.videoId;
      return null;
    })
    .indexOf(current_draggable_item_id);

  const obj = array.filter((value) => {
    return value.videoId === replacer;
  })[0];

  let arr = array.filter((value) => {
    return value.videoId !== replacer;
  });

  return [...arr.slice(0, index), obj, ...arr.slice(index)];
};
