export default function lineOptions (x, y) {
  let option = {
    xAxis: {
      type: 'category',
      data: x,
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false }
    },
    series: [{
      data: y,
      type: 'line',
      areaStyle: { color: ['#e2e2e2'] }
    }],
    grid: {
      left: '0',
      top: 0,
      right: '0',
      bottom: 0
    },
    color: ['#fff']
  }
  return option
}
