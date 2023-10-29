import React from 'react'
import './Favorite.css';
import { RenderCurrentWeather } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const Favorite = () => {
    const { favorites } = useSelector((state: RootState) => state.weatherStore);

    return (
        <div className='page-container'>
            <h1>My Favorites</h1>

            {(favorites && favorites.length > 0) ?
                <RenderCurrentWeather
                    data={favorites}
                /> :
                <h1 className='no-results'>No-Results</h1>}
        </div>
    )
}

export default Favorite;
