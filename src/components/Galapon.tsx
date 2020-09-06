import React, {useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Button,
} from '@material-ui/core';
import Adjust from '@material-ui/icons/Adjust';
import CheckCircleOutlineRounded from '@material-ui/icons/CheckCircleOutlineRounded';

interface GalaponProps {
    galapon: () => void,
    galable?: boolean,
}

export default function Galapon(props: GalaponProps) {
    const [disabled, setDisabled] = useState(false);
    
    return (
        <Grid container justify='flex-end'>
            <Button
                variant='contained'
                color='secondary'
                startIcon={disabled ? <CheckCircleOutlineRounded /> : <Adjust />}
                disableElevation
                onClick={() => {
                    props.galapon();
                    setDisabled(true);
                }}
                disabled={!props.galable || disabled}
            >
                {disabled ? '済' : 'ガラポン'}
            </Button>
        </Grid>
    );
}

Galapon.defaultProps = {
    galable: true,
};
