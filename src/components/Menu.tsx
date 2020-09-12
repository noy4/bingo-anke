import React from 'react';
import Ranking, {RankingProps} from './Ranking';
import Bingo, {BingoProps} from './Bingo';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Box
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    drawerGrid: {
        height: "100%",
    },
}));

interface MenuProps extends RankingProps, BingoProps {}

const Menu: React.FC<MenuProps> = (props) => {
    const classes = useStyles();

    return (
        <Grid
            container
            wrap="nowrap"
            direction="column"
            alignItems="center"
            className={classes.drawerGrid}
        >
            <Ranking rankers={props.rankers} />
            <Box p={2}>
                <Bingo bingoCard={props.bingoCard} />
            </Box>
        </Grid>
    );
};

export default Menu;