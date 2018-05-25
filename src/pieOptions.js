export default function pieOptions (data) {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}%'
    },
    series: [{
      type: 'pie',
      radius: '80%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      }
    }],
    color: ['#FFFFFF', '#E8E8E8', '#CCCCCC', '#B2B2B2', '#9B9B9B', '#7F7F7F', '#666666', '#4C4C4C', '#333333', '#191919', '#666666', '#666666']
  }
  return option
}
