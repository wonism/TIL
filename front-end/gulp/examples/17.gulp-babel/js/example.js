(() => {
  const arr = [1, 2, 3];
  arr.map((el, i) => {
    console.log(`${ i + 1 } => ${ el }`);
    return el;
  });
})();

