import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function TagInput(props) {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;


        let tagList = typeof value === 'string' ? value.split(',') : value

        props.handleUpdateTagList(tagList)


    };

    const createTag = () => {
        let newTag = prompt('Creer nouveau TAG')

        let taskTagList = [...getValue()]
        taskTagList.push(newTag)

        props.handleUpdateTagList(taskTagList)

        props.handleAddTag(newTag)

    }

    const getValue = () => {
        return props.value != null ? props.value : []
    }

    return (
        <div>
            <FormControl sx={{ m: 0, mt: 2, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={getValue()}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.tagList.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, getValue(), theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={() => createTag()}>Ajouter un nouveau TAG</Button>
            </FormControl>
        </div>
    );
}
