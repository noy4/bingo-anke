import React from 'react';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Typography, List, ListItem, ListItemAvatar,
    Avatar,
    Paper,
} from "@material-ui/core";
import { blue, pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    rankingTitle: {
        paddingTop: theme.spacing(4),
        textAlign: "center",
    },
    ranking: {
        width: '95%',
        overflow: "auto",
        flexGrow: 1,
    },
    paper: {
        margin: '10px',
        padding: '2px 0',
        borderRadius: '50px',
    },
    paperIam: {
        backgroundColor: pink[100],
    },
    avater: {
        marginTop: '7px',
        backgroundColor: blue[300],
    },
    rankerName: {
        width: '100%',
        margin: '3px 0'
    },
    numberOfBingo: {
        paddingLeft: '10px',
    }
}));

export interface Ranker {
    iam?: boolean,
    rank: number,
    name: string,
    from: string,
    numberOfBingo: number,
    score: number,
}

export interface RankingProps {
    rankers: Ranker[]
}

const Ranking: React.FC<RankingProps> = (props) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="h6" className={classes.rankingTitle}>ランキング</Typography>
            <List className={classes.ranking}>
                {props.rankers.map((ranker, index) => (
                    <Paper
                        elevation={4}
                        key={index}
                        className={clsx(classes.paper, ranker.iam && classes.paperIam)}>

                        <Grid container justify="center">
                            <ListItemAvatar>
                                <Avatar className={classes.avater}>{index + 1}</Avatar>
                            </ListItemAvatar>
                            <Grid item xs={8}>
                                <Typography noWrap className={classes.rankerName}>
                                    {ranker.name}({ranker.from})
                                </Typography>
                                <Grid container justify="space-between">
                                    <Typography className={classes.numberOfBingo}>
                                        {ranker.numberOfBingo}{" BINGO"}
                                    </Typography>
                                    <Typography>{ranker.score}点</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </List>
        </>
    );
};

export default Ranking;
