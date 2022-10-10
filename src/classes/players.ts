/* eslint-disable react-hooks/rules-of-hooks */
import { useDoQuery } from "../api/useDoQuery"
import { snakeCase } from "../helpers/strings"

export interface PlayerList {
    list: Player[]
    dict: { [id: Player['id']]: Player }
  }

  export type SortOptions = typeof sortOptions[number]
  export const sortOptions = [
    'asc', 'desc'] as const
    
export interface SortParams {
    sort: SortOptions
    column: keyof Player
}

export type NumberTypes = typeof numberTypes[number]
export const numberTypes = [
'goals', 'assists', 'age', 'heightNum'] as const
export const numberTypesSelection = numberTypes.map((type) => { return {value: type, label: type}} )

export class Player {
    id: number
    name: string
    nationality: string
    nationalPosition: string
    club: string
    height: string
    prefferedFoot: string
    goals: number
    assists: number
    age: number

    get heightNum (): number {return parseInt(this.height.replace(' cm', ''))}

    static loadAll (sortParams?: SortParams): { data: PlayerList, isLoading: boolean } {
        let path = 'http://localhost:5000/players'
        if (sortParams?.sort && sortParams?.column) {
            path = path.concat(`?sort=${sortParams.sort}&column=${snakeCase(sortParams.column)}`)
        }
        return useDoQuery({ path: path, objectClass: Player })
    }


    constructor({ row }: {row: Record<string, any> }) {
        this.id = row.id
        this.name = row.name
        this.nationality = row.nationality
        this.nationalPosition = row.national_position
        this.club = row.club
        this.height = row.height.toString() + ' cm'
        this.prefferedFoot = row.preffered_foot
        this.goals = row.goals
        this.assists = row.assists
        this.age = row.age
    }
}