export const ViewsNumFormatter = (num) => {
  let FormatNum = 0;

  const Num = (num) => {
    return num.toFixed(1).split(".")[1] >= 5 ? num.toFixed(1) : Math.floor(num);
  };

  if ((Math.abs(num) > 999) & (Math.abs(num) < 999999)) {
    FormatNum = Math.sign(num) * Num(Math.abs(num) / 1000) + "K";
  } else if ((Math.abs(num) > 999999) & (Math.abs(num) < 999999999)) {
    FormatNum = Math.sign(num) * Num(Math.abs(num) / 1000000) + "M";
  } else if (Math.abs(num) > 999999999) {
    FormatNum = Math.sign(num) * Num(Math.abs(num) / 1000000000) + "B";
  } else {
    return num;
  }

  return FormatNum;
};

export const HandleDuration = (d) => {
  let H, M, S, X;

  if (d.includes("PT")) {
    const HasH = d.split("PT")[1].includes("H");
    const HasM = d.split("PT")[1].includes("M");
    const HasS = d.split("PT")[1].includes("S");

    [H, X] = HasH ? d.split("PT")[1].split("H") : d.split("PT");

    if (HasM) {
      [M, X] = X.split("M");
    }

    S = HasS ? X.split("S")[0] : 0;

    return `${HasH ? (H > 9 ? `${H}:` : `0${H}:`) : ""}${
      HasM ? (M > 9 ? `${M}` : `0${M}`) : "00"
    }:${HasS ? (S > 9 ? S : `0${S}`) : "00"}`;
  } else {
    return d;
  }
};

export const TextReducer = (text, num) => {
  if (text.length > num) {
    return text.substring(0, num) + "...";
  } else {
    return text;
  }
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const ReturnTheme = (Theme) => {
  return Theme ? "dark" : "light";
};

export const UrlLocation = (home = false) => {
  const url = window.location.href;

  if (url.search("/trending/") > -1) {
    return "trending";
  } else if (url.search("/subscriptions/") > -1) {
    return "subscriptions";
  } else if (url.search("/library/") > -1) {
    return "library";
  } else if (url.search("/history/") > -1) {
    return "history";
  } else if (url.search("/list=WL") > -1) {
    return "WL";
  } else if (url.search("/watch?") > -1) {
    return "watch";
  } else if (home) {
    return "home";
  } else {
    return false;
  }
};

export const moveDown = (array, index) => {
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

export const moveUp = (array, index) => {
  if (0 === index) {
    return array;
  } else {
    let p1 = array.slice(0, index - 1);
    let pp = array.slice(index - 1, index + 1);
    let p2 = [pp[1], pp[0]];
    let p3 = array.slice(index + 1, array.length);
    return p1.concat(p2, p3);
  }
};
