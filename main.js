// 1: CREATE BLANK SVG
// Set dimensions and margins for the scatter plot
const margin = { top: 50, right: 30, bottom: 60, left: 100 },
      width = 800 - margin.left - margin.right, // Actual chart width
      height = 600 - margin.top - margin.bottom; // Actual chart height

// Create the SVG container, setting the full width and height including margins
const svgScatter = d3.select("#scatterPlot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)  // Total width with margins
    .attr("height", height + margin.top + margin.bottom)  // Total height with margins
    .append("g") // Append a `g` element to position the chart content correctly within the SVG
    .attr("transform", `translate(${margin.left},${margin.top})`);  // Offset by the top and left margins

// 2: LOAD...
d3.csv("colleges.csv").then(data => {
    // 2: ... AND REFORMAT DATA
    data.forEach(d => {
        d["earnings"] = +d["Median Earnings 8 years After Entry"];
        d["debt"] = +d["Median Debt on Graduation"];
    })

    // 3: SET AXES SCALES
    let xEarningScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.earnings)])
        .range([0, width]);

    let yDebtScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.debt)])
        .range([height, 0]);

    // 4: PLOT POINTS
    svgScatter.attr("class", "scatter")
        .selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
        .attr("cx", d => xEarningScale(d.earnings))
        .attr("cy", d => yDebtScale(d.debt))
        .attr("r", 5);

    // 5: AXES
    // Add x-axis
    svgScatter.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xEarningScale));
    
    // Add y-axis
    svgScatter.append("g")
        .call(d3.axisLeft(yDebtScale));
    

    // 6: ADD LABELS
    // Add title
    svgScatter.append("text")
        .attr("class", "title")
        .attr("x", width/2)
        .attr("y", - margin.top / 2)
        .text("Median Earnings 8 Years After Entry vs. Median Debt upon Graduation");
    
    // Add x-axis label
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("x", width/2)
        .attr("y", height + (margin.bottom / 2))
        .text("Earnings ($)");

    
    // Add y-axis label
    svgScatter.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("y", -margin.left / 2)
        .text("Median Debt ($)");
    

    // [optional challenge] 7: ADD TOOL-TIP
    // Follow directions on this slide: https://docs.google.com/presentation/d/1pmG7dC4dLz-zfiQmvBOFnm5BC1mf4NpG/edit#slide=id.g32f77c1eff2_0_159
    let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

});
