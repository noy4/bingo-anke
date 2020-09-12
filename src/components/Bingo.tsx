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
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    avatarColor: {
        backgroundColor: 'white',
        color: blue[200],
    },
    validAvatarColor: {
        backgroundColor: blue[300],
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
            <Box bgcolor='white' p={0} m={0.2} borderRadius='10px'>
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
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item container direction='column' xs>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                </Grid>
                <Grid item container direction='column' xs>
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                    {renderSquare(9)}
                </Grid>
                <Grid item container direction='column' xs>
                    {renderSquare(10)}
                    {renderSquare(11)}
                    {renderSquare(12)}
                    {renderSquare(13)}
                    {renderSquare(14)}
                </Grid>
                <Grid item container direction='column' xs>
                    {renderSquare(15)}
                    {renderSquare(16)}
                    {renderSquare(17)}
                    {renderSquare(18)}
                    {renderSquare(19)}
                </Grid>
                <Grid item container direction='column' xs>
                    {renderSquare(20)}
                    {renderSquare(21)}
                    {renderSquare(22)}
                    {renderSquare(23)}
                    {renderSquare(24)}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Bingo;