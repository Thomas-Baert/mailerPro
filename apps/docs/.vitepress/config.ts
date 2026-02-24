import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
    defineConfig({
        title: "MailerPro Docs",
        description: "Documentation technique du projet MailerPro",
        base: '/mailerpro/docs/',
        themeConfig: {
            logo: '/logo.svg',
            nav: [
                { text: 'Accueil', link: '/' },
                { text: 'Guide', link: '/guide/' },
                { text: 'API', link: '/api/' }
            ],
            sidebar: [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'Architecture Globale', link: '/guide/architecture' },
                        { text: 'Installation', link: '/guide/installation' }
                    ]
                },
                {
                    text: 'Authentification',
                    items: [
                        { text: 'Flux JWT', link: '/guide/auth-flow' },
                        { text: 'Sécurité', link: '/guide/security' }
                    ]
                }
            ],
            socialLinks: [
                { icon: 'github', link: 'https://github.com/Thomas-Baert/mailerPro' }
            ]
        }
    })
)
