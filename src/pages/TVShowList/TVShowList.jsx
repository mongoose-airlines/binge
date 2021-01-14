import React, { useState, useEffect } from 'react'
import './TVShowList.css'
import * as tvshowAPI from '../../services/tvshows-api'
import TVShowCard from '../../components/TVShowCard/TVShowCard'

const TVShowList = (props) => {

  const [tvshows, setTvshows]= useState([])

  async function handleDeleteTVShow(id){
    await tvshowAPI.deleteOne(id)
    setTvshows(tvshows.filter(t => t._id !== id))
  }

  useEffect(() => {
    (async function(){
      const tvshows = await tvshowAPI.getAll()
      setTvshows(tvshows)
    })();
  },[])
  
  return ( 
    <>
      <div className='TVShowList-grid'>
        {tvshows.map(tvshow =>
          <TVShowCard 
            key={tvshow._id}
            tvshow={tvshow}
            user={props.user}
            handleDeleteTVShow={handleDeleteTVShow}
          />
        )}
      </div>
    </>
  );
}
 
export default TVShowList;