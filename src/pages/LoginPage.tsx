import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { iniciarSesion, error, cargando } = useAuth()

    return (
        <AuthForm
            titulo="Iniciar sesión"
            textoBoton="Ingresar"
            error={error}
            cargando={cargando}
            onSubmit={() => iniciarSesion(email, password)}
            campos={[
                { label: 'Email', type: 'email', value: email, onChange: setEmail },
                { label: 'Contraseña', type: 'password', value: password, onChange: setPassword },
            ]}
            footer={
                <p className="text-sm text-slate-400 text-center">
                    ¿No tenés cuenta? <Link to="/registro" className="text-emerald-400 hover:underline">Registrate</Link>
                </p>
            }
        />
    )
}