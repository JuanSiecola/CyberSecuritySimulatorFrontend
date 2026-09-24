// Contenido educativo estático: qué es cada archivo de log y qué
// significan los términos técnicos que aparecen en su contenido.
// Usado por OnboardingModal, GlosarioModal y "man"/"ayuda" en la terminal.
// Textos cortos a propósito: nada de párrafos largos.

export type InfoArchivoLog = {
    archivo: string
    titulo: string
    descripcion: string
}

export const ARCHIVOS_LOG_INFO: InfoArchivoLog[] = [
    { archivo: 'mail.log', titulo: 'mail.log', descripcion: 'Correos que entran: quién manda y si el origen es real.' },
    { archivo: 'auth.log', titulo: 'auth.log', descripcion: 'Inicios de sesión: desde dónde y con qué dispositivo.' },
    { archivo: 'proxy.log', titulo: 'proxy.log', descripcion: 'Sitios que visitan los empleados desde la empresa.' },
    { archivo: 'sandbox.log', titulo: 'sandbox.log', descripcion: 'Análisis de adjuntos en un entorno seguro y aislado.' },
]

export type TerminoGlosario = {
    id: string
    termino: string
    explicacion: string
    dondeAparece: string
}

export const GLOSARIO_TERMINOS: TerminoGlosario[] = [
    { id: 'spf', termino: 'SPF', explicacion: 'Confirma si ese servidor tenía permiso para mandar en nombre del dominio.', dondeAparece: 'mail.log' },
    { id: 'dkim', termino: 'DKIM', explicacion: 'Firma que prueba que el correo no fue alterado en el camino.', dondeAparece: 'mail.log' },
    { id: 'dmarc', termino: 'DMARC', explicacion: 'Define qué pasa cuando SPF o DKIM fallan.', dondeAparece: 'mail.log' },
    { id: 'primer-contacto', termino: 'Primer contacto', explicacion: 'Primera vez que ese remitente le escribe a la empresa.', dondeAparece: 'mail.log' },
    { id: 'dominio-nuevo', termino: 'Dominio recién creado', explicacion: 'Registrado hace pocos días: señal clásica de phishing.', dondeAparece: 'proxy.log' },
    { id: 'certificado', termino: 'Certificado', explicacion: 'Sin certificado válido, un sitio es más fácil de falsificar.', dondeAparece: 'proxy.log' },
    { id: 'categoria', termino: 'Categoría del sitio', explicacion: 'Cómo clasifica el proxy cada página (phishing, fraude, etc).', dondeAparece: 'proxy.log' },
    { id: 'ip-origen', termino: 'IP / ubicación', explicacion: 'De dónde vino realmente la conexión.', dondeAparece: 'auth.log, mail.log, proxy.log' },
    { id: 'dispositivo-nuevo', termino: 'Dispositivo nuevo', explicacion: 'Nunca se usó antes con ese usuario.', dondeAparece: 'auth.log' },
    { id: 'mfa', termino: 'MFA', explicacion: 'Segundo paso de verificación además de la contraseña.', dondeAparece: 'auth.log' },
    { id: 'extension-doble', termino: 'Extensión doble', explicacion: 'Ej: Factura.pdf.exe. Parece documento, es un ejecutable.', dondeAparece: 'sandbox.log' },
    { id: 'macro', termino: 'Macro', explicacion: 'Mini programa que corre solo con abrir el archivo.', dondeAparece: 'sandbox.log' },
    { id: 'veredicto', termino: 'Veredicto sandbox', explicacion: 'Resultado de abrir el archivo en un entorno aislado.', dondeAparece: 'sandbox.log' },
]

export function buscarEnGlosario(consulta: string): TerminoGlosario[] {
    const q = consulta.trim().toLowerCase()
    if (!q) return []
    return GLOSARIO_TERMINOS.filter(
        (t) => t.id.includes(q) || t.termino.toLowerCase().includes(q) || t.explicacion.toLowerCase().includes(q)
    )
}
