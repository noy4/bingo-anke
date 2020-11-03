import React, { useState, useEffect } from 'react'
import Survey from './components/Survey'
import Menu from './components/Menu'
import DoneDialog from './components/DoneDialog'
import API, { graphqlOperation } from '@aws-amplify/api'
import { CreatePostInput, OnCreatePostSubscription } from './API' //eslint-disable-line
import { listPostsSortedByScore } from './graphql/queries'
import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    CssBaseline,
    Fab,
    Drawer,
    LinearProgress,
    Snackbar,
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import MenuIcon from '@material-ui/icons/Menu'
import TrendingUp from '@material-ui/icons/TrendingUp'
import Flare from '@material-ui/icons/Flare'

import Amplify from '@aws-amplify/core'
import PubSub from '@aws-amplify/pubsub'
import awsmobile from './aws-exports'
import { pink } from '@material-ui/core/colors'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectBingoCount,
    selectBingoNotice,
    selectDrawer,
    selectRankInfo,
    selectRankNotice,
    setBingoNotice,
    setDrawer,
    setRankers,
    setRankNotice,
} from './features/counter/counterSlice'
import SlotModal from './components/SlotModal'

Amplify.configure(awsmobile)
PubSub.configure(awsmobile)

const useStyles = makeStyles((theme) => ({
    root: {
        background: pink[100],
        padding: theme.spacing(2, 2, 20),
    },
    progressBar: {
        position: 'fixed',
        width: '100vw',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    fab: {
        position: 'fixed',
        bottom: 4,
        zIndex: 10,
    },
    snackBar: {
        width: '100%',
    },
}))

const App = () => {
    const classes = useStyles()

    const [progress, setProgress] = useState(0) //プログレスバー割合
    const drawer = useSelector(selectDrawer) //サイドメニューフラグ
    const rankNotice = useSelector(selectRankNotice) //ランク上昇通知フラグ
    const bingoNotice = useSelector(selectBingoNotice) //ビンゴ通知フラグ
    const bingoCount = useSelector(selectBingoCount) //ビンゴ状況（更新前：更新後）（現在prev未使用）
    const rankInfo = useSelector(selectRankInfo) //ランク状況（更新前：更新後）

    const dispatch = useDispatch()

    function calculateScrollRate() {
        const innerHeight = window.innerHeight
        const element = document.getElementById('root') || new HTMLHtmlElement()
        const rect = element?.getBoundingClientRect()
        const elementHeight = rect?.height
        const scrollMax = elementHeight - innerHeight
        const scrollY = window.pageYOffset
        const scrollRate = ~~((scrollY / scrollMax) * 100)
        setProgress(scrollRate)
    }

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(
            graphqlOperation(listPostsSortedByScore, {
                type: 'post',
                sortDirection: 'DESC',
                limit: 200,
                nextToken: nextToken,
            })
        )
        const newRankers = res.data.listPostsSortedByScore.items.map(
            (post: CreatePostInput) => ({
                rank: 0,
                name: post.displayName,
                from: post.from,
                numberOfBingo: post.numberOfBingo,
                score: post.score,
            })
        )
        newRankers.push({
            iam: true,
            rank: 0,
            name: 'あなた',
            from: '',
            numberOfBingo: 0,
            score: 0,
        })
        dispatch(setRankers(newRankers))
    }

    useEffect(() => {
        getPosts()
        document.addEventListener('scroll', calculateScrollRate)
    }, [])

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <CssBaseline />
            <LinearProgress
                variant="determinate"
                value={progress}
                className={classes.progressBar}
            />
            <Fab
                className={classes.fab}
                onClick={() => dispatch(setDrawer(true))}
            >
                <MenuIcon />
            </Fab>

            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => dispatch(setDrawer(false))}
            >
                <Menu />
            </Drawer>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                autoHideDuration={6000}
                onClose={() => dispatch(setRankNotice(false))}
                open={rankNotice}
            >
                <Alert
                    severity="info"
                    icon={<TrendingUp />}
                    className={classes.snackBar}
                >
                    {rankInfo.prev - rankInfo.current}人抜き（現在
                    {rankInfo.current || '最下'}位）
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                // autoHideDuration={3000}
                onClose={() => dispatch(setBingoNotice(false))}
                open={bingoNotice}
            >
                <Alert
                    severity="info"
                    icon={<Flare />}
                    className={classes.snackBar}
                >
                    {bingoCount}ビンゴ
                </Alert>
            </Snackbar>

            <Survey />

            <SlotModal />

            <DoneDialog />
        </Container>
    )
}

export default App
