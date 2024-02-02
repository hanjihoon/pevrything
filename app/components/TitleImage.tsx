'use client'

import { ReactEventHandler } from "react"

type ImgProps ={
    imgName: string
    breed_kr: string
    dog_code: string
}

export default function TitleImage(imgProps: ImgProps): React.ReactElement {
    const {imgName, breed_kr, dog_code} = imgProps
    

    return(
        <img src={imgName} alt={breed_kr} id={dog_code} width="80" />
    )
}