import React from 'react';
import Ranking from './Ranking';
import Bingo from './Bingo';
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid, Box
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    drawerGrid: {
        height: "100%",
    },

}));

interface MenuProps {
    bingoCard: (number | string)[];
}
const Menu: React.FC<MenuProps> = (props) => {
    const classes = useStyles();

    return (
        <Grid container wrap="nowrap" direction="column" alignItems="center" className={classes.drawerGrid}>
            <Ranking />
            <Box pb={4}>
                <Bingo bingoCard={props.bingoCard} />
            </Box>
        </Grid>
    );
};

export default Menu;