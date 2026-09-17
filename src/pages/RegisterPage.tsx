import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'

export default function RegisterPage() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { registrarse, error, cargando } = useAuth()

    return (
        <AuthForm
            titulo="Crear cuenta"
            textoBoton="Registrarme"
            error={error}
            cargando={cargando}
            onSubmit={() => registrarse(nombre, email, password)}
            campos={[
                { label: 'Nombre', type: 'text', value: nombre, onChange: setNombre },
                { label: 'Email', type: 'email', value: email, onChange: setEmail },
                { label: 'Contraseña', type: 'password', value: password, onChange: setPassword, minLength: 6 },
            ]}
            footer={
                <p className="text-sm text-slate-400 text-center">
                    ¿Ya tenés cuenta? <Link to="/login" className="text-emerald-400 hover:underline">Iniciá sesión</Link>
                </p>
            }
        />
    )
}