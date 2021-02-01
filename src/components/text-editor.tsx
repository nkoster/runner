import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'

const TextEditor:React.FC = () => {
    const [value, setValue] = useState('aap')
    const updateValue = (value:any) => {
        setValue(value)
    }
    return (
        <div>
            <MDEditor
                value={value}
                onChange={updateValue}
            />
            <MDEditor.Markdown source={value} />
        </div>
    )
}

export default TextEditor
