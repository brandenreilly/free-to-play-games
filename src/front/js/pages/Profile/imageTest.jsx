import React, { useState, useEffect } from 'react';

const PhotoDisplay = ({ props }) => {
    const [userData, setUserData] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [imageIndex, setImageIndex] = useState(null)
    const backend = process.env.BACKEND_URL

    useEffect(() => {
        setUserData(props.userData)
        setImageList(props.imageList)
    }, [])

    useEffect(() => {
        if (userData != null) {
            console.log(userData.user.profile_pic)
            if (imageList != null) {
                console.log(imageList[userData.user.profile_pic].default)
            }
        }
    }, [userData])

    useEffect(() => {
        if (imageList != null) {
            console.log(imageList[0].default)
        }
    }, [imageList])

    function handleSetter(num) {
        setImageIndex(num)
        console.log(imageIndex)
    }


    return (
        <>
            {userData != null && imageList != null && <img className='w-50 h-50' src={imageList[userData.user.profile_pic].default} alt={`image-${imageList[0].default}`} />}
        </>
    );
};

export default PhotoDisplay;