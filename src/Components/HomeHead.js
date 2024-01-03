import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import Form from 'react-bootstrap/Form'
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'
// import LocationsList from '../DBdata/resLocation.json'
// import RestaurantsList from '../DBdata/AllRes.json'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modals from 'react-modal';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

import Modal from 'react-bootstrap/Modal';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";




const HomeHead = () => {
    const navigate = useNavigate()
    const [location, setLocation] = useState([])
    const [displayInfo, setDisplayInfo] = useState({
        username: '',
        profilepic: '',
        domain: '',
        show: false
    })

    const [selectedLocation, setSelectedLocation] = useState('')
    const [restaurantList, setRestaurantList] = useState([])
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [logoutModel, setLogoutModel] = useState(false)

    const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false)
    const [createAccount, setCreateAccount] = useState({
        username: '',
        email: '',
        password: '',
        phonenumber: ''
    })
    const [loginAccount, setLoginAccount] = useState({
        email: '',
        password: '',
    })

    const LoginModalStyle = {
        content: {
            width: '25%',
            height: '45vh',
            left: '37%',
            top: '25%'
        }
    }
    const SignupModalStyle = {
        content: {
            width: '25%',
            height: '53vh',
            left: '37%',
            top: '17%'

        }
    }

    useEffect(() => {
        async function handleLocationDropdown() {

            await axios.get(`http://localhost:3500/getAllLocations`).then(async (res) => await setLocation(res.data)).catch(err => console.log(err))
            console.log('LocationDropdown result is ', location);

        }
        handleLocationDropdown()
    }, [])

    const handleLocaionClick = async (e) => {
        console.log(e.target.value)

        setSelectedLocation(e.target.value)
        const result = await axios.get(`http://localhost:3500/getRestaurantBasedOnLocations/${e.target.value}`).then((res) => res.data).catch(err => console.log(err))
        setRestaurantList(result)
        // console.log('result is ', result);
    }
    const handleCreateAccInputChange = (e) => {
        // console.log("namefetched", e.target.name);
        switch (e.target.name) {
            case 'username':
                setCreateAccount((prevAcc) => ({
                    ...prevAcc,
                    username: e.target.value
                }))
                break;

            case 'email':
                setCreateAccount((prevAcc) => ({
                    ...prevAcc,
                    email: e.target.value
                }))
                break;

            case 'mob':
                setCreateAccount((prevAcc) => ({
                    ...prevAcc,
                    phonenumber: e.target.value
                }))
                break;

            case 'password':
                setCreateAccount((prevAcc) => ({
                    ...prevAcc,
                    password: e.target.value
                }))
                break;

            default:
                break;
        }
    }

    // console.log("check", createAccount);
    const createAcc = async (e) => {
        e.preventDefault()
        // console.log('form clicked')
        // console.log('create Acc', createAccount)

        const result = await axios.post(`http://localhost:3500/createAccount`, createAccount).then(res => res).catch(err => console.log('err is', err))
        if (result.status === 200) {
            setSignUpModalIsOpen(!signUpModalIsOpen)
            setLoginModalIsOpen(!loginModalIsOpen)
        }
    }
    const checkLoginCred = async (e) => {

        e.preventDefault()

        // console.log(loginAccount)
        const result = await axios.post(`http://localhost:3500/loginAccount`, loginAccount).then(res => res).catch(err => console.log('err is', err))
        console.log(result)

        if (result.data.message === "user Found") {
            // setDisplayInfo(result.data.username)
            setDisplayInfo({ username: result.data.username, domain: 'in-App', show: true })
            console.log('disp info', displayInfo);

            setLoginModalIsOpen(!loginModalIsOpen)
        }
        else {
            alert('user not found')
        }

    }
    const handleFacebookLogin = (response) => {
        console.log('facebook response', response.data);
        if (response) {
            setDisplayInfo({ username: response.name, profilepic: response.picture.data.url, domain: response.graphDomain, show: true })
            setLoginModalIsOpen(!loginModalIsOpen)
        } else {
            alert('login failed')
        }
    }

    const handlegoogleLogin = (response) => {

        if (response) {
            const decoded = jwtDecode(response.credential);
            console.log('google response', decoded)
            setDisplayInfo({ username: decoded.given_name, domain: 'google', show: true, profilepic: decoded.picture })
            setLoginModalIsOpen(!loginModalIsOpen)
        }
    };
    const handleLogOut = (e) => {
        console.log(displayInfo.domain);
        if (displayInfo.domain === 'google') {
            googleLogout();
            setLogoutModel(!logoutModel)
            setDisplayInfo({ username: '', domain: '', show: false, profilepic: '' })
        }
    }


    return (
        <>
            <section className='home_section' >
                <Container>
                    <header className='home_header' >

                        {!displayInfo.show && <Button className='home_createAcc_btn' onClick={() => { setSignUpModalIsOpen(true) }} >
                            Create an account
                        </Button>}

                        {!displayInfo.show && <Button className='home_login_btn' onClick={() => { setLoginModalIsOpen(true) }} >
                            Login
                        </Button>}

                        {displayInfo.domain === 'in-App' && <p style={{
                            display: 'inline-block', fontSize: '25px',
                            color: 'white', marginTop: '5px', marginBottom: 0, fontWeight: 600, float: 'right'
                        }} > Hi {displayInfo.username} </p>}

                        {displayInfo.domain === 'google' && <p onClick={() => setLogoutModel(true)} style={{
                            display: 'inline-block', fontSize: '25px',
                            color: 'white', marginTop: '5px', marginBottom: 0, fontWeight: 600, float: 'right'
                        }} > Hi <p style={{ display: 'inline-block' }} >{displayInfo.username}</p>  <img height={'40px'} width={'40px'} style={{ borderRadius: '50%' }} src={displayInfo.profilepic} alt="" /> </p>}


                    </header>
                </Container>
                <Modal show={logoutModel} onHide={() => setLogoutModel(!logoutModel)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>Are you sure , you want to logout</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setLogoutModel(!logoutModel)}>
                            No
                        </Button>
                        <Button variant="primary" onClick={(e) => handleLogOut(e)}>
                            Yes, im sure
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modals isOpen={signUpModalIsOpen} style={SignupModalStyle} >
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 600, textAlign: 'center' }} >Create an Account</p>
                        <form action="post" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => createAcc(e)} >
                            <input type="text"
                                style={{ fontSize: '14px', borderRadius: '5px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Username'
                                name='username'
                                id='username'
                                onChange={(e) => handleCreateAccInputChange(e)}
                                value={createAccount.name}
                                required={true}

                            />
                            <input type="email"
                                style={{ fontSize: '14px', borderRadius: '5px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Email'
                                name='email'
                                id='email'
                                onChange={(e) => handleCreateAccInputChange(e)}
                                value={createAccount.email}
                                required={true}


                            />
                            <input type="number"
                                style={{ fontSize: '14px', borderRadius: '5px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Mobile number '
                                name='mob'
                                id='mob'
                                onChange={(e) => handleCreateAccInputChange(e)}
                                value={createAccount.phonenumber}
                                required={true}

                            />
                            <input type="password"
                                style={{ fontSize: '14px', borderRadius: '5px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Password'
                                name='password'
                                id='password'
                                onChange={(e) => handleCreateAccInputChange(e)}
                                // value={createAccount.password}
                                required={true}


                            />
                            <div style={{ textAlign: 'center' }}>
                                <Button type='submit' style={{ height: '30px', fontSize: '12px' }} >Create an Account</Button>
                                <Button style={{ height: '30px', fontSize: '12px', backgroundColor: 'transparent', border: 'none', marginLeft: '5px', color: 'black' }} onClick={() => setSignUpModalIsOpen(!signUpModalIsOpen)}>Cancel</Button>
                            </div>
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                <GoogleOAuthProvider clientId="764837297249-rost05cc7l60l73g11rqcohv73b9j4c2.apps.googleusercontent.com">
                                    <GoogleLogin
                                        // clientId="764837297249-rost05cc7l60l73g11rqcohv73b9j4c2.apps.googleusercontent.com"
                                        // secret="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"
                                        onSuccess={handlegoogleLogin}
                                        onFailure={(e) => { navigate('/failed') }}
                                    />
                                </GoogleOAuthProvider>
                            </div>

                        </form>


                    </div>
                </Modals>
                <Modals isOpen={loginModalIsOpen} style={LoginModalStyle} >
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: 600 }} >Login</p>
                        <form action="" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => checkLoginCred(e)} >
                            <input type="text"
                                style={{ fontSize: '14px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Email'
                                name='email'
                                id='email'
                                onChange={(e) => setLoginAccount({ ...loginAccount, email: e.target.value })}
                                value={loginAccount.email}
                                required={true}

                            />
                            <input type="password"
                                style={{ fontSize: '14px', fontWeight: 400, width: '100%', border: '1px solid #9b9b9b', padding: '2px 0px 2px 5px' }}
                                placeholder='Password'
                                name='password'
                                id='password'
                                onChange={(e) => setLoginAccount({ ...loginAccount, password: e.target.value })}
                                value={loginAccount.password}
                                required={true}


                            />
                            <div style={{ textAlign: 'center' }}>
                                <Button type='submit' style={{ height: '30px', fontSize: '12px' }}>Login</Button>
                                <Button style={{ height: '30px', fontSize: '12px', backgroundColor: 'transparent', border: 'none', marginLeft: '5px', color: 'black' }} onClick={() => setLoginModalIsOpen(!loginModalIsOpen)}>Cancel</Button>
                            </div>

                        </form>
                        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <GoogleOAuthProvider clientId="764837297249-rost05cc7l60l73g11rqcohv73b9j4c2.apps.googleusercontent.com">
                                <GoogleLogin
                                    // clientId="764837297249-rost05cc7l60l73g11rqcohv73b9j4c2.apps.googleusercontent.com"
                                    // secret="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"
                                    onSuccess={handlegoogleLogin}
                                    onFailure={(e) => { navigate('/failed') }}
                                />
                            </GoogleOAuthProvider>
                        </div>

                    </div>
                </Modals>
                <Container className='home_content_container'  >
                    <div style={{ marginTop: '28px' }} >
                        <p className='home_logo' >e!</p>
                    </div>
                    <h1 style={{ color: 'white', margin: '40px', marginBottom: '80px' }} >Find the Best Restaurants,Cafes, and bars</h1>
                    <div className='home_search' >
                        <div style={{ width: '40%' }} >
                            < select onChange={(e) => { handleLocaionClick(e) }} style={{ height: '37px', border: '1px solid', borderRadius: '5px', width: '100%' }}  >
                                <option value="" selected disabled >Please Select Location</option>
                                {location.sort().map((item, index) => {
                                    return (
                                        <option style={{ textTransform: 'capitalize' }} key={index} value={item.name}>{`${item.name}, ${item.city}`}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div style={{ width: '100%' }}>

                            <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                placeholder="search for restaurants ..."
                                options={restaurantList.map((item) => item)}
                                // selected={singleSelections}
                                onChange={(e) => {
                                    navigate(`/details/${e[0].name}`)
                                }}
                            />
                        </div>
                    </div>
                </Container>

            </section >


        </>
    )
}

export default HomeHead
