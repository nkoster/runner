import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth * .75)
    useEffect(() => {
        /* Debounce, to limit updates during window resizing */
        let timer: any
        const listener = () => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth)
                setInnerHeight(window.innerHeight)
                if (window.innerWidth * .75 < width) {
                    setWidth(window.innerWidth * .75)
                }
            }, 100)
        }
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }
    ,[width])
    let resizableProps:ResizableBoxProps
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width,
            resizeHandles: ['e'],
            minConstraints: [innerWidth - (innerWidth * 0.9), Infinity],
            maxConstraints: [innerWidth * 0.9, Infinity],
            onResizeStop: (evt, data) => {
                setWidth(data.size.width)
            }
        }
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
