import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Typography, List, ListItem, ListItemAvatar,
    Avatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    rankingTitle: {
        paddingTop: theme.spacing(4),
        textAlign: "center",
    },
    ranking: {
        overflow: "auto",
        flexGrow: 1,
        marginBottom: theme.spacing(2),
    },

}));

const Ranking = () => {
    const classes = useStyles();
    const rankers = [
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
    ];

    return (
        <>
            <Typography variant="h6" className={classes.rankingTitle}>ランキング</Typography>
            <List className={classes.ranking}>
                {rankers.map((ranker, index) => (
                    <ListItem key={index}>
                        <Grid container justify="center">
                            <ListItemAvatar>
                                <Avatar>{ranker.rank}</Avatar>
                            </ListItemAvatar>
                            <Grid item xs={8}>
                                <Typography noWrap>{ranker.name}({ranker.from})</Typography>
                                <Grid container justify="space-between">
                                    <Typography>{ranker.bingoNumber}BINGO</Typography>
                                    <Typography>{ranker.score}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default Ranking;
