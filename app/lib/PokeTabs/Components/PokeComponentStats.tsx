
import {Box} from '@mui/material';

export default function PokeComponentStats({pokemon}:any){
    function fristLetterBig(phase:string){
        return phase.charAt(0).toUpperCase()+phase.slice(1);
    };

    return (
        <Box>
            {pokemon.stats.map((inter:any,index:any)=>(
                <Box key={index}>
                <p><span style={{fontWeight:'bold'}}>{fristLetterBig(inter.stat.name)}</span>: {inter.base_stat}</p>
                </Box>
            ))}
        </Box>
    )
}