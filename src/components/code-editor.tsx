import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { useRef } from 'react'

interface CodeEditorProps {
    initialValue?: string
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue = '', onChange }) => {
    const editorRef = useRef<any>()

    const change = () => {
        onChange(editorRef.current.getValue())
    }

    const handleEditorDidMount:OnMount =(editor) => {
        editorRef.current = editor; 
    }

    return <MonacoEditor
        onChange={change}
        onMount={handleEditorDidMount}
        value={initialValue}
        height='500px'
        language='javascript'
        theme='vs-dark'
        options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 20,
            scrollBeyondLastLine: false,
            automaticLayout: true
        }}
    />
}

export default CodeEditor
