import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: any }) {
        // Custom app enhancement logic if needed
        if (typeof document !== 'undefined') {
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement
                const mermaidDiv = target.closest('.mermaid')
                if (mermaidDiv) {
                    mermaidDiv.classList.toggle('fullscreen')
                    if (mermaidDiv.classList.contains('fullscreen')) {
                        document.body.style.overflow = 'hidden'
                    } else {
                        document.body.style.overflow = ''
                    }
                }
            })
        }
    }
}
