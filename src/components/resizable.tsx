import './resizable.css'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
    direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps:ResizableBoxProps
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width: window.innerWidth * 0.9,
            resizeHandles: ['e'],
            minConstraints: [window.innerWidth - (window.innerWidth * 0.9), Infinity],
            maxConstraints: [window.innerWidth * 0.9, Infinity]        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, window.innerHeight - (window.innerHeight * 0.9)],
            maxConstraints: [Infinity, window.innerHeight * 0.9]
        }        
    }
    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    )
}

export default Resizable
