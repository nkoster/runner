import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    useEffect(() => {
        const listener = () => {
            setInnerWidth(window.innerWidth)
            setInnerHeight(window.innerHeight)
        }
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }
    ,[])
    let resizableProps:ResizableBoxProps
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width: innerWidth * 0.9,
            resizeHandles: ['e'],
            minConstraints: [innerWidth - (innerWidth * 0.9), Infinity],
            maxConstraints: [innerWidth * 0.9, Infinity]        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, innerHeight - (innerHeight * 0.9)],
            maxConstraints: [Infinity, innerHeight * 0.9]
        }        
    }
    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}

export default Resizable
