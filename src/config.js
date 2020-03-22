export const NumFormatter = num => {
  let FormatNum = 0;

  const Num = num => {
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

export const HandleDuration = d => {
  let H, M, S, X;

  const HasH = d.split("PT")[1].includes("H");
  const HasM = d.split("PT")[1].includes("M");
  const HasS = d.split("PT")[1].includes("S");

  [H, X] = HasH ? d.split("PT")[1].split("H") : d.split("PT");

  if (HasM) {
    [M, X] = X.split("M");
  }

  S = HasS ? X.split("S")[0] : 0;

  return `${HasH ? (H > 9 ? H : `0${H}:`) : ""}${
    HasM ? (M > 9 ? M : `0${M}`) : "00"
  }:${HasS ? (S > 9 ? S : `0${S}`) : "00"}`;
};

export const TextReducer = (text, num) => {
  if (text.length > 64) {
    return text.substring(0, num) + "...";
  } else {
    return text;
  }
};

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
