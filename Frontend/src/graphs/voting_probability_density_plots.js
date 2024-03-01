import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default function VotingPDensityPlots() {
  //blacks
  const dummyData1 = [57.21617925425335, 63.59556602618877, 63.865192019158286, 55.54245799005092, 67.209390380228, 60.983221393222446, 61.96315682563249, 58.0992391744748, 51.19859590882784, 62.712673621774635, 64.46356529336397, 52.78377407307631, 59.47071525049943, 60.4906864173672, 63.44693812488673, 53.89016375079745, 63.45701009882658, 60.11082174785831, 58.875342980989576, 51.74814634273224, 51.38849397455017, 59.76318726743053, 65.85747874279857, 57.079609294575965, 62.72359479583417, 60.26782986406152, 52.01111659750176, 52.47328552588403, 54.60442131060149, 55.44848164639633, 57.72745915614645, 66.38919307466915, 64.25141410167824, 67.44831277354605, 55.2376467644843, 63.91864018204529, 67.0363439671109, 60.60786306346917, 66.4988041705777, 55.87113133224539, 62.97522027964113, 65.63518356400552, 51.85949217444112, 58.27148993166345, 54.7162933524383, 57.122882486173956, 67.52515348001794, 67.50156906857508, 63.73274798128068, 65.00563237730833, 65.29206388458996, 67.28265205207302, 61.09182559548821, 64.5523196347088, 64.94518636943956, 63.93088412152234, 61.61172494055364, 57.56554767093412, 51.92642983916864, 59.64394610859093, 59.77118136233684, 55.84156917415226, 51.45226299893845, 51.51479483164774, 59.12310506673562, 60.17003693427553, 61.66240233279449, 58.99448070309937, 59.922316409925515, 61.18544365146002, 67.53274305826552, 61.36588377655035, 67.58753172726911, 65.158004868068, 59.86529615737336, 57.38187047138377, 60.45722149008835, 65.40662369289114, 55.835317848105575, 61.05301097282048, 67.24551353757998, 62.75900891636579, 57.23501452004246, 64.51667235708502, 61.9483069943455, 59.75429422900028, 65.14267593525955, 64.44147784567058, 66.74493804045138, 63.10422337064243, 52.08966232058246, 56.15868683592654, 65.89797104784062, 54.583762632829565, 52.81921549918789, 58.59599902723621, 64.11891478231212, 60.77422120276945, 54.65649392744069]

  //whites
  const dummyData2 = [25.749004678591557, 26.71722734588594, 26.68209044624451, 29.315388204347236, 25.65862838173317, 24.68257483942083, 29.205105021687765, 27.48127929219548, 22.90061616268648, 28.70366243120444, 22.881472678229955, 21.41702235835405, 23.63615374828862, 28.29425069508688, 25.407663510301287, 22.45153016030513, 26.664184356362543, 29.40122178296714, 26.113200071618224, 25.805439758309754, 26.24264370876477, 29.884493229214875, 21.51538081937095, 23.255593009522635, 24.157656409331365, 26.626744466715415, 24.620239242101308, 22.682327683929768, 27.702815159313848, 25.669868587043205, 24.43455647443141, 23.036370398003255, 28.82115888056383, 26.10742396549136, 22.775406956611216, 23.88950453106429, 24.949319675053283, 28.424265686987383, 27.072264739535647, 25.667446678565427, 21.07346842187857, 27.06533393214869, 27.468951289324185, 22.369007666696836, 23.77471247018676, 22.233024089363707, 21.141886899255143, 24.99906293304444, 26.93167520880584, 23.04767675589614, 27.069486859234396, 26.516183973148363, 29.329456251086537, 27.708448164825445, 26.79113616508101, 28.183560095149774, 28.875199989598686, 27.060154487591024, 22.24016907018831, 23.895579719180235, 26.433064625370677, 24.129791467884183, 26.550179669454116, 21.89506003133373, 29.026672214135946, 23.188542078300347, 29.55508404266136, 25.124118570248073, 27.130304926497013, 29.196517767792174, 27.525989343591905, 27.309259745002, 27.896987587582506, 21.194358916401374, 29.02887684565413, 25.777387444108447, 22.2894260358709, 23.38068108544684, 22.61021237544294, 22.644500408809726, 27.472949358223853, 29.325083010833663, 21.582802295891228, 27.988992655052833, 24.658793005135206, 26.745932184155198, 22.08826728417632, 28.58588880906283, 26.512791827049685, 27.732595108071028, 22.54588492911536, 27.25429183711227, 27.775580199086196]

  // {
    useEffect(() => {
      //clear previous graph
      d3.select("#my_dataviz svg").remove(); 

      //css should be better :)

      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 30, bottom: 50, left: 70},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
      // append the svg object to the body of the page
      var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
      
      // add the x Axis THIS IS THE VALUE -> SHOULD BE SPACED OUT RELATIVE TO THEIR ABSOLUTE VALUES
      //this means use the values from 0 to 100 rather than 0 to 1
      var x = d3.scaleLinear()
      .domain([0,100])
      .range([0, width]);
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      // Add X axis label:
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-120)
      .attr("y", height+30) //this is reverse
      .text("Likelihood of Support");
      
      // add the y Axis THIS IS THE DENSITY
      var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0.0, 0.1]);
      svg.append("g")
      .call(d3.axisLeft(y));

      // Y axis label:
      svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+25) //greater value = right
      .attr("x", -margin.top-60) //greater value = up
      .text("Probability Density")

      //TITLE 
      svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width/2)
      .attr("y", height/25) //this is reverse
      .text("Support for Democratic Representative");
 
      /////////
      // Function to compute density
      function kernelDensityEstimator(kernel, X) {
        return function(V) {
          return X.map(function(x) {
            return [x, d3.mean(V, function(v) { return kernel(x - v); })];
          });
        };
      }
      function kernelEpanechnikov(k) {
        return function(v) {
          return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
      }
      /////////

      
      // Compute kernel density estimation
      var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(100)) //lower number of ticks = more spread
      //KDE FUNCTION TAKES IN AN ARRAY OF VALUES (the % of a district that has voted [dem/rep])
      console.log(kde)
      var density1 =  kde(dummyData1);
      var density2 =  kde(dummyData2)
          
          // Plot the area
          svg.append("path")
          .attr("class", "mypath")
          .datum(density1)
          .attr("fill", "#69b3a2")
          .attr("opacity", ".6")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("stroke-linejoin", "round")
          .attr("d",  d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
          );
          
          // Plot the area
          svg.append("path")
          .attr("class", "mypath")
          .datum(density2)
          .attr("fill", "#404080")
          .attr("opacity", ".6")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("stroke-linejoin", "round")
          .attr("d",  d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
          );
          
        // });
        
        // Handmade legend
        svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
        svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
        svg.append("text").attr("x", 320).attr("y", 30).text("Blacks").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 320).attr("y", 60).text("Whites").style("font-size", "15px").attr("alignment-baseline","middle")
      
      }, []);
      
    return (
    <div>
    <div id="my_dataviz"></div>
    </div>
    );
  // }
}
  
