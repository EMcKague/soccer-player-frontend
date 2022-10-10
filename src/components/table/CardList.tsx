import { Card, CardContent, Tooltip } from '@mui/material'
import { useContext } from 'react'
import { MainPgCtx } from '../MainPageContext'
import CardListHeader from './CardListHeader'

export default function CardList() {
  const { selectedPlayer, setSelectedPlayer, columns, gridColumns, data: { list: rows } } = useContext(MainPgCtx)
  const mainStyle =  {display: 'grid', gridTemplateColumns: gridColumns, width: 'fit-content'}
  const selectedStyle = Object.assign({}, mainStyle, {border: '1px solid black'})
  return (
    <div>
      <CardListHeader />
      {rows.map((classObj, index) =>
      {
        const style = classObj.name === selectedPlayer?.name ? selectedStyle : mainStyle
      return (
      <Card
        style={style}
        key={index}
        onClick={() => setSelectedPlayer(classObj)}
      >
        {columns.selected.map((column, index) =>
        <Tooltip 
          title={classObj[column]}
          key={index}
          >
          <CardContent
            key={index}
            style={{ whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'}}
          >
            {classObj[column]}
          </CardContent>
          </Tooltip>
        )}
        {}
      </Card>)}
      )}
    </div>
  )
}
