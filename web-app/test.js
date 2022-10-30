function ensure(value) {
  if (typeof value === "undefined") throw new Error();
  return value;
}

ensure();
