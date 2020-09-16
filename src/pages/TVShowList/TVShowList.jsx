import React from 'react';
import TVShowCard from '../../components/TVShowCard/TVShowCard'

import './TVShowList.css';

function TVShowList(props) {
    return (
        <>
            <div className='TVShowList-grid'>
                {props.tvshows.map(tvshow =>
                    <TVShowCard 
                        key={tvshow._id}
                        tvshow={tvshow}
                        user={props.user}
                        handleDeleteTVShow={props.handleDeleteTVShow}
                    />
                )}
            </div>
        </>
    );

}

export default TVShowList;