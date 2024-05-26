import React from 'react'

type Props = {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
}

const ModelMaker = ({children,onClose, isOpen}: Props) => {
  return (
    <div onClick={onClose} className='
        h-[100%] w-[100%] flex justify-center
         items-center content-center
            absolute z-10' style={{display:`${isOpen ? `flex` : 'none'}`}}>
        {children}
    </div>
  )
}

export default ModelMaker