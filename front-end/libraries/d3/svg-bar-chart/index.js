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

// 그래프 너비 및 간격 지정
const margin = { top: 20, right: 30, bottom: 30, left: 40, };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const barWidth = width / dataLength;

// 범위 지정
const x = d3.scaleBand()
  .domain(data.map(d => d.k)) // Array.prototype.map 메소드를 통해 X축 범위 지정
  .range([0, width])
  .padding(0.1);
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.v)])
  .range([height, 0]);
const xAxis = d3.axisBottom(x); // X축을 아래에 그리도록 axisBottom 메소드 호출
const yAxis = d3.axisLeft(y); // Y축을 왼쪽에 그리도록 axisLeft 메소드 호출

yAxis.ticks(10); // Y축의 점을 10개로 지정

const chart = d3.select('#line-graph')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${ margin.left }, ${ margin.top })`);

chart.append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${ height })`)
  .call(xAxis); // X축 추가

chart.append('g')
  .attr('class', 'y axis')
  .call(yAxis); // Y축 추가

chart.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', 0)
  .attr('y', d => y(d.v))
  .attr('width', width / dataLength)
  .attr('height', d => height - y(d.v))
  .attr('transform', (d, i) => `translate(${ i * barWidth }, 0)`);

