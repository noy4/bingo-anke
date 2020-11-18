import { Modal, Box } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRankInfo } from '../features/user/userSlice'
import {
    selectModal,
    selectRanking,
    setModal,
    setRankNotice,
} from '../features/system/systemSlice'
import Bingo from './Bingo'
import Slots from './Slots'

const SlotModal = () => {
    const dispatch = useDispatch()
    const modal = useSelector(selectModal)
    const rankInfo = useSelector(selectRankInfo)
    const ranking = useSelector(selectRanking)

    function handleCloseModal() {
        dispatch(setModal(false))
        if (rankInfo.prev !== rankInfo.current && ranking) {
            dispatch(setRankNotice(true))
        }
    }

    return (
        <Modal
            open={modal}
            disableAutoFocus
            disableEnforceFocus
            onClose={handleCloseModal}
        >
            <Box width={272} mx="auto">
                <Slots />
                <Bingo />
            </Box>
        </Modal>
    )
}

export default SlotModal
