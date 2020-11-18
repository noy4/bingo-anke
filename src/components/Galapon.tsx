import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import Adjust from '@material-ui/icons/Adjust'
import CheckCircleOutlineRounded from '@material-ui/icons/CheckCircleOutlineRounded'
import { useDispatch, useSelector } from 'react-redux'
import {
    handleRankers,
    selectBalls,
    selectBingoCard,
    selectBingoCount,
    selectScore,
    setBalls,
    setSquareTrue,
    setBingoCount,
    setScore,
    setSlotCount,
    setSlotValues,
} from '../features/user/userSlice'
import { checkBingo } from './Bingo'
import {
    setModal,
    setBingoNotice,
    selectBonus,
} from '../features/system/systemSlice'
import { GROUP } from '../app/const'
import { selectGroup } from '../features/group/groupSlice'

export interface GalaponProps {
    galable?: boolean
    slotCount?: number
}

export default function Galapon(props: GalaponProps) {
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()
    const balls = useSelector(selectBalls)
    const score = useSelector(selectScore)
    const bingoCard = useSelector(selectBingoCard)
    const bingoCount = useSelector(selectBingoCount)
    const bonus = useSelector(selectBonus)
    const group = useSelector(selectGroup)

    //ガラポンを回す
    async function galapon(slotCount: number = 1) {
        dispatch(setSlotCount(slotCount))
        dispatch(setModal(true))
        const updatedBalls = balls.slice()
        const slotIndexes = Array(slotCount)
            .fill(0)
            .map((_, i) => i)
        const drawnBalls: number[] = []

        const interval = setInterval(() => slot(slotIndexes), 50)

        for (let i = 0; i < slotCount; i++) {
            await sleep(200)
            const a = ~~(Math.random() * updatedBalls.length)
            const ball = updatedBalls[a]
            slotIndexes.splice(0, 1)
            updatedBalls.splice(a, 1)
            drawnBalls.push(ball)
            dispatch(setSlotValues({ [i]: ball }))
        }
        clearInterval(interval)

        await sleep(500)
        let updatedScore = score
        const bingoCardSlice = [...bingoCard]
        for (let i = 0; i < slotCount; i++) {
            const squareIndex = bingoCard.findIndex(
                (square) => square.value === drawnBalls[i]
            )
            if (squareIndex !== -1) {
                await sleep(200)
                bingoCardSlice[squareIndex] = {
                    ...bingoCardSlice[squareIndex],
                    isValid: true,
                }
                dispatch(setSquareTrue(squareIndex))
                updatedScore += drawnBalls[i]
            }
        }

        const updatedBingoCount = checkBingo(bingoCardSlice)

        if (bingoCount !== updatedBingoCount) {
            dispatch(setBingoNotice(true))
        }
        dispatch(setBingoCount(updatedBingoCount))
        dispatch(setScore(updatedScore))
        dispatch(setBalls(updatedBalls))

        if ([GROUP.A3, GROUP.B3].includes(group) || bonus) {
            dispatch(handleRankers({ updatedBingoCount, updatedScore }))
        }
    }

    //スロットに番号をセットする
    function slot(slotIndexes: number[]) {
        const a = ~~(Math.random() * balls.length)
        const updatedSlotValues: number[] = []
        slotIndexes.forEach((slotIndex) => {
            updatedSlotValues[slotIndex] = balls[a]
        })
        dispatch(setSlotValues(updatedSlotValues))
    }

    //引数秒待つ
    function sleep(waitSec: number) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            }, waitSec)
        })
    }

    return (
        <Grid container justify="flex-end">
            <Button
                variant="contained"
                color="secondary"
                startIcon={
                    disabled ? <CheckCircleOutlineRounded /> : <Adjust />
                }
                disableElevation
                onClick={() => {
                    galapon(props.slotCount)
                    setDisabled(true)
                }}
                disabled={!props.galable || disabled}
            >
                {disabled ? '済' : 'ガラポン'}
            </Button>
        </Grid>
    )
}

Galapon.defaultProps = {
    galable: true,
}
