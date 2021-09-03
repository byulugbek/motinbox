import { useEffect, useState } from "react";
import { createPortal } from "react-dom"
import styled from "styled-components";

const BackDrop = styled.div`

    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--white80);
    backdrop-filter: blur(30px);  
`


export default function modalLayer(props) {
 
    const {isModal, setModal, children} = props;

    const [mounted, setMounted] = useState(false)
    
    useEffect(()=> {
        setMounted(true)
        return () => setMounted(false) 
    },[])

    if (!isModal) return null

    return mounted
    ?createPortal(
        <BackDrop>
           {children}
        </BackDrop>
        ,document.getElementById('__modal')
    )
    :null
}
