import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'
import CodeEditor from './components/code-editor'
import Preview from './components/preview'

const App = () => {

    const ref = useRef<any>()

    const [input, setInput] = useState('')
    const [code, setCode] = useState('')

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.34/esbuild.wasm'
        })
    }

    useEffect(() => {
        startService()
    }, [])

    const onClick = async () => {
        if (!ref.current) return
        /* Reset the iframe, first */
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        })
        setCode(result.outputFiles[0].text)
    }

    return (
        <div>
            <CodeEditor
                initialValue=''
                onChange={setInput}
            />
            <div>
                <button onClick={onClick}>transpile</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
