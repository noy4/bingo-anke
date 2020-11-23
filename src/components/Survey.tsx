import React from 'react'
import Galapon from './Galapon'
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
    updateRankingCard,
} from '../features/user/userSlice'
import {
    DISPLAY_NAME,
    FIVE_POINT,
    FROM,
    NAME,
    NUMBER,
    Question,
    SEX,
    Step,
    TEXTAREA,
} from '../app/const'

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
        marginBottom: theme.spacing(10),
    },
    bottunProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

interface SurveyProps {
    type: Step
    title: string
    questions: Question[]
    onPost: () => void
    loading: boolean
    success: boolean
    bingo?: boolean
}

const Survey = (props: SurveyProps) => {
    const classes = useStyles()
    const answers = useSelector(selectAnswers)
    const dispatch = useDispatch()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target
        if (target != null) {
            const value =
                target.type === 'checkbox' ? target.checked : target.value
            const name = target.name
            dispatch(setAnswers({ key: props.type, value: { [name]: value } }))
            if (['familyName', 'displayName', 'from'].includes(name)) {
                dispatch(updateRankingCard({ key: name, value }))
            }
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
    const Questions = props.questions.map((item, index) => {
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
                            value={answers[props.type].familyName || ''}
                            placeholder="姓"
                            margin="normal"
                            className={classes.halfField}
                        />
                        <TextField
                            name="firstName"
                            onChange={handleInputChange}
                            value={answers[props.type].firstName || ''}
                            placeholder="名"
                            margin="normal"
                            className={classes.halfField}
                        />
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(
                                    answers[props.type].firstName?.trim() &&
                                        answers[props.type].familyName?.trim()
                                )}
                            />
                        )}
                    </>
                )
                break
            case DISPLAY_NAME:
                contents = (
                    <>
                        <TextField
                            name="displayName"
                            onChange={handleInputChange}
                            value={answers[props.type].displayName || ''}
                            placeholder={`未入力で${
                                answers[props.type].familyName?.trim() || '姓'
                            }になります`}
                            helperText="Web上で公開されます。パスワードなどの個人情報を書かないでください*"
                            margin="normal"
                            fullWidth
                        />
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(
                                    answers[props.type].familyName?.trim() ||
                                        answers[props.type].displayName?.trim()
                                )}
                            />
                        )}
                    </>
                )
                break
            case FROM:
                contents = (
                    <>
                        <TextField
                            name="from"
                            onChange={handleInputChange}
                            value={answers[props.type].from || ''}
                            placeholder="例）愛媛大学"
                            helperText="Web上で公開されます。パスワードなどの個人情報を書かないでください*"
                            margin="normal"
                            fullWidth
                        />
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(
                                    answers[props.type].from?.trim()
                                )}
                            />
                        )}
                    </>
                )
                break
            case SEX:
                contents = (
                    <>
                        <RadioGroup
                            aria-label="gender"
                            name="sex"
                            value={answers[props.type].sex || ''}
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
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(answers[props.type].sex)}
                            />
                        )}
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
                                value={answers[props.type][item.id] || ''}
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
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(answers[props.type][item.id])}
                            />
                        )}
                    </>
                )
                break
            case TEXTAREA:
                contents = (
                    <>
                        <TextField
                            name={item.id}
                            onChange={handleInputChange}
                            value={answers[props.type][item.id] || ''}
                            placeholder="回答"
                            margin="normal"
                            fullWidth
                            multiline
                        />
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(
                                    answers[props.type][item.id]?.trim()
                                )}
                            />
                        )}
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
                            value={answers[props.type][item.id] || ''}
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
                        {props.bingo && (
                            <Galapon
                                id={item.id}
                                slotCount={item.slotCount}
                                galable={Boolean(
                                    answers[props.type][item.id]?.trim()
                                )}
                            />
                        )}
                    </>
                )
                break
            default:
                break
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
                    {props.title}（全
                    {props.questions.filter((v) => v.type).length}
                    問）
                </Typography>
            </Paper>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    props.onPost()
                }}
            >
                {Questions}
                <Grid container justify="flex-end">
                    <div className={classes.buttonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={props.loading || props.success}
                        >
                            送信
                        </Button>
                        {props.loading && (
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

Survey.defaultProps = {
    bingo: false,
}

export default Survey
