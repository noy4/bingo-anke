import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EVALUATION } from '../app/const'
import {
    evaluationQuestions,
    evaluationTitle,
} from '../app/evaluationQuestions'
import {
    selectEvaluation,
    setBonus,
    setDoneDialog,
} from '../features/system/systemSlice'
import {
    selectAnswers,
    selectBingoCount,
    selectScore,
    selectUserId,
} from '../features/user/userSlice'
import Survey from './Survey'
import { createPost, updatePost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'

const EvaluationSurvey = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const answers = useSelector(selectAnswers)
    const userId = useSelector(selectUserId)
    const score = useSelector(selectScore)
    const bingoCount = useSelector(selectBingoCount)

    const onPost = async () => {
        setLoading(true)
        // const res = await API.graphql(
        //     graphqlOperation(updatePost, {
        //         input: {
        //             id: userId,
        //             contents: JSON.stringify(answers),
        //             numberOfBingo: bingoCount,
        //             score: score,
        //             timestamp: Date.now(),
        //         },
        //     })
        // )
        // if (res.data.updatePost) {
        //     console.log(res.data.updatePost)
        // }
        setLoading(false)
        setSuccess(true)
        dispatch(setDoneDialog(true))
        dispatch(setBonus(true))
    }
    const evaluation = useSelector(selectEvaluation)
    return evaluation ? (
        <Survey
            type={EVALUATION}
            title={evaluationTitle}
            questions={evaluationQuestions}
            onPost={onPost}
            loading={loading}
            success={success}
            bingo={false}
        />
    ) : null
}

export default EvaluationSurvey
