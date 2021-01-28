import MonacoEditor from '@monaco-editor/react'

const CodeEditor = () => {
    return <MonacoEditor
        height='500px'
        language='javascript'
        theme='vs-dark'
    />
}

export default CodeEditor