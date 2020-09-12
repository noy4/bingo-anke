import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    slots: {
        height: '20vh',
        margin: '10vh 0 5vh',
    },
    slot1: {
        padding: theme.spacing(8),
        fontSize: '3.5em',
    },
    slot2: {
        padding: theme.spacing(6),
        margin: theme.spacing(1),
        fontSize: '2.5em',
    },
    slot3: {
        padding: theme.spacing(4.5),
        margin: theme.spacing(1),
        fontSize: '1.8em',
    },
    slot4: {
        padding: theme.spacing(3.5),
        margin: theme.spacing(0.5),
        fontSize: '1.4em',
    },
}));

interface SlotsProps {
    numberOfSlot: number,
    slotValues: number[],
}

const Slots = (props: SlotsProps) => {
    const classes = useStyles();
    const slots = [];
    for (let i = 0; i < props.numberOfSlot; i++) {
        slots.push(
            <Avatar className={eval('classes.slot' + props.numberOfSlot)} key={i}>
                <Box component="h1">{props.slotValues[i]}</Box>
            </Avatar>
        );
    }

    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            className={classes.slots}>
                
            {slots}
        </Grid>
    );
};

export default Slots;