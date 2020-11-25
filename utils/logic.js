function search(array, world) {
  return array.filter(
    (item) => item.toLocaleUpperCase().includes(world.toUpperCase()),
  );
}
module.exports = search;
