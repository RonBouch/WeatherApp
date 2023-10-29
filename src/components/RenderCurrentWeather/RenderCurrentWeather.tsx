import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './RenderCurrentWeather.css';
import rectangle from '../../assets/images/rectangle.svg'
import scmr from '../../assets/images/SCMR.png'
import MCFW from '../../assets/images/MCFW.png'
import SCAR from '../../assets/images/SCAR.png'
import MCMR from '../../assets/images/MCMR.png'
import T from '../../assets/images/SCMR.png'


export const Item = ({ Temperature, index, LocalizedName, WeatherIcon, WeatherText, LocalObservationDateTime }: any) => {
    const { Imperial, Metric } = Temperature

    const renderImgByType = (type: number) => {
        switch (type) {
            case 3:
                return <img src={scmr} alt="rect" className='weatherImg' />
                break;

            case 6:
                return <img src={MCFW} alt="rect" className='weatherImg' />
                break;

            case 7:
                return <img src={SCAR} alt="rect" className='weatherImg' />
                break;
            default:
                if (type > 7)
                    return <img src={T} alt="rect" className='weatherImg' />
                return <img src={scmr} alt="rect" className='weatherImg' />
                break;
        }
    }

    return (
        <div key={LocalObservationDateTime + index.toString()} className='item-container'>
            <img src={rectangle} alt="rect" className='rectImg' />
            <div className='leftD'>
                <p className='dTxt'>{`${Metric ? Metric?.Value : Imperial?.Value} ${Metric ? Metric?.Unit : Imperial?.Unit}`}</p>
                <p className='cityTxt'>{LocalizedName}</p>

            </div>
            <div className='rightD'>
                {renderImgByType(WeatherIcon)}
                <p className='statusTxt'>{WeatherText}</p>
            </div>
        </div >
    )
}
const RenderCurrentWeather = ({ data, LocalizedName }: any) => {
    const listItems = data?.map((d: any, index: number) => <Item LocalizedName={LocalizedName} key={index.toString()} {...d} index={index} />) || <div />;

    return (
        <div className='cc'>
            {listItems}
        </div>
    )
}

export default RenderCurrentWeather;
