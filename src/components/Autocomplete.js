import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, message, Modal, Input } from 'antd';
import { setAutocompleteOptions } from '../actions/action';

const Autocomplete = () => {

    const { Search } = Input;
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const autocompleteOptions = useSelector(
        (state) => state.autocompleteOptions
    );

    const [options, setOptions] = useState(autocompleteOptions);


    const handleOnChange = (value) => {
        setSelectedValue(value);
    };
    // const handleOnSelect = (value) => {
    //     // Perform any action or logic when an item is selected
    //     console.log('Selected value:', value);
    // };

    const handleOnSearch = (ev) => {
        // Filter the autocomplete options based on the search query

        // console.log(autocompleteOptions, ev.target.value.toLowerCase());
        const filteredOptions = autocompleteOptions.filter((option) => {
            // console.log(option.toLowerCase(), ev.target.value.toLowerCase());
                return option.toLowerCase().includes(ev.target.value.toLowerCase());
            }
        );
        // dispatch(setAutocompleteOptions(filteredOptions));

        setOptions(filteredOptions);

        if (ev.key === 'Enter' && filteredOptions.length === 0) {

            // Display a popup to add the value as a new item
            Modal.confirm({
                title: 'Add Note',
                content: `"${ev.target.value}" not found. Do you want to create a new note?`,
                onOk: () => {
                    dispatch(setAutocompleteOptions([...autocompleteOptions, ev.target.value]));
                    setSelectedValue(ev.target.value);
                    message.success('Note added!');
                },
            });
        } else if(ev.key === 'Enter' && filteredOptions.length > 0) {
            // console.log(filteredOptions[0])
            setSelectedValue(filteredOptions[0]);
        }
    };

    return (
        <AutoComplete
            value={selectedValue}
            style={{
                width: 300,
            }}
            onChange={handleOnChange}
            // onSelect={handleOnSelect}
            // onSearch={handleOnSearch}
            options={options.map((option) => ({
                value: option,
            }))}
        >
            <Search
                placeholder="input here"
                className="custom"
                style={{ height: 50 }}
                onKeyPress={handleOnSearch}
            />
        </AutoComplete>
    );
};

export default Autocomplete;
