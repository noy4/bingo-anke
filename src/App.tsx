import React, { useEffect } from 'react'
import Survey from './components/Survey'
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
} from './features/system/systemSlice'
import NoticeSnackbar, { NOTICE } from './components/NoticeSnackbar'

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

    const progress = useSelector(selectProgress) //プログレスバー割合
    const drawer = useSelector(selectDrawer) //サイドメニューフラグ

    const dispatch = useDispatch()

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
        document.addEventListener('scroll', () =>
            dispatch(calculateScrollRate())
        )
    }, [])

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

            <Survey />
            <SlotModal />

            <NoticeSnackbar type={NOTICE.RANK} />
            <NoticeSnackbar type={NOTICE.BINGO} />
            <DoneDialog />
        </Container>
    )
}

export default App
