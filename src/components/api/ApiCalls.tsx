import { Box, ClickAwayListener, Popper } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { MainPgCtx } from "../MainPageContext";



export default function ApiCalls () {
const [data, setData] = useState<any>(null)
const [anchorEl, setAnchorEl] = useState(null)
const {data: playerData} = useContext(MainPgCtx)
const divStyle = {cursor: 'pointer', padding: 5}

// const handlePlayerFetch = (name: string) => {
//     fetch(`http://localhost:5000/players/${name}`)
//         .then(resp => 
//             resp.json().then((body) =>
//                 setData(JSON.stringify(body))
//             ))
// }

const handleFetch = (path: string) => {
    const url = 'http://localhost:5000' + path
    fetch(url).then(resp => 
        resp.json().then((body) => 
            setData(JSON.stringify(body))
        ))
}
return (
    <div>
        <div>
            <Button onClick={(e: any) => {console.log({e}); setAnchorEl(e.target)}}>Player by Name</Button>
            <Button onClick={() => setData(JSON.stringify(playerData, null, 4))}>Players</Button>
            <Button onClick={() => handleFetch('/countries')}>Countries</Button>
            <Button onClick={() => handleFetch('/clubs')}>Clubs</Button>
            <Button onClick={() => handleFetch('/attributes')}>Attributes</Button>
        </div>
        <Popper id={'1'} open={!!anchorEl} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                {playerData.list.map(p => 
                <div 
                    style={divStyle}
                    onClick={() => handleFetch('/players/' + p.name)}
                >{p.name}</div>)}
            </Box>
        </ClickAwayListener>
        </Popper>
        <div style={{border: '1px solid black', height: 200, overflow: 'scroll', maxWidth: 500}}>
            {data}
        </div>
    </div>
  )
}