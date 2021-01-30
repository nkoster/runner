import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'
import CodeEditor from './components/code-editor'

const App = () => {

    const ref = useRef<any>()
    const iframe = useRef<any>()

    const [input, setInput] = useState('')

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
        iframe.current.srcdoc = html
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
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    }

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', evt => {
                        try {
                            eval(evt.data)
                        } catch(err) {
                            const root = document.querySelector('#root')
                            root.innerHTML = '<div style="color:red"><h4>Runner Error</h4>&nbsp;' + err + '</div>'
                            throw err
                        }
                    }, false)
                </script>
            </body>
        </html>
    `
    return (
        <div>
            <CodeEditor
                initialValue=''
                onChange={setInput}
            />
            <textarea
                spellCheck={false}
                value={input}
                onChange={evt => { 
                    // onClick(evt.target.value)
                    setInput(evt.target.value)
                }}
            ></textarea>
            <div>
                <button onClick={onClick}>transpile</button>
            </div>
            <iframe
                ref={iframe}
                title='runner'
                sandbox='allow-scripts'
                srcDoc={html}
            ></iframe>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
