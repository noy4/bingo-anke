import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Grid, Box, Paper} from '@material-ui/core';
import { pink, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: blue[200],
        padding: theme.spacing(1),
    },
    avatar: {
        padding: theme.spacing(3),
        fontSize: '2em',
        fontWeight: 'bold',
    },
    avatarColor: {
        backgroundColor: '#ccc',
    },
    validAvatarColor: {
        backgroundColor: 'red',
    }
}));

interface Square {
    value: number,
    isValid: boolean
}
export interface BingoProps {
    bingoCard: Square[],
}
const Bingo: React.FC<BingoProps> = (props) => {
    const classes = useStyles();

    const renderSquare = (i: number) => {
        return (
            <Box bgcolor='white' p={2} m={0.5} borderRadius='10px'>
                <Avatar
                    className={
                        clsx(classes.avatar,
                            props.bingoCard[i].isValid
                            ? classes.validAvatarColor
                            : classes.avatarColor)}
                >
                    {props.bingoCard[i].value}
                </Avatar>
            </Box>
        );
    };

    return (
        // bgcolor="black" p={1} borderRadius='5px'
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item container direction='column' xs={4}>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </Grid>
                <Grid item container direction='column' xs={4}>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </Grid>
                <Grid item container direction='column' xs={4}>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Bingo;