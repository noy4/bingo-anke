import { Modal, Box } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCloseModal, selectModal } from '../features/counter/counterSlice'
import Bingo from './Bingo'
import Slots from './Slots'

const SlotModal = () => {
    const modal = useSelector(selectModal)
    const dispatch = useDispatch()
    return (
        <Modal
            open={modal}
            disableAutoFocus
            disableEnforceFocus
            onClose={() => {
                dispatch(handleCloseModal())
            }}
        >
            <Box width={272} mx="auto">
                <Slots />
                <Bingo />
            </Box>
        </Modal>
    )
}

export default SlotModal
