import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BONUS,
    DIALOG,
    EVALUATION,
    EXPERIMENT,
    GROUP,
    INTRODUCTION,
} from '../app/const'
import { selectGroup } from '../features/group/groupSlice'
import {
    selectDoneDialog,
    selectStep,
    setDoneDialog,
    setDrawer,
} from '../features/system/systemSlice'
import {
    resetBingoCard,
    setBalls,
    setBingoCount,
    setNewIam,
    setScore,
    setStartTime,
} from '../features/user/userSlice'

const DoneDialog = () => {
    const dispatch = useDispatch()
    const step = useSelector(selectStep)
    const doneDialog = useSelector(selectDoneDialog)
    const group = useSelector(selectGroup)

    let title
    let description
    let onClose
    let onClick
    let actions = true
    switch (step) {
        case INTRODUCTION:
            title = DIALOG.INTRODUCTION.TITLE
            description = DIALOG.INTRODUCTION.DESCRIPTION
            onClick = () => {
                dispatch(setDoneDialog(false))
                ![GROUP.A1, GROUP.B1].includes(group) &&
                    dispatch(setDrawer(true))
                dispatch(setStartTime(Date.now()))
            }
            break
        case EXPERIMENT:
            title = DIALOG.EXPERIMENT.TITLE
            description = DIALOG.EXPERIMENT.DESCRIPTION
            onClick = () => {
                dispatch(setDoneDialog(false))
            }
            break
        case EVALUATION:
            title = DIALOG.EVALUATION.TITLE
            description = DIALOG.EVALUATION.DESCRIPTION
            actions = false
            onClose = () => {
                dispatch(setDoneDialog(false))
                dispatch(resetBingoCard())
                dispatch(
                    setBalls(
                        Array(75)
                            .fill(0)
                            .map((_, i) => i + 1)
                    )
                )
                dispatch(setScore(0))
                dispatch(setBingoCount(0))
                if ([GROUP.A3, GROUP.B3].includes(group)) {
                    dispatch(setNewIam())
                }
            }
            break
        case BONUS:
            title = DIALOG.BONUS.TITLE
            description = DIALOG.BONUS.DESCRIPTION
            actions = false
            onClose = () => {
                dispatch(setDoneDialog(false))
            }
            break

        default:
            break
    }

    return (
        <Dialog
            open={doneDialog}
            aria-labelledby="submit-dialog-title"
            aria-describedby="submit-dialog-description"
            onClose={onClose}
        >
            <DialogTitle id="submit-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="submit-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            {actions && (
                <DialogActions>
                    <Button onClick={onClick} color="primary">
                        進む
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

export default DoneDialog
