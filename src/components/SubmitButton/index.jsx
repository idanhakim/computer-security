import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";

const BootstrapButton = styled(Button)({

    backgroundColor: '#282c34',
    borderColor: '#282c34',
    color: '#61dafb',
    fontWeight: 700,
    textTransform: 'uppercase',
    '&:hover': {
        backgroundColor: '#282c34',
        borderColor: '#282c34',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#282c34',
        borderColor: '#282c34',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

export const SubmitButton = ({disabled, text}) => {
    return <BootstrapButton variant="contained" size="medium" type="submit"
                            disabled={disabled}>{text}</BootstrapButton>

}