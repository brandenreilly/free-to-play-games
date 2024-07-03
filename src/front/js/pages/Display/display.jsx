import React, { useContext , useState , useEffect } from "react";
import { Context } from "../../store/appContext";
import "../Display/display.css"

export const Display = () => {
    const { store , actions } = useContext(Context)
    const [ games , setGames ] = useState(null)
    
    useEffect(()=>{         // Happens once on page load.
        getGames()
    },[])

    const getGames = () => {
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
        const options = {
	        method: 'GET',
	        headers: {
		        'x-rapidapi-key': '0be2c6ee08msh09f5b606ef00be5p12323cjsn62bad5bcc967',
		        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	        }
        };
        fetch(url, options)
        .then(resp => resp.json())
        .then(data => setGames(data))
    }

    return (
        <div>
            This is a test Div.
        </div>
    )
}