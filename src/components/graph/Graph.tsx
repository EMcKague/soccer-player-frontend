import * as d3 from "d3"
import { useContext } from "react"
import { MainPgCtx } from "../MainPageContext"
import { useEffect } from 'react'
import { numberTypesSelection, Player } from "../../classes/players"
import GenericSelect from "../selectors/GenericSelect"


export default function Graph() {
  const {setSelectedGraphAttribute, selectedGraphAttribute} = useContext(MainPgCtx)

  return (
    <div style={{marginLeft: 50}}>
      <GenericSelect 
        label={"Attribute"} 
        handleChange={(e: any) => setSelectedGraphAttribute(e.target.value)} 
        value={selectedGraphAttribute} 
        options={numberTypesSelection}      
      />
      <BasicBarChart 
        top={50} 
        right={50} 
        bottom={200} 
        left={100} 
        width={600} 
        height={600}
        fill={"red"} 
      />
    </div>
  )
  
}

interface IBasicBarChartProps {
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
  fill: string
}

const BasicBarChart = (props: IBasicBarChartProps) => {
  const {data, selectedGraphAttribute, isLoading, selectedPlayer} = useContext(MainPgCtx)
 
  const draw = () => {
    const width = props.width - props.left - props.right
    const height = props.height - props.top - props.bottom

    const x = d3.scaleBand().range([0, width]).padding(0.1)
    const y = d3.scaleLinear().range([height, 0])
    function graph() {
    const svg = d3
      .select('.basicBarChart')
      .append('svg')
      .attr('width', width + props.left + props.right)
      .attr('height', height + props.top + props.bottom)
      .append('g')
      .attr('transform', `translate(${props.left},${props.top})`)

      x.domain(data.list.map((d) => {return d.name}))
      y.domain([0, d3.max(data.list, (d) => { return Math.max(...data.list.map((dt) => dt[selectedGraphAttribute]), 0)}),] as number[])

      svg
        .selectAll('.bar')
        .data(data.list)
        .enter()
        .append('rect')
        .attr('fill', function(d) {return d.name === selectedPlayer?.name  ? 'black' : props.fill})
        .attr('class', 'bar')
        .attr('x', (d) => {
          return x(d.name) || 0
        })
        .attr('width', x.bandwidth())
        .attr('y', (d) => {
          return y(d[selectedGraphAttribute])
        })
        .attr('height', (d) => {
          return height - y(d[selectedGraphAttribute])
        })
      // add the x Axis
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr('transform', function(d) { return d === selectedPlayer?.name ? `translate(50, -${height + 50})` : "translate(-10,0)rotate(-45)"})
        .style("text-anchor", "end");

      // add the y Axis
      svg.append('g').call(d3.axisLeft(y))

      svg.exit().remove()
    }
    return graph
  }

  const update = draw()
  const container = d3.select('basicBarChart')

  function createGraph(data: Player[]) {
    d3.select("svg").remove();
    d3.select("svg").remove();
    container.datum(data).call(update)
  }

  useEffect(() => {
    if (!isLoading)
      createGraph(data.list)
    })



  return <div className="basicBarChart" />
}

