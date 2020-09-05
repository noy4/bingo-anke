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

interface Ranker {
    rank: number,
    name: string,
    from: string,
    bingoNumber: number,
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
                    <ListItem key={index}>
                        <Grid container justify="center">
                            <ListItemAvatar>
                                <Avatar>{index + 1}</Avatar>
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
