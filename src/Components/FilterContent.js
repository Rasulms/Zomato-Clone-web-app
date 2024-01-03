import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form';
import Breakfast from '../Assets/breakfast.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';

const FilterContent = ({ mealType_id }) => {
    // console.log('mealType_id is ', mealType_id);
    const [displaymealType, setDispalyMealType] = useState([]);
    const [locationList, setLocationList] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')
    const [costForTwo, setCostForTwo] = useState('')
    const [selectedItems, setSelectedItems] = useState('');


    useEffect(() => {

        handleMealTypes(mealType_id)
        handleLocationDropdown()

    }, [])



    const checkbox = async () => {
        if (selectedItems.length != 0) {
            var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then((res) => res.data).catch(err => console.log(err))

            var rest = await result.filter((item) => {
                var tempData = item.cuisine.filter((i) => i.name)
                if (tempData) {
                    for (let i = 0; i <= tempData.length - 1; i++) {
                        for (let j = 0; j <= selectedItems.length - 1; j++) {
                            if (tempData[i].name === selectedItems[j]) {
                                return item
                            }

                        }

                    }

                }
            })
            setDispalyMealType([...rest])
        }
        else {
            await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then(async (res) => setDispalyMealType(res.data)).catch(err => console.log(err))

        }
    }
    async function handleLocationDropdown() {

        await axios.get(`http://localhost:3500/getAllLocations`).then(async (res) => await setLocationList(res.data)).catch(err => console.log(err))
        // console.log('LocationDropdown result is ', locationList);

    }

    async function handleMealTypes(mealType_id) {

        await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then(async (res) => setDispalyMealType(res.data)).catch(err => console.log(err))
        // console.log('handleMealTypes result is ', displaymealType);

    }
    const handleLocationSort = async (e) => {
        e.preventDefault();
        setSelectedLocation(e.target.value)

        var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then(async (res) => await res.data).catch(err => console.log(err))
        if (costForTwo) {
            const locationSort = await result.filter((item) => item.locality == e.target.value && item.min_price <= costForTwo && item.min_price >= costForTwo - 500)
            if (locationSort) {
                setDispalyMealType(locationSort)

            }
            else {
                setDispalyMealType([])

            }
        }
        else {
            const locationSort = await result.filter((item) => item.locality == e.target.value && item.min_price <= 2000)
            if (locationSort) {
                setDispalyMealType(locationSort)

            }
            else {
                setDispalyMealType([])

            }

        }
    }
    const handleCostForTwo = async (e) => {
        setCostForTwo(e.target.value)


        if (selectedLocation) {
            var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then((res) => res.data).catch(err => console.log(err))
            const r = result.filter((item) => item.locality == selectedLocation && item.min_price <= e.target.value && item.min_price > e.target.id)
            setDispalyMealType(r)

        }
        else {
            var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then((res) => res.data).catch(err => console.log(err))
            const r = result.filter((item) => item.min_price <= e.target.value && item.min_price > e.target.id)
            // console.log('rrr', r);
            setDispalyMealType(r)

        }

    }
    const handleSortPrice = async (e) => {
        // console.log('price sort', e.target.value);
        if (e.target.value == "lowToHigh") {
            // console.log('sortttt', displaymealType);
            const result = await displaymealType.sort((a, b) => {
                return a.min_price - b.min_price;
            })
            // console.log(result);
            await setDispalyMealType([...result])
        }
        if (e.target.value == "HighToLow") {
            const result = await displaymealType.sort((a, b) => {
                return b.min_price - a.min_price
            })
            // console.log(result);

            await setDispalyMealType([...result])
        }
    }
    const handleCheckboxChange = async (event) => {
        const { value } = event.target;
        await setSelectedItems(value)

        if (value && value != 'All') {
            var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then((res) => res.data).catch(err => console.log(err))

            var rest = await result.filter((item) => {
                var tempData = item.cuisine.filter((i) => i.name)
                if (tempData) {
                    for (let i = 0; i <= tempData.length - 1; i++) {
                        if (tempData[i].name === value) {
                            return item
                        }

                    }
                }
            })
            if (selectedLocation) {
                await rest.filter((item) => item.locality == selectedLocation)

            }
            if (costForTwo) {
                await rest.filter((item) => item.min_price <= costForTwo && item.min_price >= costForTwo - 500)
            }
            return setDispalyMealType([...rest])

        }
        if (value && value == 'All') {

            var result = await axios.get(`http://localhost:3500/getMealType/${mealType_id}`).then((res) => res.data).catch(err => console.log(err))

            var rest = await result;

            if (selectedLocation) {
                var lres = await rest.filter((item) => { return item.locality == selectedLocation })
                // console.log('locatttttt', lres);
                if (costForTwo) {
                    var costres = await lres.filter((item) => item.min_price <= costForTwo && item.min_price >= costForTwo - 500)
                    return await setDispalyMealType([...costres])
                }
                return await setDispalyMealType([...lres])
            }
            if (costForTwo) {
                var costres = await rest.filter((item) => item.min_price <= costForTwo && item.min_price >= costForTwo - 500)
                if (selectedLocation) {
                    var lres = await costres.filter((item) => { return item.locality == selectedLocation })
                    return await setDispalyMealType([...lres])

                }
                return await setDispalyMealType([...costres])

            }

            await setDispalyMealType([...rest])
        }
    };


    const [currentPage, setCurrentPage] = useState(1);

    const nPages = Math.ceil(displaymealType.length / 2);

    const paginatedData = displaymealType.slice((currentPage - 1) * 2, currentPage * 2);


    return (
        <>
            <section style={{ width: '80%', margin: 'auto', }} >
                <p style={{ marginTop: '20px', fontSize: '30px', fontWeight: '700', marginBottom: '7px' }} >
                    {mealType_id == 1 ? "Breakfast" : mealType_id == 2 ? "Lunch" : mealType_id == 3 ? "Dinner" : mealType_id == 4 ? "Snacks" : mealType_id == 5 ? "Drinks" : mealType_id === 6 ? "Nightlife" : null} Places</p>
                <div style={{ display: 'flex', gap: '25px' }} >
                    <div className="left_side">
                        <Container style={{ display: 'flex', flexDirection: 'column', height: '81px', padding: '20px' }} >
                            <p style={{ marginBottom: '4px', fontSize: '17px', fontWeight: 600, color: '#004975' }}>Filters</p>
                            <div style={{ marginBottom: '15px' }} >
                                <p style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 500, color: '#004975' }}>Select Location</p>
                                <select onChange={(e) => handleLocationSort(e)} style={{ height: '30px', width: '100%', fontSize: '13px', fontWeight: 500, color: 'rgb(132 127 127)' }}>
                                    <option value="" selected disabled >Please Select Location</option>
                                    {locationList.map((item, index) => {
                                        return (
                                            <option style={{ textTransform: 'capitalize' }} key={index} value={item.name}>{`${item.name}, ${item.city}`}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div style={{ marginBottom: '10px' }} >
                                <p style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 500, color: '#004975' }}>Cuisine</p>
                                <Form>
                                    <div style={{ color: 'rgb(132 127 127)', fontSize: '13px', fontWeight: 500 }} >
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'North Indian'} type={'radio'} name={'cuisine'} label={`North Indian`} />
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'South Indian'} type={'radio'} name={'cuisine'} label={`South Indian`} />
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'Chinese'} type={'radio'} name={'cuisine'} label={`Chinese`} />
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'Fast Food'} type={'radio'} name={'cuisine'} label={`Fast Food`} />
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'Street Food'} type={'radio'} name={'cuisine'} label={`Street Food`} />
                                        <Form.Check onClick={(e) => {
                                            handleCheckboxChange(e)
                                        }
                                        } className='cuisine' value={'All'} type={'radio'} name={'cuisine'} label={`All`} />
                                    </div>
                                </Form>
                            </div>
                            <div style={{ marginBottom: '10px' }} >
                                <p style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 500, color: '#004975' }}>Cost For Two</p>
                                <Form  >
                                    <div style={{ color: 'rgb(132 127 127)', fontSize: '13px', fontWeight: 500 }} >
                                        <Form.Check onClick={(e) => handleCostForTwo(e)} type={'radio'} id={'0'} name={'costfortwo'} className='costfortwo' value={500} label={`Less than Rs 500`} />
                                        <Form.Check onClick={(e) => handleCostForTwo(e)} type={'radio'} id={'500'} name={'costfortwo'} className='costfortwo' value={1000} label={`Rs 500 to Rs 1000`} />
                                        <Form.Check onClick={(e) => handleCostForTwo(e)} type={'radio'} id={'1000'} name={'costfortwo'} className='costfortwo' value={1500} label={`Rs 1000 to Rs 1500`} />
                                        <Form.Check onClick={(e) => handleCostForTwo(e)} type={'radio'} id={'1500'} name={'costfortwo'} className='costfortwo' value={2000} label={`Rs 1500 to Rs 2000`} />
                                        <Form.Check onClick={(e) => handleCostForTwo(e)} type={'radio'} id={'0'} name={'costfortwo'} className='costfortwo' value={2000} label={`All`} />
                                    </div>
                                </Form>
                            </div>
                            <div style={{ marginBottom: '10px' }} >
                                <p style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 500, color: '#004975' }}>Sort</p>
                                <Form onChange={(e) => handleSortPrice(e)} >
                                    <div style={{ color: 'rgb(132 127 127)', fontSize: '13px', fontWeight: 500 }} >
                                        <Form.Check type={'radio'} name={'priceSort'} value={'lowToHigh'} label={`Price low to high`} />
                                        <Form.Check type={'radio'} name={'priceSort'} value={'HighToLow'} label={`Price high to low`} />
                                    </div>
                                </Form>
                            </div>
                        </Container>

                    </div>
                    <div className="right_side" style={{ display: 'flex', alignItems: 'center', gap: '15px' }} >
                        {displaymealType.length > 0 ? paginatedData.map((item, index) => {
                            return (
                                <div className="filter_box" key={index} >
                                    <Link to={`/details/${item.hotel_id}`} style={{ textDecoration: 'none', color: '#212529' }} >

                                        <div className='filter_box_top' >
                                            <div style={{ height: '130px', width: '110px', overflow: 'hidden', marginLeft: '15px' }} >
                                                <img src={item.image} alt="" style={{ objectFit: 'cover' }} height={'130px'} width={'110px'} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                                                <h5 style={{ color: '#005585', fontWeight: '700' }}>{item.name}</h5>
                                                <h6 style={{ color: '#005585', fontVariant: 'all-small-caps' }}>{item.locality}</h6>
                                                <span style={{ color: 'rgb(109, 107, 107)', fontSize: '12px', fontWeight: '600' }} >{item.city}</span>
                                            </div>
                                        </div>
                                        <div className='filter_box_bottom' >
                                            <div style={{ display: 'flex', gap: '25px' }} >
                                                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', fontWeight: 600, color: '#939090', justifyContent: 'center' }}>
                                                    <p style={{ marginBottom: '10px' }} >CUISINES:</p>
                                                    <p style={{ marginBottom: '10px' }} >COST FOR TWO:</p>

                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', fontWeight: 600, color: 'rgb(105 105 105)', justifyContent: 'center' }}>
                                                    <p style={{ marginBottom: '10px' }} >{item.cuisine.map((i) => i.name)}</p>
                                                    <p style={{ marginBottom: '10px' }} >Rs. {item.min_price}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            )

                        }) : <p style={{ marginTop: '200px', fontSize: '15px', fontWeight: 500 }} >No restaurant Found, Please change the filter & try again</p>}

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '95px' }} >
                            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                        </div>

                    </div>
                </div>




            </section>


        </>
    )
}

export default FilterContent
