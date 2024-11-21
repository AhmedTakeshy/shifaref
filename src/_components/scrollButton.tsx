"use client"
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { FaArrowUpLong } from 'react-icons/fa6'

export default function ScrollButton() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true)
            } else {
                setShow(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <Button
            className={`fixed bottom-4 right-4 group bg-dark-green-20 border border-dark-green-15 hover:bg-dark-green-15 transition-transform duration-500 rounded-full ${show ? "translate-x-0" : "translate-x-14"}`}
            size={"icon"}
            onClick={scrollToTop}>
            <FaArrowUpLong className="group-hover:text-light-green-70 text-white transition-colors duration-300" />
        </Button>
    )
}
