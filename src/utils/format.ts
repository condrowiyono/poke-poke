const intlList = new Intl.ListFormat("id", { style: "narrow" });

const addLeadingZero = (value: number, leading = 3) => {
  return String(value).padStart(leading, "0");
};

const formatList = (list: string[]) => {
  return intlList.format(list);
};

export { addLeadingZero, formatList };
