import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Amplify from '@aws-amplify/core'
import PubSub from '@aws-amplify/pubsub'
import awsmobile from './aws-exports'
import API, { graphqlOperation } from '@aws-amplify/api'
import { CreatePostInput } from './API'
import { listPostsSortedByBingoCountAndScore } from './graphql/queries'

import { makeStyles } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'
import {
    Container,
    CssBaseline,
    Fab,
    Drawer,
    LinearProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Menu from './components/Menu'
import DoneDialog from './components/DoneDialog'
import SlotModal from './components/SlotModal'
import NoticeSnackbar from './components/NoticeSnackbar'
import ExperimentSurvey from './components/ExperimentSurvey'
import EvaluationSurvey from './components/EvaluationSurvey'
import BonusSurvey from './components/BonusSurvey'
import { GROUP, NOTICE } from './app/const'

import {
    selectDrawer,
    setDrawer,
    selectProgress,
    calculateScrollRate,
    setBingo,
    selectBingo,
    selectRanking,
    setRanking,
} from './features/system/systemSlice'
import { setRankers } from './features/user/userSlice'
import { setGroup } from './features/group/groupSlice'
import Analytics from './components/Analytics'
import Statistics from './components/Statistics'

// const awsmobile = {}
Amplify.configure(awsmobile)
PubSub.configure(awsmobile)

const useStyles = makeStyles((theme) => ({
    root: {
        background: pink[100],
    },
    container: {
        padding: theme.spacing(2, 2, 10),
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

    const bingo = useSelector(selectBingo)
    const ranking = useSelector(selectRanking)
    const progress = useSelector(selectProgress) //プログレスバー割合
    const drawer = useSelector(selectDrawer) //サイドメニューフラグ

    const dispatch = useDispatch()
    const location = useLocation()

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(
            graphqlOperation(listPostsSortedByBingoCountAndScore, {
                type: 'post',
                sortDirection: 'DESC',
                limit: 200,
                nextToken: nextToken,
            })
        )
        const newRankers =
            res.data.listPostsSortedByBingoCountAndScore.items.map(
                (post: CreatePostInput) => ({
                    rank: 0,
                    name: post.displayName,
                    from: post.from,
                    bingoCount: post.bingoCount,
                    score: post.score,
                })
            )
        newRankers.sort(
            (a: CreatePostInput, b: CreatePostInput) => b.score - a.score
        )
        newRankers.sort(
            (a: CreatePostInput, b: CreatePostInput) =>
                b.bingoCount - a.bingoCount
        )
        newRankers.push({
            iam: true,
            rank: 0,
            name: 'あなた',
            from: '',
            bingoCount: 0,
            score: 0,
        })
        dispatch(setRankers(newRankers))
    }

    const getRandomGroup = (type = '') => {
        const keys = Object.keys(GROUP)
        let length = keys.length
        let index
        switch (type) {
            case 'a':
                length = keys.length - 3
                index = Math.floor(Math.random() * length)
                break
            case 'b':
                length = keys.length - 3
                index = Math.floor(Math.random() * length) + 3
                break

            default:
                index = Math.floor(Math.random() * length)
                break
        }
        return GROUP[keys[index]]
    }
    const randomGroup = getRandomGroup()
    const randomA = getRandomGroup('a')
    const randomB = getRandomGroup('b')

    useEffect(() => {
        const path = location.pathname
        dispatch(setGroup(path))
        if ([GROUP.A2, GROUP.B2].includes(path)) {
            dispatch(setBingo(true))
        } else if ([GROUP.A3, GROUP.B3].includes(path)) {
            dispatch(setBingo(true))
            dispatch(setRanking(true))
        }

        getPosts()
        document.addEventListener('scroll', () =>
            dispatch(calculateScrollRate())
        )
    }, [dispatch, location.pathname, getPosts])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Switch>
                <Route exact path={GROUP.A1} />
                <Route exact path={GROUP.A2} />
                <Route exact path={GROUP.A3} />
                <Route exact path={GROUP.B1} />
                <Route exact path={GROUP.B2} />
                <Route exact path={GROUP.B3} />
                {/* <Route exact path="/analytics" component={Analytics} /> */}
                {/* <Route exact path="/statistics" component={Statistics} /> */}
                <Redirect exact path="/a" to={randomA} />
                <Redirect exact path="/b" to={randomB} />
                {/* <Redirect exact path="/" to={randomGroup} /> */}
                <Redirect exact path="/" to="/a-3" />
                <Redirect path="*" to="/" />
            </Switch>
            <Container className={classes.container} maxWidth="xs">
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    className={classes.progressBar}
                />
                {bingo && (
                    <>
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
                    </>
                )}

                <ExperimentSurvey />
                <EvaluationSurvey />
                <BonusSurvey />
                <SlotModal />

                <NoticeSnackbar type={NOTICE.BINGO} />
                {ranking && <NoticeSnackbar type={NOTICE.RANK} />}
                <DoneDialog />
            </Container>
        </div>
    )
}

export default App
