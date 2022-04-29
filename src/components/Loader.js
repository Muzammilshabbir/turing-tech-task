import React from 'react'
import './loader.css'
import { useDispatch, useSelector } from 'react-redux'
import {Spinner} from 'react-bootstrap'

export default function Loader() {


    const loading = useSelector(state => state.loader.loading)

    if (!loading) return null;

    return (
        <div className='loader' />
    )
}
