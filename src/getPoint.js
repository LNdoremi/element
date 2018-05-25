export default function (map, item, callback) {
  var point = new window.BMap.Point(item.longtitude, item.latitude)
  // map.centerAndZoom(point, 15)
  // var marker = new window.BMap.Marker(point)

  var myIcon = new window.BMap.Icon('../static/box-1.png', new window.BMap.Size(20, 20))
  var marker2 = new window.BMap.Marker(point, { icon: myIcon })
  map.addOverlay(marker2)
  marker2.addEventListener('click', () => { callback(item) })
  // map.addOverlay(marker)
  // marker.addEventListener('click', () => { callback(item) })
}
