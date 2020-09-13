import React, { useState, useEffect } from 'react';
import Survey from './components/Survey';
import Menu from './components/Menu';
import { Ranker } from './components/Ranking';//eslint-disable-line 
import Bingo from './components/Bingo';
import Slots from './components/Slots';
import API, { graphqlOperation } from '@aws-amplify/api';
import { CreatePostInput, OnCreatePostSubscription } from './API';//eslint-disable-line
import { listPostsSortedByScore } from './graphql/queries';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, CssBaseline, Fab, Drawer,
    Box, Modal, LinearProgress,
    Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, Button, Snackbar,
} from '@material-ui/core';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import TrendingUp from '@material-ui/icons/TrendingUp';
import Flare from '@material-ui/icons/Flare';

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import awsmobile from './aws-exports';
import { pink } from '@material-ui/core/colors';

Amplify.configure(awsmobile);
PubSub.configure(awsmobile);

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
        position: "fixed",
        bottom: 4,
        zIndex: 10,
    },
    snackBar: {
        width: '100%',
    },
}));

interface SubscriptionValue<T> {
    value: { data: T };
}

const App = () => {
    const classes = useStyles();

    const [progress, setProgress] = useState(0);    //プログレスバー割合
    const [drawer, setDrawer] = useState(false);    //サイドメニューフラグ
    const [modal, setModal] = useState(false);      //モーダルフラグ
    const [dialog, setDialog] = useState(false);    //送信完了ダイアログフラグ
    const [rankNotice, setRankNotice] = useState(true);     //ランク上昇通知フラグ
    const [bingoNotice, setBingoNotice] = useState(false);  //ビンゴ通知フラグ
    
    const [balls, setBalls] = useState(Array(75).fill(0).map((_, i) => i + 1)); //ガラポン内の玉[]
    const [bingoCard, setBingoCard] = useState(makeBingoCard());                //ビンゴカード[]
    const [bingoInfo, setBingoInfo] = useState({'prev': 0, 'current': 0});      //ビンゴ状況（更新前：更新後）（現在prev未使用）
    const [score, setScore] = useState(0);                                      //スコア

    const [numberOfSlot, setNumberOfSlot] = useState(1);                    //スロットの数
    const [slotValues, setSlotValues] = useState(Array(15).fill(75));       //スロットに表示する番号[]
    const [rankInfo, setRankInfo] = useState({'prev': 0, 'current': 0});    //ランク状況（更新前：更新後）
    
    //ランキング表示するプレイヤーたち
    const [rankers, setRankers] = useState<Ranker[]>([
        { rank: 1, name: '二宮', from: '愛媛大学', numberOfBingo: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', numberOfBingo: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', numberOfBingo: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', numberOfBingo: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', numberOfBingo: 5, score: 92 },
        { rank: 1, name: '二宮', from: '愛媛大学', numberOfBingo: 12, score: 488 },
        { rank: 2, name: '櫻井しょー', from: '長崎美容専門学校', numberOfBingo: 7, score: 302 },
        { rank: 2, name: '相葉', from: '九州大学', numberOfBingo: 7, score: 302 },
        { rank: 3, name: 'MJ', from: '大衆食堂しゃーき', numberOfBingo: 6, score: 127 },
        { rank: 4, name: '大野', from: '早稲田大学', numberOfBingo: 5, score: 92 },
    ]);

    //ビンゴカードを作る
    function makeBingoCard() {
        const col_1 = makeColumn(1);
        const col_2 = makeColumn(16);
        const col_3 = makeColumn(31);
        const col_4 = makeColumn(46);
        const col_5 = makeColumn(61);
        const list = [...col_1, ...col_2, ...col_3, ...col_4, ...col_5];
        list[12] = {
            'value': 0,
            'isValid': true,
        };
        return list;
    }
    //ビンゴカードの1列を作る
    function makeColumn(base: number) {
        const array = Array(15).fill(0).map((_, i) => i + base);
        const list = [];
        for (let i: number = 1; i <= 5; i++) {
            const a: number = ~~(Math.random() * array.length);
            list.push({ 'value': array[a], 'isValid': false });
            array.splice(a, 1);
        }
        return list;
    }

    //スロットに番号をセットする
    function slot(slotIndexes: number[]) {
        const a = ~~(Math.random() * balls.length);
        const updatedSlotValues: number[] = [];
        slotIndexes.forEach(slotIndex => {
            updatedSlotValues[slotIndex] = balls[a];
        });
        setSlotValues(state => ({...state, ...updatedSlotValues}));
    }

    //ガラポンを回す
    async function galapon(numberOfSlot: number = 1) {
        setNumberOfSlot(numberOfSlot);
        setModal(true);
        const updatedBalls = balls.slice();
        const slotIndexes = Array(numberOfSlot).fill(0).map((_, i) => i);
        const drawnBalls: number[] = [];

        const interval = setInterval(() => slot(slotIndexes), 50);

        for (let i = 0; i < numberOfSlot; i++) {
            await sleep(200);
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
                await sleep(200);
                square.isValid = true;
                const updatedBingoCard = bingoCard.slice();
                setBingoCard(updatedBingoCard);
                updatedScore += drawnBalls[i];
            }
        }

        const updatedNumberOfBingo = checkBingo();
        
        setBalls(updatedBalls);
        if (bingoInfo.current !== updatedNumberOfBingo) {
            setBingoNotice(true);
        }
        setBingoInfo(state => ({
            prev: state.current,
            current: updatedNumberOfBingo
        }));
        setScore(updatedScore);
        handleRankers(updatedNumberOfBingo, updatedScore);
    }

    //引数秒待つ
    function sleep(waitSec: number) {
        return new Promise(function (resolve) {
            setTimeout(function () { resolve(); }, waitSec);
        });
    }

    //回答者の順位を計算する
    function handleRankers(numberOfBingo: number, score: number) {
        const newRankers = rankers.slice();
        const prevIndex = newRankers.findIndex(ranker => ranker.iam);
        const newRanker = newRankers[prevIndex];
        if (newRanker !== undefined) {
            newRanker.numberOfBingo = numberOfBingo;
            newRanker.score = score;
        }

        newRankers.sort((a, b) => b.score - a.score);
        newRankers.sort((a, b) => b.numberOfBingo - a.numberOfBingo);
        setRankers(newRankers);

        const currentIndex = newRankers.findIndex(ranker => ranker.iam);
        setRankInfo({'prev': prevIndex + 1, 'current': currentIndex + 1});
    }
    
    //ビンゴの数をチェックする
    function checkBingo() {
        let counter = 0;
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
            [4, 8, 12, 16, 20]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d, e] = lines[i];
            if (bingoCard[a].isValid
                && bingoCard[b].isValid
                && bingoCard[c].isValid
                && bingoCard[d].isValid
                && bingoCard[e].isValid)
            {
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

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByScore, {
            type: "post",
            sortDirection: 'DESC',
            limit: 200,
            nextToken: nextToken,
        }));
        const newRankers = res.data.listPostsSortedByScore.items.map((post: CreatePostInput) => (
            {
                rank: 0,
                name: post.displayName,
                from: post.from,
                numberOfBingo: post.numberOfBingo,
                score: post.score
            }
        ));
        newRankers.push({
            iam: true,
            rank: 0,
            name: 'あなた',
            from: '',
            numberOfBingo: 0,
            score: 0
        });
        setRankers(newRankers);
    };

    useEffect(() => {
        getPosts();
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

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    };

    function handleOpenDialog() {
        setDialog(true);
    }

    function handleCloseModal() {
        setModal(false);
        if (rankInfo.prev !== rankInfo.current) {
            setRankNotice(true);
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
                    horizontal: 'right'
                }}
                autoHideDuration={6000}
                onClose={() => setRankNotice(false)}
                open={rankNotice}
            >
                <Alert severity='info' icon={<TrendingUp />}
                    className={classes.snackBar}>
                    {rankInfo.prev - rankInfo.current}人抜き（現在{rankInfo.current || '最下'}位）
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                // autoHideDuration={3000}
                onClose={() => setBingoNotice(false)}
                open={bingoNotice}
            >
                <Alert severity='info' icon={<Flare />}
                    className={classes.snackBar}>
                    {bingoInfo.current}ビンゴ
                </Alert>
            </Snackbar>

            <Survey
                galapon={galapon}
                numberOfBingo={bingoInfo.current}
                score={score}
                openDialog={handleOpenDialog}
            />

            <Modal
                open={modal}
                disableAutoFocus
                disableEnforceFocus
                onClose={handleCloseModal}
            >
                <Box width={272} mx='auto'>
                    <Slots numberOfSlot={numberOfSlot} slotValues={slotValues} />
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
