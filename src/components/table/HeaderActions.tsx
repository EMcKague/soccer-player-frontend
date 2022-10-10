import { Box, Button, ClickAwayListener, Popper } from '@mui/material'
import { useContext, useState } from 'react'
import { Player } from '../../classes/players'
import { MainPgCtx } from '../MainPageContext'

interface HeaderActionsProps {
    column: keyof Player
}

export default function HeaderActions({column}: HeaderActionsProps) {
    const [anchorEl, setAnchorEl] = useState(null)
    const {handleSetColumns, handleSetSortParams} = useContext(MainPgCtx)
    const handleClick = (e:any) => {
        setAnchorEl(e.target)
    }
    const divStyle = {cursor: 'pointer', padding: 5}
    return (
    <>
    
    <Button style={{marginLeft: 5, borderColor: 'grey', maxHeight: 20, width: 20, border: '1px solid black', minWidth: 0}} size='small' type="button" onClick={handleClick}>
        ...
    </Button>
    <Popper id={'1'} open={!!anchorEl} anchorEl={anchorEl}>
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
            <div 
                onClick={() => {handleSetColumns(column); setAnchorEl(null)}}
                style={divStyle}
            >
                    Remove
            </div>
            <div style={divStyle} onClick={() => {handleSetSortParams(column, 'asc'); setAnchorEl(null)}}>Sort Ascending</div>
            <div style={divStyle} onClick={() => {handleSetSortParams(column, 'desc'); setAnchorEl(null)}}>Sort Descending</div>
        </Box>
    </ClickAwayListener>
    </Popper>
    </>
  )
}