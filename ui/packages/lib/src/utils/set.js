/*eslint no-sequences: 0*/
export const set = (obj, key, value) => {
  let props = key.split("."),
    arrIndex = -1;
  props.reduce(
    (o, d, i) => (
      (arrIndex = d.indexOf("[") > -1 && d[d.indexOf("[") + 1]),
      arrIndex && (d = d.slice(0, d.indexOf("["))),
      i === props.length - 1
        ? (o[d] = value)
        : ((o[d] = o[d] || {}),
          arrIndex && (Array.isArray(o[d]) || (o[d] = [o[d]])),
          (arrIndex && o[d][arrIndex]) || o[d])
    ),
    obj
  );
};
