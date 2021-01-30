import './code-editor.css'
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { useRef } from 'react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
    initialValue?: string
    onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue = '', onChange }) => {
    const editorRef = useRef<any>()

    const change = () => {
        onChange(editorRef.current.getValue())
    }

    const handleEditorDidMount:OnMount = (editor) => {
        editorRef.current = editor
        editor.getModel()?.updateOptions({ tabSize: 2 })
    }

    const formatCode = () => {
        const unformatted = editorRef.current.getValue()
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: false,
            singleQuote: true
        })
        editorRef.current.setValue(formatted)
    }

    return (
        <div className='editor-wrapper'>
            <button
                className='button button-format is-primary is-small'
                onClick={formatCode}
            >Format</button>
            <MonacoEditor
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
        </div>
    )
    
}

export default CodeEditor
