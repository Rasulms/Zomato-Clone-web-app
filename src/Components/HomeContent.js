import React, { useEffect, useState } from 'react'
import Breakfast from '../Assets/breakfast.jpg'
import Dinner from '../Assets/dinner.jpg'
import Lunch from '../Assets/lunch.jpg'
import Snacks from '../Assets/snacks.jpg'
import Nightlife from '../Assets/nightlife.jpg'
import Drinks from '../Assets/drink.webp'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomeContent = () => {
    // const restaurant = [
    //     {
    //         id: 1,
    //         description: "start your day with exclusive breakfast",
    //         coverimage: Breakfast,
    //         title: "Breakfast"
    //     },
    //     {
    //         id: 2,
    //         description: "start your day with exclusive lunch options",
    //         coverimage: Lunch,
    //         title: "Lunch"
    //     },
    //     {
    //         id: 3,
    //         description: "start your day with exclusive snacks options",
    //         coverimage: Snacks,
    //         title: "Snacks"
    //     },
    //     {
    //         id: 4,
    //         description: "start your day with exclusive breakfast options",
    //         coverimage: Dinner,
    //         title: "Dinner"
    //     },
    //     {
    //         id: 5,
    //         description: "start your day with exclusive drink options",
    //         coverimage: Drinks,
    //         title: "Drink"
    //     },
    //     {
    //         id: 6,
    //         description: "start your day with exclusive Nightlife options",
    //         coverimage: Nightlife,
    //         title: "Nightlife"
    //     }

    // ]
    const [mealType, setMealType] = useState([])
    useEffect(() => {

        async function handleMealType() {
            await axios.get(`http://localhost:3500/getAllMealType`).then(async (res) => await setMealType(res.data)).catch(err => console.log(err))
            // console.log('mealtype is ', mealType);
        }
        handleMealType()

    }, [])

    return (
        <>
            <section>

                <div style={{ width: '85%', margin: 'auto' }} >
                    <h2 style={{ marginTop: '1.5rem' }} >Quick Searches </h2>
                    <p style={{ marginBottom: '2rem' }} >Discover restaurants by type of meal </p>
                    <div style={{ display: 'flex', height: '60vh', flexWrap: 'wrap', width: '106%' }}>
                        {mealType.map((item, index) => {
                            return (
                                <Link to={`/filter/${item.meal_type}`} style={{ textDecoration: 'none', color: '#212529' }} >

                                    <div className='cardBox' key={index} >
                                        <div className='image_div'>
                                            <img src={item.image} alt="breakfast" width={'86%'} height={'192px'} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', width: '55%', justifyContent: 'center' }} >
                                            <p style={{ fontSize: '24px', fontWeight: '600', marginBottom: '0px ' }}>{item.name}</p>
                                            <p style={{ color: '#9c9c9c', fontSize: '16px', marginBottom: '0px ' }} >{item.content}</p>

                                        </div>
                                    </div>
                                </Link>
                            )
                        })}


                    </div>
                </div>


            </section>
        </>
    )
}

export default HomeContent
