import React, { useState, useEffect } from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import { Ranker } from './components/Ranking';//eslint-disable-line 
import Bingo from './components/Bingo';
import API, { graphqlOperation } from '@aws-amplify/api';
import { CreatePostInput, OnCreatePostSubscription } from './API';//eslint-disable-line
import { listPostsSortedByScore } from './graphql/queries';
import { onCreatePost } from './graphql/subscriptions';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, CssBaseline, Fab, Drawer,
    Grid, Avatar, Box, Modal, LinearProgress,
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button, Snackbar,
} from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import TrendingUp from '@material-ui/icons/TrendingUp';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import awsmobile from './aws-exports';
import { pink } from '@material-ui/core/colors';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile);

const useStyles = makeStyles((theme) => ({
    root: {
        background: pink[100],
        padding: theme.spacing(2),
    },
    progressBar: {
        position: 'fixed',
        width: '100vw',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    fab: {
        position: "fixed",
        bottom: 4,
        zIndex: 10,
    },
    snackBar: {
        width: '100%',
    },
    slots: {
        height: '20vh',
        margin: '10vh 0 5vh',
    },
    slot1: {
        padding: theme.spacing(8),
        fontSize: '4em',
    },
    slot2: {
        padding: theme.spacing(6),
        margin: theme.spacing(1),
        fontSize: '3em',
    },
    slot3: {
        padding: theme.spacing(4.5),
        margin: theme.spacing(1),
        fontSize: '2em',
    },

}));

interface SubscriptionValue<T> {
    value: { data: T };
}

const App = () => {
    const classes = useStyles();

    const [progress, setProgress] = useState(0);
    const [drawer, setDrawer] = useState(true);
    const [modal, setModal] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [snackBar, setSnackBar] = useState(true);
    

    const [balls, setBalls] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [bingoCard, setBingoCard] = useState(makeBingoCard());
    const [numberOfBingo, setNumberOfBingo] = useState(0);
    const [score, setScore] = useState(0);

    const [slotValues, setSlotValues] = useState(Array(9).fill(0).map((_, i) => i + 1));
    const [numberOfSlot, setNumberOfSlot] = useState(1);
    const [rankInfo, setRankInfo] = useState({'prev': 0, 'current': 0});
    

    const [rankers, setRankers] = useState<Ranker[]>([
        { rank: 1, name: '二宮', from: '愛媛大学', bingoNumber: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', bingoNumber: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', bingoNumber: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', bingoNumber: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', bingoNumber: 5, score: 92 },
        { rank: 1, name: '二宮', from: '愛媛大学', bingoNumber: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', bingoNumber: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', bingoNumber: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', bingoNumber: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', bingoNumber: 5, score: 92 },
    ]);


    function makeBingoCard() {
        const col_1 = makeColumn(1);
        const col_2 = makeColumn(4);
        const col_3 = makeColumn(7);
        const list = [...col_1, ...col_2, ...col_3];
        list[4] = {
            'value': 0,
            'isValid': true,
        };
        // console.log(list);
        return list;
    }
    function makeColumn(base: number) {
        const array = Array(3).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 3; i++) {
            const a: number = ~~(Math.random() * array.length);
            list.push({ 'value': array[a], 'isValid': false });
            array.splice(a, 1);
        }
        return list;
    }

    function slot(slotIndexes: number[]) {
        const a = ~~(Math.random() * balls.length);
        const updatedSlotValues: number[] = [];
        slotIndexes.forEach(slotIndex => {
            updatedSlotValues[slotIndex] = balls[a];
        });
        setSlotValues(state => ({...state, ...updatedSlotValues}));
    }

    async function galapon(numberOfSlot: number = 1) {
        setNumberOfSlot(numberOfSlot);
        setModal(true);
        // const updatedBingoCard = bingoCard.slice();
        const updatedBalls = balls.slice();
        const slotIndexes = Array(numberOfSlot).fill(0).map((_, i) => i);
        const drawnBalls: number[] = [];

        const interval = setInterval(() => slot(slotIndexes), 50);

        for (let i = 0; i < numberOfSlot; i++) {
            await sleep(500);
            const a = ~~(Math.random() * updatedBalls.length);
            const ball = updatedBalls[a];
            slotIndexes.splice(0, 1);
            updatedBalls.splice(a, 1);
            drawnBalls.push(ball);
            setSlotValues(state => ({...state, [i]: ball}));
        }
        clearInterval(interval);

        await sleep(500);
        let updatedScore = score;
        for (let i = 0; i < numberOfSlot; i++) {
            const square = bingoCard.find(square => square.value === drawnBalls[i]);
            if (square !== undefined) {
                await sleep(500);
                square.isValid = true;
                const updatedBingoCard = bingoCard.slice();
                setBingoCard(updatedBingoCard);
                updatedScore += drawnBalls[i];
            }
        }

        const updatedNumberOfBingo = checkBingo();
        
        setBalls(updatedBalls);
        setNumberOfBingo(updatedNumberOfBingo);
        setScore(updatedScore);
        handleRankers(updatedNumberOfBingo, updatedScore);
    }

    function sleep(waitSec: number) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(); }, waitSec);
        });
    }

    function handleRankers(numberOfBingo: number, score: number) {
        const newRankers = rankers.slice();
        const prevIndex = newRankers.findIndex(ranker => ranker.iam);
        const newRanker = newRankers[prevIndex];
        if (newRanker !== undefined) {
            newRanker.bingoNumber = numberOfBingo;
            newRanker.score = score;
        }

        newRankers.sort((a, b) => b.score - a.score);
        newRankers.sort((a, b) => b.bingoNumber - a.bingoNumber);
        setRankers(newRankers);

        const currentIndex = newRankers.findIndex(ranker => ranker.iam);
        if (prevIndex !== currentIndex){
            setRankInfo({'prev': prevIndex + 1, 'current': currentIndex + 1});
        }
    }

    function checkBingo() {
        let counter = 0;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (bingoCard[a].isValid && bingoCard[b].isValid && bingoCard[c].isValid) {
                counter++;
            }
        }
        return counter;
    }

    function calculateScrollRate() {
        const innerHeight = window.innerHeight;
        const element = document.getElementById('root') || new HTMLHtmlElement();
        const rect = element?.getBoundingClientRect();
        const elementHeight = rect?.height;
        const scrollMax = elementHeight - innerHeight;
        const scrollY = window.pageYOffset;
        const scrollRate = ~~(scrollY / scrollMax * 100);
        setProgress(scrollRate);
    }

    const getPosts = async (init = false, nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByScore, {
            type: "post",
            sortDirection: 'DESC',
            limit: 100,
            nextToken: nextToken,
        }));
        const newRankers = res.data.listPostsSortedByScore.items.map((post: CreatePostInput) => (
            {
                rank: 0,
                name: post.displayName,
                from: post.playerFrom,
                bingoNumber: post.numberOfBingo,
                score: post.score
            }
        ));
        if (init) {
            newRankers.push({
                iam: true,
                rank: 0,
                name: 'あなた',
                from: '',
                bingoNumber: 0,
                score: 0
            });
        }
        // setRankers(state => ([...newRankers, ...state]));
        setRankers(newRankers);
    };

    useEffect(() => {
        getPosts(true);
        document.addEventListener('scroll', calculateScrollRate);
        
        // const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
        //     next: (msg: SubscriptionValue<OnCreatePostSubscription>) => {
        //         if (msg.value.data.onCreatePost) {
        //             getPosts();
        //             console.log('subscription fired');
        //         }
        //     }
        // });
        // return () => subscription.unsubscribe();
    }, []);

    const Slots = () => {
        const slots = [];
        for (let i = 0; i < numberOfSlot; i++) {
            slots.push(
                <Avatar className={eval('classes.slot' + numberOfSlot)} key={i}>
                    <Box component="h1">{slotValues[i]}</Box>
                </Avatar>
            );
        }

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                className={classes.slots}>
                    
                {slots}
            </Grid>
        );
    };

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    };

    function handleOpenDialog() {
        setDialog(true);
    }

    function handleCloseModal() {
        setModal(false);
        if (rankInfo.prev !== rankInfo.current) {
            setSnackBar(true);
        }
    }

    return (
        <Container className={classes.root} maxWidth="xs">
            <CssBaseline />
            <LinearProgress variant='determinate' value={progress} className={classes.progressBar} />
            <Fab
                className={classes.fab}
                onClick={() => setDrawer(true)}
            >
                <MenuIcon />
            </Fab>

            <Drawer
                anchor="left"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                <Menu rankers={rankers} bingoCard={bingoCard} />
            </Drawer>

            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                // autoHideDuration={3000}
                onClose={() => setSnackBar(false)}
                open={snackBar}
                // message={
                //     `${rankInfo.prev - rankInfo.current}人抜き（現在${rankInfo.current}位）`
                // }
            >
                <Alert severity='info' icon={<TrendingUp />}
                    className={classes.snackBar}>
                    {rankInfo.prev - rankInfo.current}人抜き（現在{rankInfo.current}位）
                </Alert>
            </Snackbar>

            <Survey
                galapon={galapon}
                numberOfBingo={numberOfBingo}
                score={score}
                openDialog={handleOpenDialog}
            />
            <ul>
                <li>numberOfBingo: {numberOfBingo}</li>
                <li>score: {score}</li>
            </ul>

            <Modal
                open={modal}
                disableAutoFocus
                disableEnforceFocus
                onClose={handleCloseModal}
            >
                <Box width={280} mx='auto'>
                    <Slots />
                    <Bingo bingoCard={bingoCard} />
                </Box>
            </Modal>

            <Dialog
                open={dialog}
                aria-labelledby='submit-dialog-title'
                aria-describedby='submit-dialog-description'
                onClose={() => setDialog(false)}
                >
                <DialogTitle id='submit-dialog-title'>回答を送信しました。</DialogTitle>
                <DialogContent>
                    <DialogContentText id='submit-dialog-description'>
                        ご協力ありがとうございます。( ᐛ)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setDialog(false);
                            setDrawer(true);}} 
                        color='primary'>
                        ランキングを見る
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default App;
