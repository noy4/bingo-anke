import React, { useState, useEffect } from 'react';
import Galapon from './Galapon';
import { createPost } from '../graphql/mutations';
import { onCreatePost } from '../graphql/subscriptions';
import { listPostsSortedByTimestamp } from '../graphql/queries';
import API, { graphqlOperation } from '@aws-amplify/api';
import { OnCreatePostSubscription } from '../API';
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
}));

interface IPost {
    type: string;
    id: string;
    content: string;
    owner: string | null;
    timestamp: number;
}

interface IValue {
    playerName: string;
    playerSex: string;
}

interface SubscriptionValue<T> {
    value: { data: T };
}

interface SurveyProps {
    galapon: () => void
}

const Survey = (props: SurveyProps) => {
    const classes = useStyles();
    const [value, setValue] = useState<IValue>({
        playerName: '',
        playerSex: '',
    });
    const [posts, setPosts] = useState<IPost[]>([]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target != null) {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            setValue(state => ({ ...state, [name]: value }));
        }
    }

    const onPost = async () => {
        const res = await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'post',
                content: value.playerName,
                timestamp: Date.now(),
            }
        }));
        console.log(res);
        setValue({ playerName: "", playerSex: "" });
    };

    const getPosts = async (nextToken = null) => {
        const res = await API.graphql(graphqlOperation(listPostsSortedByTimestamp, {
            type: "post",
            sortDirection: 'DESC',
            limit: 20, //default = 10
            nextToken: nextToken,
        }));
        setPosts(res.data.listPostsSortedByTimestamp.items);
    };

    // useEffect(() => {
    //     getPosts();
    //     console.log('before subscription');

    //     const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
    //         next: (msg: SubscriptionValue<OnCreatePostSubscription>) => {
    //             if (msg.value.data.onCreatePost) {
    //                 console.log('subscription fired');
    //                 const post = msg.value.data.onCreatePost;
    //                 setPosts(state => ([post, ...state]));
    //             }

    //         }
    //     });
    //     return () => subscription.unsubscribe();
    // }, []);

    const title = "タイプスクリプト版アンケート";

    return (
        <>
            <Paper className={classes.titlePaper}>
                <Typography variant="h4" className={classes.title}>
                    {title}
                </Typography>
            </Paper>
            {/* <form> */}
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        名前
                    </Typography>
                    <TextField
                        name="playerName"
                        onChange={handleInputChange}
                        value={value.playerName}
                        placeholder="回答"
                        margin="normal"
                        fullWidth
                    />
                    <Galapon galable={value.playerName.trim() !== ''} galapon={props.galapon} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        性別
                    </Typography>
                    <RadioGroup aria-label="gender" name="playerSex" value={value.playerSex} onChange={handleInputChange}>
                        <FormControlLabel value="male" control={<Radio />} label="男性" />
                        <FormControlLabel value="female" control={<Radio />} label="女性" />
                    </RadioGroup>
                    <Galapon
                        galapon={props.galapon}
                        galable={value.playerSex !== ''}
                    />
                </Paper>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={onPost} disabled>
                        送信
                    </Button>
                </Grid>
            {/* </form> */}
            {/* <div>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
                // console.log(post)
            ))}
        </div> */}
        </>
    );
};

export default Survey;