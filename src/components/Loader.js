import React from 'react'
import './loader.css'
import { useSelector } from 'react-redux'

export default function Loader() {


    const loading = useSelector(state => state.loader.loading)

    if (!loading) return null;

    return (
        <div className='loader' />
    )
}
