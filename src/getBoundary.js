export default function (map, districtName, callback) {
  var bdary = new window.BMap.Boundary()
  bdary.get(districtName, function (rs) {
    // map.clearOverlays()
    var count = rs.boundaries.length
    if (count === 0) {
      // alert('未能获取当前输入行政区域')
      return
    }
    var pointArray = []
    for (var i = 0; i < count; i++) {
      var ply = new window.BMap.Polygon(rs.boundaries[i], { strokeWeight: 2, strokeColor: '#fff', fillColor: '#000', fillOpacity: '0' })
      map.addOverlay(ply)
      pointArray = pointArray.concat(ply.getPath())
      // 获取中心点
      var point = getCenterPoint(ply.getPath())
      // 绘制标签
      var labelText = districtName.slice(3, districtName.length)
      var label = new window.BMap.Label(labelText, { offset: new window.BMap.Size(0, 0), position: point })
      // mouseover事件
      label.setStyle({ color: '#fff', fontSize: '14px', backgroundColor: '#00bcff', border: '0' })
      ply.addEventListener('mouseover', function () {
        map.addOverlay(label)
        ply.setFillColor('#fff')
        ply.setFillOpacity('0.5')
      })
      ply.addEventListener('mouseout', function () {
        map.removeOverlay(label)
        ply.setFillColor('#000')
        ply.setFillOpacity('0')
      })
    }
    // 点击事件
    ply.addEventListener('click', () => { callback(labelText, pointArray) })
  })
}

function getCenterPoint (path) {
  var x = 0.0
  var y = 0.0
  for (var i = 0; i < path.length; i++) {
    x = x + parseFloat(path[i].lng)
    y = y + parseFloat(path[i].lat)
  }
  x = x / path.length
  y = y / path.length
  return new window.BMap.Point(x, y)
}

// function chooseDistrict (labelText) {
//   alert(labelText)
// }
