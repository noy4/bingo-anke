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
    selectDoneDialog,
    setDoneDialog,
    setDrawer,
} from '../features/system/systemSlice'

const DoneDialog = () => {
    const doneDialog = useSelector(selectDoneDialog)
    const dispatch = useDispatch()
    return (
        <Dialog
            open={doneDialog}
            aria-labelledby="submit-dialog-title"
            aria-describedby="submit-dialog-description"
            onClose={() => dispatch(setDoneDialog(false))}
        >
            <DialogTitle id="submit-dialog-title">
                回答を送信しました。
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="submit-dialog-description">
                    ご協力ありがとうございます。( ᐛ)
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        dispatch(setDoneDialog(false))
                        dispatch(setDrawer(true))
                    }}
                    color="primary"
                >
                    ランキングを見る
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DoneDialog
