import React from 'react'
import HomePage from '../HomePage'
import { Route, Routes } from 'react-router-dom'
import FilterPage from '../FilterPage'
import DetailsPage from '../DetailsPage'
import PageNotFound from '../404'

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='filter/:mealType_id' element={<FilterPage />} />
            <Route path='details/:hotel_id' element={<DetailsPage />} />
            <Route path='failed' element={<PageNotFound />} />


            {/* <Route path='/details' element={<NewPost />} /> */}
            {/* <Route path='/post' element={<PostLayout />} >
                     <Route index element={<PostPage />} />
                     <Route path=':id' element={<Post />} />
                     <Route path='newpost' element={<NewPost />} />
                 </Route> */}
            {/* <Route path='*' element={<Missing />} /> */}
        </Routes>
    )

}

export default PageRoutes
