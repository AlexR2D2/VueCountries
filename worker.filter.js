/*
function sortItems(items, sortField) {
  if (!sortField) return
  if (sortField === 'name') {
    items.sort( (left, right) => right[sortField] > left[sortField] ? -1 : 1);
  } else {
    items.sort( (left, right) => Math.floor(right[sortField]) - Math.floor(left[sortField]));
  }
}
*/

function reselectCurrent(items, current) {
  if (items.length == 0) return null
  if (current) {
    if (items.filter(item => item.name == current.name).length == 0) {
      return items[0]
    } else {
      return current 
    }
  } else {
    return items[0]
  }
}

self.onmessage = function (e) {
  self.importScripts("sort_items.js");

  const name = e.data.filters['name'].value
  const region = e.data.filters['region'].value
  const language = e.data.filters['language'].value
  const currency = e.data.filters['currency'].value
  const regionalBlock = e.data.filters['regionalBlock'].value
  const neighbour = e.data.filters['border'].value

  const items = e.data.items.filter(item => {
    return (name
        ? item.name.toLowerCase().indexOf(name.name.toLowerCase()) !== -1
        : true)
      && (region
        ? item.region == region.name
        : true)
      && (language
        ? item.languages.filter(lang => lang.name == language.name).length > 0
        : true)
      && (currency
        ? item.currencies.filter(curr => curr.name == currency.name).length > 0
        : true)
      && (regionalBlock
        ? item.regionalBlocs.filter(block => block.name == regionalBlock.name).length > 0
        : true)
      && (neighbour
        ? neighbour.code
          ? item.borders.filter(border => border == neighbour.code).length > 0
          : item.borders.length == 0
        : true)
    })

  sortItems(items, e.data.sortField)

  const current = reselectCurrent(items, e.data.current)

  self.postMessage({ items, current })
}
