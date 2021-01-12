import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './TVShowList.css';
import * as tvshowAPI from '../../services/tvshows-api'
import TVShowCard from '../../components/TVShowCard/TVShowCard'

function TVShowList(props) {

  const [tvshows, setTvshows] = useState([])
  const history = useHistory();

  async function handleDeleteTVShow(id){
    await tvshowAPI.deleteOne(id)
    setTvshows(tvshows.filter(t => t._id !== id))
  }
  
  async function handleUpdateTVShow(updatedTVShowData){
    const newTVShowData = await tvshowAPI.update(updatedTVShowData)
    // setTvshows(tvshows.map(t => t._id === updatedTVShowData._id ? updatedTVShowData : t))
    history.push('/tvshows')
  }

  useEffect(() => {
    history.push('/tvshows')
  }, [tvshows, history])

  useEffect(() => {
    (async function(){
      const tvshows = await tvshowAPI.getAll();
      setTvshows(tvshows)
    })();
  }, [])

  return (
    <>
      <div className='TVShowList-grid'>
        {tvshows.map(tvshow =>
          <TVShowCard 
            key={tvshow._id}
            tvshow={tvshow}
            user={props.user}
            handleDeleteTVShow={handleDeleteTVShow}
            handleUpdateTVShow={handleUpdateTVShow}
          />
        )}
      </div>
    </>
  );
}

export default TVShowList;