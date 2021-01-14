import React, { useState, useEffect } from 'react'
import './TVShowList.css'
import * as tvshowAPI from '../../services/tvshows-api'

const TVShowList = (props) => {

  const [tvshows, setTvshows]= useState([])

  useEffect(() => {
    (async function(){
      const tvshows = await tvshowAPI.getAll()
      setTvshows(tvshows)
    })();
  },[])
  
  return ( 
    <h3>TV Show List</h3>
  );
}
 
export default TVShowList;