/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}


const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 20
});

function fetchDefautValue(props) {
    props.cities.forEach((city, index) => {
        if(JSON.stringify(city) === JSON.stringify(props.defaultCity)) {
            return city
        }
    })
}

export default function LocationSearch(props) {
    const classes = useStyles();
    const cities = props.cities;


    return (
        <Autocomplete
            id="country-select-demo"
            style={{ width: '100%', marginLeft: 10, paddingRight: 20 }}
            options={cities}
            classes={{
                option: classes.option,
            }}
            onChange={(event, newValue) => {
                props.handleSearchChange(newValue)
            }}
            autoHighlight
            getOptionLabel={(option) => option.name}
            defaultValue={props.defaultCity}
            filterOptions={filterOptions}
            renderOption={(option) => (
                <React.Fragment>
                    {option.name}, {option.subcountry}, {option.country}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a city"
                    variant="outlined"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}