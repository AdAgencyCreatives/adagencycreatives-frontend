import React, { useState } from 'react';
import { IoArrowUpCircleSharp } from "react-icons/io5";
import { Button } from '../styles/Styles';

const ScrollButton = (scrolledLimit = 300) => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > scrolledLimit) {
            setVisible(true)
        }
        else if (scrolled <= scrolledLimit) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour 
                in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button className="scroll-button">
            <span className="scroll-button-span"
                style={{ display: visible ? 'block' : 'none' }}></span>
            <IoArrowUpCircleSharp onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} />
        </Button>
    );
}

export default ScrollButton; 
