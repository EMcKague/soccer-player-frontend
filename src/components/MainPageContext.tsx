import { createContext, useEffect, useReducer, useState } from "react";
import { NumberTypes, Player, PlayerList, SortOptions, SortParams } from "../classes/players";
import { camelCaseToNoraml } from "../helpers/strings";

interface MainPageContextInterface {
    selectedPlayer?: Player
    setSelectedPlayer: (player: Player) => void
    handleSetColumns: (column: keyof Player) => void
    columns: {selected: (keyof Player)[], notSelected: (keyof Player)[]}
    notSelectedArray: {value: keyof Player, label: string}[]
    gridColumns: string
    data: PlayerList
    isLoading: boolean
    handleSetSortParams: (column: keyof Player, sort: SortOptions) => void
    playerNames: string[]
    selectedGraphAttribute: NumberTypes
    setSelectedGraphAttribute: (attribute: NumberTypes) => void
}

export const MainPgCtx = createContext<MainPageContextInterface>({
    selectedPlayer: undefined,
    setSelectedPlayer: (p: Player) => console.log(),
    handleSetColumns: (column: keyof Player) => console.log(),
    columns: {selected: [], notSelected: []},
    notSelectedArray: [],
    gridColumns: '',
    data: {dict: {}, list: []},
    isLoading: true,
    handleSetSortParams: (column: keyof Player, sort: SortOptions) => console.log(),
    playerNames: [],
    selectedGraphAttribute: 'heightNum',
    setSelectedGraphAttribute: (attribute: NumberTypes) => console.log() 
});

const reducer = (state: any, changes: any) => {
    return {...state, ...changes}
}

const startingColumns: (keyof Player)[] = ['name', 'nationality', 'nationalPosition', 'club', 'height', 'prefferedFoot']
const startintNotSeleted: (keyof Player)[] = ['age', 'assists', 'goals']

// Provider in your app
export function MainPageContextProvider (props: any) {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined)
    const [columns, setColumns] = useReducer(reducer, {selected: startingColumns, notSelected: startintNotSeleted})
    const [gridColumns, setGridColumns] = useState('')
    const [sortParams, setSortParams] = useState<SortParams | undefined>(undefined)
    const { data, isLoading } = Player.loadAll(sortParams)
    const [selectedGraphAttribute, setSelectedGraphAttribute] = useState<NumberTypes>('goals')
    
    const handleSetColumns = (column: keyof Player) => {
        let newSelectedColumns = []
        let newNotSelectedColumns = []
        if (columns.selected.includes(column)) {
            newSelectedColumns = columns.selected.filter((selectedColumn: keyof Player) => selectedColumn !== column)
            newNotSelectedColumns = [...columns.notSelected, column] 
        }
        else {
            newNotSelectedColumns = columns.notSelected.filter((notSelectedColumn: keyof Player) => notSelectedColumn !== column)
            newSelectedColumns = [...columns.selected, column]
        }
        setColumns({selected: newSelectedColumns, notSelected: newNotSelectedColumns})
    }

    const handleSetSortParams = (column: keyof Player, sort: SortOptions) => {
        setSortParams({sort: sort, column: column})
    }

    useEffect(() => {
        let newGridColumns = ''
        columns.selected.forEach(() => newGridColumns = newGridColumns.concat('150px '))
        if (columns.notSelected.length > 0) {
            newGridColumns = newGridColumns.concat('150px ')
        }
        setGridColumns(newGridColumns)
    }, [columns])

    const notSelectedArray: {value: keyof Player, label: string}[] = []
    columns.notSelected.forEach((column: keyof Player) => notSelectedArray.push({ value: column, label: camelCaseToNoraml(column)}))
    const playerNames = data.list.map((player) => player.name)


    return  (
        <MainPgCtx.Provider
            value={{ 
                selectedPlayer,
                setSelectedPlayer,
                handleSetColumns,
                columns,
                notSelectedArray,
                gridColumns,
                data,
                isLoading,
                handleSetSortParams,
                playerNames,
                selectedGraphAttribute,
                setSelectedGraphAttribute
            }}
        >
            {props.children}
        </MainPgCtx.Provider>
        
    )
    }
