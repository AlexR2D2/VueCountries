self.onmessage = function (e) {
  self.importScripts("sort_items.js");
  sortItems(e.data.items, e.data.sortField)
  self.postMessage({ items: e.data.items });
}
