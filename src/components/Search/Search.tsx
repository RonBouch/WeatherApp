import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Search.css';

interface SearchProps {
    onChange: (e: string, withoutApi?: boolean) => void;
    onSearchClear: () => void;
    onPressCity: (key: string) => void;
    searchValue: string;
}

const Search = ({ onChange, onPressCity, searchValue }: SearchProps) => {
    const { cities } = useSelector((state: RootState) => state.weatherStore);
    let getCities: any = cities.slice()


    const handleChange = useCallback((e: string) => {
        onChange(e);
    }, [onChange]);



    return (
        <div className='search-container' >
            <Autocomplete
                disablePortal
                defaultValue={searchValue}
                id="combo-box-demo"
                options={getCities || []}
                getOptionLabel={(option: any) => option?.LocalizedName || ''}
                onInputChange={(action, value) => handleChange(value)}

                onChange={(action, v: any) => {
                    onPressCity(v?.Key)
                    onChange(v?.LocalizedName, true)
                }}
                sx={{ width: '100%', alignSelf: 'center', }}
                renderInput={(params) => <TextField {...params} label={cities[0]?.LocalizedName || "Search city"} />}
            />
        </div>
    )
}


export default memo(Search);