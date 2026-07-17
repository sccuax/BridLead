import { useState } from 'react'
import Icon from './Components/Icon'

const translations = {
    es: {
        tagline: 'Sincroniza gradientes de Figma\na Webflow con precisión exacta',
        login: 'Iniciar sesión con Figma',
        docs: 'Ver documentación',
        privacy: 'Política de privacidad',
        terms: 'Términos de uso',
        langLabel: 'English',
        langFlag: '🇺🇸',
    },
    en: {
        tagline: 'Sync Figma gradients\nto Webflow with pixel-perfect accuracy',
        login: 'Sign in with Figma',
        docs: 'View documentation',
        privacy: 'Privacy policy',
        terms: 'Terms of use',
        langLabel: 'Español',
        langFlag: '🇨🇴',
    }
}

type Lang = 'es' | 'en'

function App() {
    const [lang, setLang] = useState<Lang>('es')
    const t = translations[lang]

    const handleLogin = () => {
        window.open('https://leadbri.vercel.app/auth/figma', '_blank')
    }

    const handleDocs = () => {
        window.open('https://leadbri.vercel.app/docs', '_blank')
    }

    return (
        <div style={{
            height: '460px',
            fontFamily: 'system-ui, sans-serif',
            background: 'var(--bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px 20px 20px',
            position: 'relative',
        }}>

            {/* Lang switch */}
            <div className='flex w-full justify-end items-center'>
            <button
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="flex items-center gap-3 bg-transparent px-0 py-0 text-xs text-[var(--text-tertiary)] underline cursor-pointer"
                style={{
                    border: 'none',
                    fontSize: 12,
                    lineHeight: '14.6px', letterSpacing: '0.5px', fontWeight: 500,
                }}
                aria-label={`Cambiar idioma a ${t.langLabel}`}
            >
                {t.langLabel} <Icon 
      name={lang === 'es' ? 'english' : 'spanish'} 
      className="" 
    />
            </button>
            </div>

            {/* Logo */}
            <div style={{
                marginTop: 40, marginBottom: 12,
                width: 56, height: 56, borderRadius: 14,
                background: 'linear-gradient(135deg, #468de5, #9f46e5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <svg width="30" height="30" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M6 22L14 6L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 17H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>

            <h1 style={{ fontSize: 20, fontWeight: 500, color: '#1a0a2e', marginBottom: 6 }} className="">
                Leadbri
            </h1>

            <p style={{
                fontSize: 11, color: '#9980b3', textAlign: 'center',
                lineHeight: 1.6, marginBottom: 36, whiteSpace: 'pre-line',
            }}>
                {t.tagline}
            </p>

            {/* Botón login */}
            <button
                onClick={handleLogin}
                style={{
                    width: '100%', padding: '10px 0', borderRadius: 8,
                    border: '1.5px solid #000', background: 'white',
                    color: '#000', fontSize: 12, fontWeight: 500,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 7, marginBottom: 8,
                }}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                </svg>
                {t.login}
            </button>

            {/* Botón docs */}
            <button
                onClick={handleDocs}
                style={{
                    width: '100%', padding: '10px 0', borderRadius: 8,
                    border: '1.5px solid #000', background: 'white',
                    color: '#000', fontSize: 12, fontWeight: 500,
                    cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 7, marginBottom: 20,
                }}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                {t.docs}
            </button>

            <hr style={{ width: '100%', border: 'none', borderTop: '0.5px solid #e2d9f3', marginBottom: 14 }} />

            {/* Legal */}
            <div style={{ display: 'flex', gap: 12 }}>
                <a href="#" style={{ fontSize: 10, color: '#c4b5dc' }}>{t.privacy}</a>
                <a href="#" style={{ fontSize: 10, color: '#c4b5dc' }}>{t.terms}</a>
            </div>

        </div>
    )
}

export default App