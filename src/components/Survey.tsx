import React, { useState } from 'react'
import Galapon from './Galapon'
import { createPost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'
import { CreatePostInput, OnCreatePostSubscription } from '../API' //eslint-disable-line
import { makeStyles } from '@material-ui/core/styles'
import {
    Paper,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
    InputAdornment,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {
    setAnswers,
    selectAnswers,
    selectScore,
    selectBingoCount,
    updateRankingCard,
} from '../features/user/userSlice'
import {
    questions,
    FIVE_POINT,
    TEXTAREA,
    NAME,
    DISPLAY_NAME,
    FROM,
    SEX,
    questionsCount,
    title,
    NUMBER,
} from '../app/questions'
import { setDoneDialog } from '../features/system/systemSlice'

const useStyles = makeStyles((theme) => ({
    titlePaper: {
        marginBottom: theme.spacing(2),
    },
    title: {
        padding: theme.spacing(5),
        fontWeight: 'bold',
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(0, 1, 2),
    },
    halfField: {
        width: '45%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    rowRadio: {
        margin: '0',
    },
    questionTitle: {
        fontWeight: 'bold',
    },
    label: {
        marginBottom: theme.spacing(1),
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
}))

const Survey = () => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const score = useSelector(selectScore)
    const answers = useSelector(selectAnswers)
    const bingoCount = useSelector(selectBingoCount)
    const dispatch = useDispatch()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target
        if (target != null) {
            const value =
                target.type === 'checkbox' ? target.checked : target.value
            const name = target.name
            console.log(name, value)
            dispatch(setAnswers({ [name]: value }))
            if (['familyName', 'displayName', 'from'].includes(name)) {
                dispatch(updateRankingCard({ key: name, value }))
            }
        }
    }

    const onPost = async () => {
        setLoading(true)
        const { displayName, from, ...contents } = answers
        const res = await API.graphql(
            graphqlOperation(createPost, {
                input: {
                    type: 'post',
                    contents: JSON.stringify(contents),
                    displayName: displayName || answers.familyName,
                    from: from || '',
                    numberOfBingo: bingoCount,
                    score: score,
                    timestamp: Date.now(),
                },
            })
        )
        if (res.data.createPost) {
            console.log(res)
            setLoading(false)
            setSuccess(true)
            dispatch(setDoneDialog(true))
        }
    }

    const FiveRadio = [...Array(5)].map((_, i) => (
        <FormControlLabel
            key={i}
            value={String(i + 1)}
            labelPlacement="top"
            control={<Radio />}
            className={classes.rowRadio}
            label={i + 1}
        />
    ))
    const Questions = questions.map((item, index) => {
        let contents
        switch (item.type) {
            case NAME:
                contents = (
                    <>
                        <TextField
                            name="familyName"
                            required
                            helperText="必須*"
                            onChange={handleInputChange}
                            value={answers.familyName || ''}
                            placeholder="姓"
                            margin="normal"
                            className={classes.halfField}
                        />
                        <TextField
                            name="firstName"
                            onChange={handleInputChange}
                            value={answers.firstName || ''}
                            placeholder="名"
                            margin="normal"
                            className={classes.halfField}
                        />
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(
                                answers.firstName?.trim() &&
                                    answers.familyName?.trim()
                            )}
                        />
                    </>
                )
                break
            case DISPLAY_NAME:
                contents = (
                    <>
                        <TextField
                            name="displayName"
                            onChange={handleInputChange}
                            value={answers.displayName || ''}
                            placeholder={`未入力で${
                                answers.familyName?.trim() || '姓'
                            }になります`}
                            margin="normal"
                            fullWidth
                        />
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(
                                answers.familyName?.trim() ||
                                    answers.displayName?.trim()
                            )}
                        />
                    </>
                )
                break
            case FROM:
                contents = (
                    <>
                        <TextField
                            name="from"
                            onChange={handleInputChange}
                            value={answers.from || ''}
                            placeholder="例）九州大学"
                            helperText="ランキングに載ります*"
                            margin="normal"
                            fullWidth
                        />
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(answers.from?.trim())}
                        />
                    </>
                )
                break
            case SEX:
                contents = (
                    <>
                        <RadioGroup
                            aria-label="gender"
                            name="sex"
                            value={answers.sex || ''}
                            onChange={handleInputChange}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="男性"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="女性"
                            />
                        </RadioGroup>
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(answers.sex)}
                        />
                    </>
                )
                break
            case FIVE_POINT:
                contents = (
                    <>
                        <Grid container justify="center">
                            <RadioGroup
                                row
                                aria-label={item.id}
                                name={item.id}
                                value={answers[item.id] || ''}
                                onChange={handleInputChange}
                            >
                                {FiveRadio}
                            </RadioGroup>
                        </Grid>
                        <Grid
                            container
                            justify="space-between"
                            className={classes.label}
                        >
                            <Typography variant="caption">
                                {item.negative}
                            </Typography>
                            <Typography variant="caption">
                                {item.positive}
                            </Typography>
                        </Grid>
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(answers[item.id])}
                        />
                    </>
                )
                break
            case TEXTAREA:
                contents = (
                    <>
                        <TextField
                            name={item.id}
                            onChange={handleInputChange}
                            value={answers[item.id] || ''}
                            placeholder="回答"
                            margin="normal"
                            fullWidth
                            multiline
                        />

                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(answers[item.id]?.trim())}
                        />
                    </>
                )
                break
            case NUMBER:
                contents = (
                    <>
                        <TextField
                            name={item.id}
                            type="number"
                            onChange={handleInputChange}
                            value={answers[item.id]}
                            placeholder="0"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {item.unit}
                                    </InputAdornment>
                                ),
                            }}
                            margin="normal"
                            fullWidth
                            className={classes.halfField}
                        />
                        <Galapon
                            slotCount={item.slotCount}
                            galable={Boolean(answers[item.id]?.trim())}
                        />
                    </>
                )
                break
            default:
        }
        return (
            <Paper className={classes.paper} key={index}>
                <Typography
                    variant="subtitle1"
                    className={classes.questionTitle}
                >
                    {item.id}. {item.title}
                </Typography>
                {contents}
            </Paper>
        )
    })

    return (
        <>
            <Paper className={classes.titlePaper}>
                <Typography variant="h5" className={classes.title}>
                    {title}（全{questionsCount}問）
                </Typography>
            </Paper>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onPost()
                }}
            >
                {Questions}
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
                        {loading && (
                            <CircularProgress
                                size={24}
                                className={classes.bottunProgress}
                            />
                        )}
                    </div>
                </Grid>
            </form>
        </>
    )
}

export default Survey
