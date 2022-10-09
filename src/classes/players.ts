/* eslint-disable react-hooks/rules-of-hooks */
import { useDoQuery } from "../api/useDoQuery"

interface PlayerList {
    list: Player[]
    dict: { [id: Player['id']]: Player }
  }

export class Player {
    id: number
    name: string
    nationality: string
    nationalPosition: string
    club: string
    height: string
    prefferedFoot: string

    static loadAll (): { data: PlayerList, isLoading: boolean } {
        return useDoQuery({ path: 'http://localhost:5000/players', objectClass: Player })
    }


    constructor({ row }: {row: Record<string, any> }) {
        this.id = row.id
        this.name = row.name
        this.nationality = row.nationality
        this.nationalPosition = row.national_position
        this.club = row.club
        this.height = row.height.toString() + ' cm'
        this.prefferedFoot = row.preffered_foot
    }
}