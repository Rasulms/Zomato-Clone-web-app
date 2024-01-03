import React from 'react'
// import Button from 'react-bootstrap/Button'


import { useParams } from 'react-router-dom'
import FilterHead from './Components/FilterHead'
import FilterContent from './Components/FilterContent'



const FilterPage = () => {
    const { mealType_id } = useParams()
    // console.log('filterpage mealtype id chk 1', mealType_id);
    return (
        <>
            <FilterHead />
            <FilterContent mealType_id={mealType_id} />

        </>
    )
}

export default FilterPage
