let obj = {}
function importAll (r) {
  return r.keys().map(r)
}
const images = importAll(require.context('./img/icons', false, /\.svg$/))

images.forEach((item) => {
  item = item.default
  obj[item.id] = item
})

module.exports = obj
