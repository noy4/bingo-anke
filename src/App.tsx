import React, { useEffect } from 'react'
import Menu from './components/Menu'
import DoneDialog from './components/DoneDialog'
import API, { graphqlOperation } from '@aws-amplify/api'
import { CreatePostInput } from './API'
import { listPostsSortedByScore } from './graphql/queries'
import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    CssBaseline,
    Fab,
    Drawer,
    LinearProgress,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Amplify from '@aws-amplify/core'
import PubSub from '@aws-amplify/pubsub'
import awsmobile from './aws-exports'
import { pink } from '@material-ui/core/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setRankers } from './features/user/userSlice'
import SlotModal from './components/SlotModal'
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
import NoticeSnackbar, { NOTICE } from './components/NoticeSnackbar'
import ExperimentSurvey from './components/ExperimentSurvey'
import EvaluationSurvey from './components/EvaluationSurvey'
import BonusSurvey from './components/BonusSurvey'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { GROUP } from './app/const'

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
        const path = location.pathname
        if ([GROUP.A2, GROUP.B2].includes(path)) {
            dispatch(setBingo(true))
        } else if (['/', GROUP.A3, GROUP.B3].includes(path)) {
            dispatch(setBingo(true))
            dispatch(setRanking(true))
        }

        getPosts()
        document.addEventListener('scroll', () =>
            dispatch(calculateScrollRate())
        )
    }, [])

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path="/" />
                <Route exact path={GROUP.A1} />
                <Route exact path={GROUP.A2} />
                <Route exact path={GROUP.A3} />
                <Route exact path={GROUP.B1} />
                <Route exact path={GROUP.B2} />
                <Route exact path={GROUP.B3} />
                <Redirect path="*" to="/" />
            </Switch>
            <CssBaseline />
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

                {ranking && (
                    <>
                        <NoticeSnackbar type={NOTICE.RANK} />
                        <NoticeSnackbar type={NOTICE.BINGO} />
                    </>
                )}
                <DoneDialog />
            </Container>
        </div>
    )
}

export default App
