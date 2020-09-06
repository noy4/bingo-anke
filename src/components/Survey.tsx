import React, { useState, useEffect } from 'react';
import Galapon from './Galapon';
import { createPost } from '../graphql/mutations';
import { onCreatePost } from '../graphql/subscriptions';
import API, { graphqlOperation } from '@aws-amplify/api';
import { CreatePostInput, OnCreatePostSubscription } from '../API';//eslint-disable-line
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper, Typography, TextField, RadioGroup, Radio,
    FormControlLabel, Grid, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    titlePaper: {
        marginBottom: theme.spacing(2),
    },
    title: {
        padding: theme.spacing(5),
        fontWeight: "bold",
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(0, 2, 2),
    },
    nameField: {
        width: '45%',
        marginRight: '5%',
    }
}));

interface Ivalues {
    // playerFamilyName?: string;
    // playerSex: string;
    [key: string]: any;
}

interface SubscriptionValue<T> {
    value: { data: T };
}

interface SurveyProps {
    galapon: () => void,
    numberOfBingo: number,
    score: number,
}

const Survey = (props: SurveyProps) => {
    const classes = useStyles();
    const [values, setvalues] = useState<Ivalues>({
        // playerName: '',
        // playerSex: '',
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target != null) {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            setvalues(state => ({ ...state, [name]: value }));
        }
    }

    const onPost = async () => {
        const { playerFamilyName, playerRankingName, playerFrom, ...contents } = values;
        const res = await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'post',
                content: JSON.stringify(contents),
                displayName: playerRankingName || playerFamilyName,
                playerFrom: playerFrom || '',
                numberOfBingo: props.numberOfBingo,
                score: props.score,
                timestamp: Date.now(),
            }
        }));
        console.log(res);
    };

    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (msg: SubscriptionValue<OnCreatePostSubscription>) => {
                if (msg.value.data.onCreatePost) {
                    console.log('subscription fired');
                    setvalues({});
                }
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const title = "タイプスクリプト版アンケート";

    return (
        <>
            <Paper className={classes.titlePaper}>
                <Typography variant="h4" className={classes.title}>
                    {title}
                </Typography>
            </Paper>
            <form onSubmit={(e) => {e.preventDefault(); onPost();}}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        名前
                    </Typography>
                    <TextField
                        name="playerFamilyName"
                        required
                        helperText='必須*'
                        onChange={handleInputChange}
                        value={values.playerFamilyName || ''}
                        placeholder="姓"
                        margin="normal"
                        className={classes.nameField}
                    />
                    <TextField
                        name="playerFirstName"
                        onChange={handleInputChange}
                        value={values.playerFirstName || ''}
                        placeholder="名"
                        margin="normal"
                        className={classes.nameField}
                    />
                    <Galapon
                        galable={Boolean(values.playerFirstName?.trim() && values.playerFamilyName?.trim())}
                        galapon={props.galapon} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        ランキング表示名
                    </Typography>
                    <TextField
                        name="playerRankingName"
                        onChange={handleInputChange}
                        value={values.playerRankingName || ''}
                        placeholder={`未入力で${values.playerFamilyName?.trim() || '姓'}になります`}
                        margin="normal"
                        fullWidth
                    />
                    <Galapon
                        galable={Boolean(values.playerFamilyName?.trim())}
                        galapon={props.galapon} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        所属
                    </Typography>
                    <TextField
                        name="playerFrom"
                        onChange={handleInputChange}
                        value={values.playerFrom || ''}
                        placeholder="例）九州大学"
                        margin="normal"
                        fullWidth
                    />
                    <Galapon
                        galable={Boolean(values.playerFrom?.trim())}
                        galapon={props.galapon} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        性別
                    </Typography>
                    <RadioGroup
                        aria-label="gender"
                        name="playerSex"
                        value={values.playerSex || ''}
                        onChange={handleInputChange}>

                        <FormControlLabel value="male" control={<Radio />} label="男性" />
                        <FormControlLabel value="female" control={<Radio />} label="女性" />
                    </RadioGroup>
                    <Galapon
                        galapon={props.galapon}
                        galable={Boolean(values.playerSex)}
                    />
                </Paper>
                <Grid container justify="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                        送信
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default Survey;