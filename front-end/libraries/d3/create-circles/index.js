import * as d3 from 'd3';

require('./index.scss');

const data = [40, 80, 120];

d3.select('#create-circles')
  .attr('width', 160)
  .attr('height', 80)
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', (d, i) => data[i]) // 원 중심의 x축 좌표
  .attr('cy', 40) // 원 중심의 y축 좌표
  .attr('r', 10) // 원의 반지름
  .style('fill', '#000');

