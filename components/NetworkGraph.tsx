
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkLink, RiskLevel } from '../types';

interface Props {
  nodes: NetworkNode[];
  links: NetworkLink[];
  height?: number;
}

const NetworkGraph: React.FC<Props> = ({ nodes, links, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3.forceSimulation<any>(nodes)
      .force("link", d3.forceLink<any, any>(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-150))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.weight));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", d => {
        if (d.risk === RiskLevel.CRITICAL) return "#ef4444";
        if (d.risk === RiskLevel.HIGH) return "#f97316";
        if (d.risk === RiskLevel.MEDIUM) return "#eab308";
        return "#22c55e";
      })
      .call(d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    node.append("title")
      .text(d => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    return () => simulation.stop();
  }, [nodes, links, height]);

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-slate-700">
      <svg ref={svgRef} className="w-full" style={{ height: `${height}px` }} />
    </div>
  );
};

export default NetworkGraph;
