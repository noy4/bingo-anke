import React, { useState } from 'react';
import Galapon, { GalaponProps } from './Galapon';
import { createPost } from '../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';
import { CreatePostInput, OnCreatePostSubscription } from '../API';//eslint-disable-line
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper, Typography, TextField, RadioGroup, Radio,
    FormControlLabel, Grid, Button, FormGroup, Checkbox,
    CircularProgress,
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
        margin: theme.spacing(0, 1, 2),
    },
    nameField: {
        width: '45%',
        marginRight: '5%',
    },
    rowRadio: {
        margin: '0',
    },
    buttonWrapper: {
        position: 'relative',
    },
    bottunProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

interface Ivalues {
    [key: string]: any;
}

interface SubscriptionValue<T> {
    value: { data: T };
}

interface SurveyProps extends GalaponProps {
    numberOfBingo: number,
    score: number,
    openDialog: () => void,
}

const Survey = (props: SurveyProps) => {
    const classes = useStyles();
    const [values, setValues] = useState<Ivalues>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        if (target != null) {
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            console.log(name);
            setValues(state => ({ ...state, [name]: value }));
        }
    }

    const onPost = async () => {
        setLoading(true);
        const { displayName, from, ...contents } = values;
        const res = await API.graphql(graphqlOperation(createPost, {
            input: {
                type: 'post',
                contents: JSON.stringify(contents),
                displayName: displayName || values.familyName,
                from: from || '',
                numberOfBingo: props.numberOfBingo,
                score: props.score,
                timestamp: Date.now(),
            }
        }));
        if (res.data.createPost) {
            console.log(res);
            setLoading(false);
            setSuccess(true);
            props.openDialog();
        }
    };

    const title = "あなたについてのアンケート";

    return (
        <>
            <Paper className={classes.titlePaper}>
                <Typography variant="h4" className={classes.title}>
                    {title}
                </Typography>
            </Paper>
            <form onSubmit={(e) => { e.preventDefault(); onPost(); }}>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        名前
                    </Typography>
                    <TextField
                        name="familyName"
                        required
                        helperText='必須*'
                        onChange={handleInputChange}
                        value={values.familyName || ''}
                        placeholder="姓"
                        margin="normal"
                        className={classes.nameField}
                    />
                    <TextField
                        name="firstName"
                        onChange={handleInputChange}
                        value={values.firstName || ''}
                        placeholder="名"
                        margin="normal"
                        className={classes.nameField}
                    />
                    <Galapon
                        galable={Boolean(values.firstName?.trim() && values.familyName?.trim())}
                        galapon={() => props.galapon(1)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        ランキング表示名
                    </Typography>
                    <TextField
                        name="displayName"
                        onChange={handleInputChange}
                        value={values.displayName || ''}
                        placeholder={`未入力で${values.familyName?.trim() || '姓'}になります`}
                        margin="normal"
                        fullWidth
                    />
                    <Galapon
                        galable={Boolean(values.familyName?.trim() || values.displayName?.trim())}
                        galapon={() => props.galapon(2)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        所属
                    </Typography>
                    <TextField
                        name="from"
                        onChange={handleInputChange}
                        value={values.from || ''}
                        placeholder="例）九州大学"
                        helperText='ランキングに載ります*'
                        margin="normal"
                        fullWidth
                    />
                    <Galapon
                        galable={Boolean(values.from?.trim())}
                        galapon={() => props.galapon(3)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="h6">
                        性別
                    </Typography>
                    <RadioGroup
                        aria-label="gender"
                        name="sex"
                        value={values.sex || ''}
                        onChange={handleInputChange}>

                        <FormControlLabel value="male" control={<Radio />} label="男性" />
                        <FormControlLabel value="female" control={<Radio />} label="女性" />
                    </RadioGroup>
                    <Galapon
                        galapon={() => props.galapon(4)}
                        galable={Boolean(values.sex)}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        悲しいですか。
                    </Typography>
                    <Grid container justify='space-between'>
                        <Typography variant='subtitle2'>そう思わない</Typography>
                        <Typography variant='subtitle2'>そう思う</Typography>
                    </Grid>
                    <Grid container justify='center'>
                        <RadioGroup
                            row
                            aria-label="fivePoint"
                            name="fivePoint"
                            value={values.fivePoint || ''}
                            onChange={handleInputChange}>

                            <FormControlLabel value="one" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="1" />
                            <FormControlLabel value="two" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="2" />
                            <FormControlLabel value="three" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="3" />
                            <FormControlLabel value="four" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="4" />
                            <FormControlLabel value="five" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="5" />
                        </RadioGroup>
                    </Grid>
                    <Galapon
                        galapon={() => props.galapon(5)}
                        galable={Boolean(values.fivePoint)}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        なんでそんなに悲しいですか。
                    </Typography>
                    <TextField
                        name="textarea"
                        onChange={handleInputChange}
                        value={values.textarea || ''}
                        placeholder="回答"
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <Galapon
                        galable={Boolean(values.textarea?.trim())}
                        galapon={() => props.galapon(6)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        1人で悩んでいませんか。
                    </Typography>
                    <Grid container justify='space-between'>
                        <Typography variant='subtitle2'>悩んでいない</Typography>
                        <Typography variant='subtitle2'>悩んでいる</Typography>
                    </Grid>
                    <Grid container justify='center'>
                        <RadioGroup
                            row
                            aria-label="q1"
                            name="q1"
                            value={values.q1 || ''}
                            onChange={handleInputChange}>

                            <FormControlLabel value="one" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="1" />
                            <FormControlLabel value="two" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="2" />
                            <FormControlLabel value="three" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="3" />
                            <FormControlLabel value="four" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="4" />
                            <FormControlLabel value="five" labelPlacement='top' control={<Radio />} className={classes.rowRadio} label="5" />
                        </RadioGroup>
                    </Grid>
                    <Galapon
                        galapon={() => props.galapon(7)}
                        galable={Boolean(values.q1)}
                    />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        悩みは解決しそうですか。
                    </Typography>
                    <TextField
                        name="q2"
                        onChange={handleInputChange}
                        value={values.q2 || ''}
                        placeholder="回答"
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <Galapon
                        galable={Boolean(values.q2?.trim())}
                        galapon={() => props.galapon(8)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        頑張ってください。
                    </Typography>
                    <TextField
                        name="q3"
                        onChange={handleInputChange}
                        value={values.q3 || ''}
                        placeholder="回答"
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <Galapon
                        galable={Boolean(values.q3?.trim())}
                        galapon={() => props.galapon(9)} />
                </Paper>
                <Paper className={classes.paper}>
                    <Typography variant="subtitle1">
                        次のうちどのSNSを使いますか。
                    </Typography>
                    <FormGroup
                        aria-label="checkbox"
                        onChange={handleInputChange}>

                        <FormControlLabel control={<Checkbox name='line' checked={values.line || false} />} label="LINE" />
                        <FormControlLabel control={<Checkbox name='facebook' checked={values.facebook || false} />} label="Facebook" />
                        <FormControlLabel control={<Checkbox name='instagram' checked={values.instagram || false} />} label="Instagram" />
                        <FormControlLabel control={<Checkbox name='tiktok' checked={values.tiktok || false} />} label="TikTok" />
                        <FormControlLabel control={<Checkbox name='twitter' checked={values.twitter || false} />} label="Twitter" />
                    </FormGroup>
                    <Galapon
                        galapon={() => props.galapon(15)}
                    />
                </Paper>

                <Grid container justify="flex-end">
                    <div className={classes.buttonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || success}
                            >
                            送信
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.bottunProgress} />}
                    </div>
                </Grid>
            </form>
        </>
    );
};

export default Survey;