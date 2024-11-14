import React, { useEffect } from 'react'

const HandleScroll = () => {
    useEffect(() => {
    document.body.style.overflow = "hidden"; //Hide scrollbar
    
    return () => {
      document.body.style.overflow = "" // Clean up on unmount
    };
  }, []);
}

export default HandleScroll;
