import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EXPERIMENT, GROUP, Question } from '../app/const'
import { questionsA, titleA } from '../app/questions/questionsA'
import {
    setDoneDialog,
    setDrawer,
    setEvaluation,
    setStep,
} from '../features/system/systemSlice'
import {
    selectAnswers,
    selectBingoCount,
    selectScore,
    selectStartTime,
    selectUnusedGalapons,
    setUnusedGalapons,
    setUserId,
} from '../features/user/userSlice'
import Survey from './Survey'
import { createPost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'
import { questionsB, titleB } from '../app/questions/questionsB'
import { selectGroup } from '../features/group/groupSlice'

const ExperimentSurvey = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const answers = useSelector(selectAnswers)
    const score = useSelector(selectScore)
    const bingoCount = useSelector(selectBingoCount)
    const [bingo, setBingo] = useState(false)
    const startTime = useSelector(selectStartTime)
    const group = useSelector(selectGroup)
    const unusedGalapons = useSelector(selectUnusedGalapons)
    const [title, setTitle] = useState(titleA)
    const [questions, setQuestions] = useState<Question[]>(questionsA)

    const onPost = async () => {
        setLoading(true)
        const bingoCountAndScore = [GROUP.A2, GROUP.B2].includes(group)
            ? { bingoCount: 0, score: 0 }
            : { bingoCount, score }
        const { displayName, from } = answers[EXPERIMENT]
        const res = await API.graphql(
            graphqlOperation(createPost, {
                input: {
                    type: 'post',
                    group,
                    contents: JSON.stringify(answers),
                    displayName: displayName || answers[EXPERIMENT].familyName,
                    from: from || '',
                    ...bingoCountAndScore,
                    startTime,
                    experimentEndTime: Date.now(),
                    unusedGalapons: JSON.stringify(unusedGalapons),
                },
            })
        )
        if (res.data.createPost) {
            console.log(res.data.createPost)
            dispatch(setUserId(res.data.createPost.id))
        }
        setLoading(false)
        setSuccess(true)
        if (![GROUP.A1, GROUP.B1].includes(group)) {
            dispatch(setDrawer(true))
        }
        dispatch(setStep(EXPERIMENT))
        dispatch(setDoneDialog(true))
        dispatch(setEvaluation(true))
    }

    useEffect(() => {
        if ([GROUP.B1, GROUP.B2, GROUP.B3].includes(group)) {
            setTitle(titleB)
            setQuestions(questionsB)
        }
        if (![GROUP.A1, GROUP.B1].includes(group)) {
            setBingo(true)
            const galapons = questions.reduce((acc: any, el: any) => {
                return el.id === '問' ? [...acc] : [...acc, el.id]
            }, [])
            dispatch(setUnusedGalapons(galapons))
        }
    }, [group, dispatch, questions])

    return (
        <Survey
            type={EXPERIMENT}
            title={title}
            questions={questions}
            onPost={onPost}
            loading={loading}
            success={success}
            bingo={bingo}
        />
    )
}

export default ExperimentSurvey
