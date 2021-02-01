import './preview.css'
import { useEffect, useRef } from 'react'

interface PreviewProps {
    code: string,
    err: string
}

const html = `
<html>
    <head>
        <style>
            html { background-color: white; }
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const handleError = err => {
                const root = document.querySelector('#root')
                root.innerHTML = '<div style="color:red"><h4>Runner Error</h4>&nbsp;' + err + '</div>'
                throw err
            }
            window.addEventListener('error', evt => {
                evt.preventDefault()
                handleError(evt.error)
            }, false)
            window.addEventListener('message', evt => {
                try {
                    eval(evt.data)
                } catch(err) {
                    handleError(err)
                }
            }, false)
        </script>
    </body>
</html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
    const iframe = useRef<any>()
    useEffect(() => {
        iframe.current.srcdoc = html
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*')
        }, 100)
    }, [code])
    return (
        <div className='preview-wrapper'>
            <iframe
                ref={iframe}
                title='runner'
                sandbox='allow-scripts'
                srcDoc={html}
            />
            {err && <div className='preview-error' >{err}</div>}
        </div>
    )
}

export default Preview
