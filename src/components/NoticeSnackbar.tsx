import { makeStyles, Snackbar } from '@material-ui/core'
import { Flare, TrendingUp } from '@material-ui/icons'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBingoCount, selectRankInfo } from '../features/user/userSlice'
import {
    selectBingoNotice,
    selectRankNotice,
    setBingoNotice,
    setRankNotice,
} from '../features/system/systemSlice'

const useStyles = makeStyles((theme) => ({
    snackBar: {
        width: '100%',
    },
}))

export const NOTICE = {
    RANK: 0,
    BINGO: 1,
}

interface NoticeProps {
    type: number
}

const NoticeSnackbar = (props: NoticeProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const rankNotice = useSelector(selectRankNotice) //ランク上昇通知フラグ
    const rankInfo = useSelector(selectRankInfo) //ランク状況（更新前：更新後）
    const bingoNotice = useSelector(selectBingoNotice) //ビンゴ通知フラグ
    const bingoCount = useSelector(selectBingoCount) //ビンゴ状況（更新前：更新後）（現在prev未使用）

    let open
    let onClose
    let icon
    let text
    switch (props.type) {
        case NOTICE.RANK:
            open = rankNotice
            onClose = () => dispatch(setRankNotice(false))
            icon = <TrendingUp />
            text = `${rankInfo.prev - rankInfo.current}人抜き
                （現在${rankInfo.current || '最下'}位）`
            break
        case NOTICE.BINGO:
            open = bingoNotice
            onClose = () => dispatch(setBingoNotice(false))
            icon = <Flare />
            text = `${bingoCount}ビンゴ`
            break

        default:
            break
    }

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={6000}
            onClose={onClose}
            open={open}
        >
            <Alert severity="info" icon={icon} className={classes.snackBar}>
                {text}
            </Alert>
        </Snackbar>
    )
}

export default NoticeSnackbar
