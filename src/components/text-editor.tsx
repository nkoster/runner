import MDEditor from '@uiw/react-md-editor'
import { useEffect, useState } from 'react'

const TextEditor:React.FC = () => {

    const [value, setValue] = useState('# Hi!')
    const [editing, setEditing] = useState(false)

    const updateValue = (value:any) => {
        setValue(value)
    }

    useEffect(() => {
        const listener = () => {
            setEditing(false)
        }
        document.addEventListener('click', listener, { capture: true })
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <MDEditor
                value={value}
                onChange={updateValue}
            />
        )
    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={value} />
        </div>
    )
}

export default TextEditor
