import { QueryClient, QueryClientProvider } from "react-query"
import { Player } from "./classes/players"
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
  const {data, isLoading} = Player.loadAll()
  if (isLoading) return <p>Loading...</p>

  return (
    // <div>
    //   {data.list.map((player: Player, index: number) => {
    //     return <p key={index}>{player.club}, {player.height}, {player.name}, {player.nationalPosition}, {player.nationality} {player.prefferedFoot}</p>
    //   })}
    // </div>
    <div>
      <Table 
        rows={data.list}
        isLoading={isLoading}
        columns={['name', 'nationality', 'nationalPosition', 'club', 'height', 'prefferedFoot']}
      />
    </div>
  )
}

