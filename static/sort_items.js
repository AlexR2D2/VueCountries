const sortItems = (items, sortField) => {
  if (!sortField) return
  if (sortField === 'name') {
    items.sort( (left, right) => right[sortField] > left[sortField] ? -1 : 1);
  } else {
    items.sort( (left, right) => Math.floor(right[sortField]) - Math.floor(left[sortField]));
  }
}
