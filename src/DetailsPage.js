import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Idly from './Assets/idly.jpg'
import Dinner from './Assets/Ragi-Dosa.jpg'
import Rawa from './Assets/rawa.jpg' // requires a loader
import { Button } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modals from 'react-modal';



const DetailsPage = () => {
    let total = 0
    const { hotel_id } = useParams()
    const [Restaurant, setRestaurant] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [qty, setQty] = useState({
        menu1: '',
        menu2: '',
        menu3: '',
        menu4: '',
    })



    const [placeOrderIsOpen, setPlaceOrderIsOpen] = useState(false)
    const placeOrderStyle = {
        content: {
            width: '30%',
            height: '78vh',
            left: '33%',
            top: '8%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'

        }
    }


    useEffect(() => {


        fetchOneRestaurant()

    }, [])

    const fetchOneRestaurant = async () => {
        await axios.get(`http://localhost:3500/getOneRestautants/${hotel_id}`).then(async (res) => await setRestaurant(res.data[0])).catch(err => console.log(err))

    }
    const handlePlaceOrder = async (e) => {
        setPlaceOrderIsOpen(!placeOrderIsOpen);
        setSubTotal(0)
        await axios.get(`http://localhost:3500/getRestautantMenu/${hotel_id}`).then(async (res) => await setMenuItems(res.data[0].menu)).catch(err => console.log(err))

    }
    const handleAdd = (e, operationType, index) => {
        // console.log('qtyy is b4', menuItems[index].dish_name, menuItems[index].dish_qty);

        if (operationType == 'add') {
            menuItems[index].dish_qty += 1
            setMenuItems([...menuItems])
            menuItems.map((item) => total += item.dish_qty * item.dish_price)
            setSubTotal(total)

        }
        else {

            menuItems[index].dish_qty -= 1
            setMenuItems([...menuItems])
            menuItems.map((item) => total += item.dish_qty * item.dish_price)
            setSubTotal(total)

        }


        // console.log('qtyy is after', menuItems[index].dish_name, menuItems[index].dish_qty);

        // console.log('qtyy is', menuItems[index].dish_qty);
    }

    return (
        <main>
            <section className='details_top_Section' >
                <Carousel showThumbs={false} >
                    <div>
                        <img src={Idly} alt='Breakfast' style={{ height: '92vh', marginTop: '-182px' }} />
                    </div>
                    <div>
                        <img src={Dinner} alt='Lunch' style={{ height: '104vh', marginTop: '-123px' }} />
                    </div>
                    <div>
                        <img src={Rawa} alt='Dinner' style={{ height: '122vh', marginTop: '-220px' }} />
                    </div>
                </Carousel>
            </section>
            <section style={{ display: 'flex', padding: '0px 20px 0px 20px' }} >
                <div style={{ width: '50%' }}>
                    <p style={{ fontSize: '22px', fontWeight: 700 }} >{Restaurant.name}</p>
                </div>
                <div style={{ width: '50%' }}>
                    <Button onClick={(e) => handlePlaceOrder(e)} style={{ float: 'right', marginTop: '10px', border: 'none', backgroundColor: '#e01803' }} >
                        Place Online Order
                    </Button>
                </div>

            </section>
            <section style={{ padding: '0px 20px 0px 20px' }} >
                <Tabs>
                    <TabList>
                        <Tab style={{ fontWeight: '600', color: '#005489' }} >Overview</Tab>
                        <Tab style={{ fontWeight: '600', color: '#005489' }} >Contact</Tab>
                    </TabList>
                    <TabPanel style={{ padding: '5px' }}>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#8f8f8f', textAlign: 'justify', lineHeight: '25px' }}  >{Restaurant.about}</p>
                    </TabPanel>
                    <TabPanel style={{ padding: '5px' }}>
                        <div>
                            <h6 style={{ fontWeight: '600', color: '#005489' }} >Phone Number</h6>
                            <h6 style={{ color: '#e01803' }}>{Restaurant.contact_number}</h6>
                            <br />
                            <h6 style={{ fontWeight: '600', color: '#005489' }}  >Address</h6>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#8f8f8f' }} >{Restaurant.address}</span>


                        </div>

                    </TabPanel>
                </Tabs>

            </section>

            <Modals isOpen={placeOrderIsOpen} style={placeOrderStyle} >
                <header>
                    <span style={{ fontSize: '21px', fontWeight: 500 }}>{Restaurant.name} Menu</span>
                    <button style={{ border: 'none', backgroundColor: 'transparent', float: 'right' }} onClick={() => setPlaceOrderIsOpen(false)}>&times;</button>
                </header>
                <section style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {menuItems.length != 0 ? menuItems.map((item, index) => {

                        return (
                            <div key={index} style={{ height: '100px', display: 'flex', borderBottom: '1px solid', justifyContent: 'space-between' }}>
                                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 500 }}  >{item.dish_name}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 500 }} >Rs {item.dish_price}</span>
                                    <span style={{ fontSize: '11px', color: 'rgb(148 148 148)', fontWeight: 500 }}>{item.description}</span>

                                </div>
                                <div style={{ width: '130px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    {item.dish_qty == 0 ?
                                        <button onClick={(e) => { handleAdd(e, 'add', index) }} className='btn' style={{ padding: 0, border: '1px solid', width: '70px', height: '30px', fontSize: '13px', fontWeight: 500 }}>Add</button>
                                        : <div style={{ display: 'flex' }}>
                                            <button className='btn' onClick={(e) => handleAdd(e, 'add', index)}>+</button>
                                            <span style={{ padding: '10px' }}>{item.dish_qty}</span>
                                            <button className='btn' onClick={(e) => handleAdd(e, 'sub', index)}>-</button>

                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }) :
                        <h3>Loading</h3>
                    }
                </section>
                <footer  >
                    <span style={{ fontSize: '17px', fontWeight: 500 }}>Sub-Total : {subTotal}</span>
                    <button style={{ color: 'white', float: 'right', backgroundColor: '#e01803', fontSize: '12px', width: '120px' }}
                        className='btn ' onClick={() => setPlaceOrderIsOpen(false)}>Pay Now</button>

                </footer>

            </Modals>


        </main>
    )
}

export default DetailsPage
