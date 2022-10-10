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
  return (
    <div style={{ display: 'flex', alignItems: 'center'}}>
      <MainPageContextProvider>
        <Table />
        <Graph />
      </MainPageContextProvider>
    </div>
  )
}

