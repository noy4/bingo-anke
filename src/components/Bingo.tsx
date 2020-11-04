import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Grid, Box, Paper } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'
import { selectBingoCard, Square } from '../features/user/userSlice'

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
    },
}))

//ビンゴカードを作る
export function makeBingoCard() {
    const col_0 = makeColumn(0)
    const col_1 = makeColumn(1)
    const col_2 = makeColumn(2)
    const col_3 = makeColumn(3)
    const col_4 = makeColumn(4)
    const list = [...col_0, ...col_1, ...col_2, ...col_3, ...col_4]
    list[12] = {
        value: 0,
        isValid: true,
    }
    return list
}
//ビンゴカードの1列を作る
function makeColumn(base: number) {
    const array = Array(15)
        .fill(0)
        .map((_, i) => i + 15 * base + 1)
    const list = []
    for (let i: number = 1; i <= 5; i++) {
        const a: number = ~~(Math.random() * array.length)
        list.push({ value: array[a], isValid: false })
        array.splice(a, 1)
    }
    return list
}

//ビンゴの数をチェックする
export function checkBingo(bingoCard: Square[]) {
    let counter = 0
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i]
        if (
            bingoCard[a].isValid &&
            bingoCard[b].isValid &&
            bingoCard[c].isValid &&
            bingoCard[d].isValid &&
            bingoCard[e].isValid
        ) {
            counter++
        }
    }
    return counter
}

const Bingo = () => {
    const classes = useStyles()
    const bingoCard = useSelector(selectBingoCard)

    const renderSquare = (i: number) => {
        return (
            <Box bgcolor="white" p={0} m={0.2} borderRadius="10px">
                <Avatar
                    className={clsx(
                        classes.avatar,
                        bingoCard[i].isValid
                            ? classes.validAvatarColor
                            : classes.avatarColor
                    )}
                >
                    {bingoCard[i].value}
                </Avatar>
            </Box>
        )
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item container direction="column" xs>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                </Grid>
                <Grid item container direction="column" xs>
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                    {renderSquare(9)}
                </Grid>
                <Grid item container direction="column" xs>
                    {renderSquare(10)}
                    {renderSquare(11)}
                    {renderSquare(12)}
                    {renderSquare(13)}
                    {renderSquare(14)}
                </Grid>
                <Grid item container direction="column" xs>
                    {renderSquare(15)}
                    {renderSquare(16)}
                    {renderSquare(17)}
                    {renderSquare(18)}
                    {renderSquare(19)}
                </Grid>
                <Grid item container direction="column" xs>
                    {renderSquare(20)}
                    {renderSquare(21)}
                    {renderSquare(22)}
                    {renderSquare(23)}
                    {renderSquare(24)}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Bingo
