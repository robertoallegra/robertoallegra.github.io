var colors = {
  'red': '#EE0000',
  'lightgray': '#ebebeb',
  'green': '#009900',
  'cyan': '#02DEFE',
  'pink': '#F59999'
}

function drawTitle(element, title, subtitle, icon) {
  if (icon) {
    element.append('image')
    .attr('href', 'https://analytics.vodafone.it/assets/images/svg/' + icon)
    .attr('x', '17')
    .attr('y', '8')
    .attr('width', '22')
    .attr('height', '22');
  }
  
  element.append('text')
  .attr('class', 'card-title')
  .text(title)
  .attr('x', 47)
  .attr('y', 23)

  element.append('text')
  .attr('class', 'card-subtitle')
  .text(subtitle)
  .attr('x', 17)
  .attr('y', 43)
}

function drawTriangle(group, increase) {
  return group.append('polygon')
    .attr('points', "0,0 10,0 5,-10")
    .attr('fill', increase > 0 ? colors.green : colors.red)
    .attr('transform', increase > 0 ? null : d3Transform().rotate(180, 5, -5))
}

function drawEquality(group, isEqual) {
  group.append('rect')
    .attr('width', 8)
    .attr('height', 2)
    .attr('y', -6)
    .attr('fill', colors.cyan);

  group.append('rect')
    .attr('x', 0)
    .attr('y', -2)
    .attr('width', 8)
    .attr('height', 2)
    .attr('fill', colors.cyan);
}

function drawPercentageWithTriangle(element, x, y, increment) {
      var percentageGroup = element.append('g').attr('transform','translate(' + x + ',' + y + ')'); 
  
     if (increment != 0) {
          drawTriangle(percentageGroup, increment);
     } else {
          drawEquality(percentageGroup, true);
     }
  
  return percentageGroup;
}

function drawSimplePie(element, dataset, cx, cy, radius, colors) {
  colors = colors || ["#F59999", "#E60000"];
  
  var g = element
    .append("g")
    .attr("transform", "translate(" + cx + "," + cy + ")");

    var arc = d3.arc()
    .innerRadius(0) 
    .outerRadius(radius);

  var pie = d3.pie();
  
  g.selectAll('whatever')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('fill', (d,i) => colors[i])
    .attr('d', arc)
  
      var arc = d3.arc()
    .innerRadius(radius + 3)
    .cornerRadius(4)
    .outerRadius(radius+ 6);
  
    g.selectAll('whatever')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('fill', (d,i) => colors[i])
    .attr('d', arc)
  
  return g;
}

