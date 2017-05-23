import * as d3 from 'd3';

require('./index.scss');

const data = [
  { k: 1, v: 1, },
  { k: 2, v: 4, },
  { k: 3, v: 9, },
  { k: 4, v: 16, },
  { k: 5, v: 25, }
];
const dataLength = data.length;

const margin = { top: 20, right: 30, bottom: 30, left: 40, };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const barWidth = width / dataLength;

const x = d3.scaleBand()
  .domain(data.map(d => d.k))
  .range([0, width])
  .padding(0.1);
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.v)])
  .range([height, 0]);
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

yAxis.ticks(10);

const chartContainer = d3.select('#chart-container');
const chartElement = d3.select('#responsive-chart');
const chart = chartElement
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

// X축 항목을 다시 그릴 때 선택하기 위한 group 요소
const xAxisPathContainer = chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${ height })`)
  .call(xAxis);

chart.append('g')
  .attr('class', 'y axis')
  .call(yAxis);

chart.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', 0)
  .attr('y', d => y(d.v))
  .attr('width', barWidth)
  .attr('height', d => height - y(d.v))
  .attr('transform', (d, i) => `translate(${ i * barWidth }, 0)`);

// debounce 함수
function debounce(cb, interval, immediate) {
  let timeout;

  return function (...args) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        cb.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, interval);

    if (callNow) {
      cb.apply(context, args);
    }
  };
}

// 창 크기가 변경될 때 실행한 함수로, 높이를 유지한 채 `SVG`를 다시 그려준다.
function resizeChart() {
  // 변경될 차트의 크기
  const changedWidth = parseInt(chartContainer.style('width'), 10) - margin.right - margin.left;
  const changedBarWidth = changedWidth / dataLength;

  // x의 범위 수정
  x.range([0, changedWidth]);

  // svg의 크기 변경
  chartElement
    .style('width', changedWidth + margin.left + margin.right);

  // 차트의 막대 크기 및 위치 변경
  chart.selectAll('rect')
    .attr('width', changedBarWidth)
    .attr('transform', (d, i) => `translate(${ i * changedBarWidth }, 0)`);

  // x축 다시 그리기
  xAxisPathContainer
    .call(xAxis);
}

document.addEventListener('DOMContentLoaded', resizeChart);
d3.select(window).on('resize', debounce(resizeChart, 100));

