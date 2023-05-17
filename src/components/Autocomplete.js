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

    const handleOnChange = (value) => {
        setSelectedValue(value);
    };

    const handleOnSearch = (ev) => {
        const filteredOptions = autocompleteOptions.filter((option) => {
                return option.toLowerCase().includes(ev.target.value.toLowerCase());
            }
        );

        if (ev.key === 'Enter' && filteredOptions.length === 0) {
            Modal.confirm({
                title: 'Add Note',
                content: `"${ev.target.value}" not found. Do you want to create a new note?`,
                onOk: () => {
                    dispatch(setAutocompleteOptions([...autocompleteOptions, ev.target.value]));
                    setSelectedValue(ev.target.value);
                    message.success('Note added!');
                },
            });
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
            options={autocompleteOptions.map((option) => ({
                value: option,
            }))}
            filterOption={(inputValue, option) =>
                option?.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            }
            defaultActiveFirstOption={true}
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
