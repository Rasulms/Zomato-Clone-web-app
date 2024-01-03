import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom'

const FilterHead = () => {
    const navigate = useNavigate()

    const handleLogoClick = () => {
        navigate('/')
    }
    return (
        <>
            <header style={{ backgroundColor: '#e01803' }} >
                <div style={{ width: '88%', margin: 'auto', height: '53px' }} >
                    <p className='filterPage_headerlogo' style={{ cursor: 'pointer' }} onClick={() => { handleLogoClick() }} >e!</p>
                    <Button className='filter_createAcc_btn' >
                        Create an account
                    </Button>
                    <Button className='filter_login_btn' >
                        Login
                    </Button>

                </div>
            </header>

        </>
    )
}

export default FilterHead
