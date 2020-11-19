import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BONUS, GROUP } from '../app/const'
import { bonusQuestions, bonusTitle } from '../app/questions/bonusQuestions'
import {
    selectBonus,
    setDoneDialog,
    setDrawer,
    setStep,
} from '../features/system/systemSlice'
import {
    selectAnswers,
    selectBingoCount,
    selectScore,
    selectUserId,
} from '../features/user/userSlice'
import Survey from './Survey'
import { updatePost } from '../graphql/mutations'
import API, { graphqlOperation } from '@aws-amplify/api'
import { selectGroup } from '../features/group/groupSlice'

const BonusSurvey = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const answers = useSelector(selectAnswers)
    const userId = useSelector(selectUserId)
    const bonus = useSelector(selectBonus)
    const group = useSelector(selectGroup)
    const bingoCount = useSelector(selectBingoCount)
    const score = useSelector(selectScore)

    const onPost = async () => {
        setLoading(true)
        const bingoCountAndScore = [GROUP.A3, GROUP.B3].includes(group)
            ? {}
            : {
                  bingoCount,
                  score,
              }

        const res = await API.graphql(
            graphqlOperation(updatePost, {
                input: {
                    id: userId,
                    contents: JSON.stringify(answers),
                    bonusEndTime: Date.now(),
                    ...bingoCountAndScore,
                },
            })
        )
        if (res.data.updatePost) {
            console.log(res.data.updatePost)
        }
        setLoading(false)
        setSuccess(true)
        dispatch(setDrawer(true))
        dispatch(setStep(BONUS))
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
            bingo
        />
    ) : null
}

export default BonusSurvey
