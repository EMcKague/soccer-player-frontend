import { Card, CardContent } from '@mui/material'
import CardListHeader from './CardListHeader'

interface CardListProps {
    rows: any[]
    columns: string[]
}

export default function CardList({rows, columns}: CardListProps) {
  return (
    <div style={{maxWidth: '50%'}}>
      <CardListHeader 
        columns={columns}
      />
      {rows.map((classObj, index) =>
      <Card
        style={{display: 'grid', gridTemplateColumns: '150px 150px 150px 150px 150px 150px'}}
        key={index}
      >
        {columns.map((column, index) => 
          <CardContent
            key={index}
          >
            {classObj[column]}
          </CardContent>
        )}
      </Card>
      )}
    </div>
  )
}
