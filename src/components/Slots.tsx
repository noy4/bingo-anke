import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Box, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import {
    selectSlotCount,
    selectSlotValues,
} from '../features/counter/counterSlice'

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
    slot5: {
        padding: theme.spacing(2.8),
        margin: theme.spacing(0.5),
        fontSize: '1em',
    },
}))

const Slots = () => {
    const classes = useStyles()
    const slotCount = useSelector(selectSlotCount)
    const slotValues = useSelector(selectSlotValues)
    const slots = []
    for (let i = 0; i < slotCount; i++) {
        slots.push(
            <Avatar
                className={eval(
                    'classes.slot' + (slotCount >= 5 ? 5 : slotCount)
                )} //eslint-disable-line
                key={i}
            >
                <Box component="h1">{slotValues[i]}</Box>
            </Avatar>
        )
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.slots}
        >
            {slots}
        </Grid>
    )
}

export default Slots
