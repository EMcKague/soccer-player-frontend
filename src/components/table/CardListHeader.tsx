import { useContext } from "react"
import { Player } from "../../classes/players"
import { camelCaseToNoraml } from "../../helpers/strings"
import { MainPgCtx } from "../MainPageContext"
import GenericSelect from "../selectors/GenericSelect"
import HeaderActions from "./HeaderActions"


export default function CardListHeader() {
  const { columns, handleSetColumns, notSelectedArray, gridColumns } = useContext(MainPgCtx)

  return (
    <div style={{display: 'grid', gridTemplateColumns: gridColumns}}>
        {columns.selected.map((column: keyof Player, index) => (
            <div 
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 60 }}
                key={index}
                > 
                {camelCaseToNoraml(column)}
                <HeaderActions 
                  column={column}
                />
            </div>
        ))}
        {notSelectedArray.length > 0 && <div style={{width: 140}}>
          <GenericSelect 
            label='Player Attributes' 
            handleChange={(e: any) => handleSetColumns(e.target.value)} 
            value={''}
            options={notSelectedArray}
            placeholder='Select a player attribute'
          />
        </div>}
    </div>
  )
}