import React from 'react'
import GenericError from '../errors/GenericError'
import GenericLoader from '../loaders/GenericLoader'
import CardList from './CardList'

interface TableProps {
    rows: any[]
    isLoading: boolean
    columns: string[]
}

export default function Table({rows, isLoading, columns}: TableProps) {
    if (isLoading) {
        return (
            <GenericLoader />
        )
    }
    if (!rows.length) {
    return (
        <GenericError />
    )
    }
    return (
    <>
    <CardList
        rows={rows} 
        columns={columns}    
    />
    </>
  )
}
