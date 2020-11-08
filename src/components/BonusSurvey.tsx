import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BONUS, EVALUATION } from '../app/const'
import { bonusQuestions, bonusTitle } from '../app/bonusQuestions'
import {
    selectBonus,
    selectEvaluation,
    setDoneDialog,
    setEvaluation,
} from '../features/system/systemSlice'
import { selectAnswers, selectUserId } from '../features/user/userSlice'
import Survey from './Survey'
import { createPost, updatePost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'

const BonusSurvey = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const answers = useSelector(selectAnswers)
    const userId = useSelector(selectUserId)
    const bonus = useSelector(selectBonus)

    const onPost = async () => {
        setLoading(true)
        // const res = await API.graphql(
        //     graphqlOperation(updatePost, {
        //         input: {
        //             id: userId,
        //             contents: JSON.stringify(answers),
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
    }
    return bonus ? (
        <Survey
            type={BONUS}
            title={bonusTitle}
            questions={bonusQuestions}
            onPost={onPost}
            loading={loading}
            success={success}
        />
    ) : null
}

export default BonusSurvey
