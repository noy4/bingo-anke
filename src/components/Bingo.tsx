import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Grid, Box} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        padding: theme.spacing(3),
        fontSize: '2em',
        fontWeight: 'bold',
    },
    avatarColor: {
        backgroundColor: 'grey',
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
            <Box bgcolor='white' p={2} m={0.5}>
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
        <Box bgcolor="black" p={1}>
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
        </Box>
    );
};

export default Bingo;