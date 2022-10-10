import { useContext } from 'react'
import ApiCalls from '../api/ApiCalls'
import GenericError from '../errors/GenericError'
import GenericLoader from '../loaders/GenericLoader'
import { MainPgCtx } from '../MainPageContext'
import CardList from './CardList'

export default function Table () {
    // const {data, isLoading} = Player.loadAll()
    const {data, isLoading} = useContext(MainPgCtx)
    if (isLoading) return <GenericLoader />
    
    if (isLoading) {
        return (
            <GenericLoader />
        )
    }
    if (!data.list.length) {
    return (
        <GenericError />
    )
    }
    return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CardList
        />
        <ApiCalls />
    </div>
  )
}
