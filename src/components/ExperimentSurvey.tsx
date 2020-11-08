import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EXPERIMENT } from '../app/const'
import { questions, title } from '../app/questions'
import {
    selectBingo,
    setDoneDialog,
    setEvaluation,
} from '../features/system/systemSlice'
import {
    selectAnswers,
    selectBingoCount,
    selectScore,
    setUserId,
} from '../features/user/userSlice'
import Survey from './Survey'
import { createPost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'

const ExperimentSurvey = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const answers = useSelector(selectAnswers)
    const score = useSelector(selectScore)
    const bingoCount = useSelector(selectBingoCount)
    const bingo = useSelector(selectBingo)

    const onPost = async () => {
        setLoading(true)
        const { displayName, from } = answers[EXPERIMENT]
        // const res = await API.graphql(
        //     graphqlOperation(createPost, {
        //         input: {
        //             type: 'post',
        //             contents: JSON.stringify(answers),
        //             displayName: displayName || answers[EXPERIMENT].familyName,
        //             from: from || '',
        //             numberOfBingo: bingoCount,
        //             score: score,
        //             timestamp: Date.now(),
        //         },
        //     })
        // )
        // if (res.data.createPost) {
        //     console.log(res.data.createPost)
        //     dispatch(setUserId(res.data.createPost.id))
        // }
        setLoading(false)
        setSuccess(true)
        dispatch(setDoneDialog(true))
        dispatch(setEvaluation(true))
    }

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
