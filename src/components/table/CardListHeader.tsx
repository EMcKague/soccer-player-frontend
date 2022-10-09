import { camelCaseToNoraml } from "../../helpers/strings"



interface CardListHeaderProps {
    columns: string[]
}

export default function CardListHeader({columns}: CardListHeaderProps) {
  return (
    <div style={{display: 'grid', gridTemplateColumns: '150px 150px 150px 150px 150px 150px'}}>
        {columns.map((column: string, index) => (
            <div 
                key={index}
                > 
                {camelCaseToNoraml(column)}
            </div>
        ))}
    </div>
  )
}