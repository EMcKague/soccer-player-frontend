import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import Graph from "./components/graph/Graph"
import { MainPageContextProvider } from "./components/MainPageContext"
import Table from "./components/table/Table"


const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  useState(() => {
    const divEl = document.getElementsByClassName('basicBarChart')
    console.log({divEl})
    if (divEl.length > 0) {
      const parent = divEl[0]
      const children = parent.childNodes[0]
      parent.replaceChildren(children)
      console.log({children})
    }
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <MainPageContextProvider>
        <Table />
        <Graph />
      </MainPageContextProvider>
    </div>
  )
}

