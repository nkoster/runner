import { useEffect, useRef } from 'react'

interface PreviewProps {
    code: string
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>()
    useEffect(() => {
        iframe.current.srcdoc = html
        iframe.current.contentWindow.postMessage(code, '*')
    }, [code])
    return <iframe
        ref={iframe}
        title='runner'
        sandbox='allow-scripts'
        srcDoc={html}
    />
}

export default Preview
