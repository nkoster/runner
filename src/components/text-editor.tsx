import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState, useRef } from 'react'
import './text-editor.css'

const TextEditor:React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null)

    const [value, setValue] = useState('# Hi!')
    const [editing, setEditing] = useState(false)

    const updateValue = (value:any) => {
        setValue(value)
    }

    useEffect(() => {
        const listener = (evt:MouseEvent) => {
            if (ref.current && evt.target
                    && ref.current.contains(evt.target as Node)) {
                return
            }
            setEditing(false)
        }
        document.addEventListener('click', listener, { capture: true })
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <div ref={ref}>
                <MDEditor
                    className='text-editor'
                    spellCheck={false}
                    visiableDragbar={true}
                    value={value}
                    onChange={updateValue}
                />
            </div>
        )
    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={value} />
        </div>
    )
}

export default TextEditor
