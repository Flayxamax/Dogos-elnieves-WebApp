export function validateSessionAndRol(paginaRequerida, rolRequerido = null) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('No estás autenticado. Redirigiendo al login...');
        window.location.href = '/DogosFrontend/Login/Login.html';
        return;
    }

    // Decodificar el token para obtener el rol
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const rol = payload.role;

    if (rolRequerido && rol !== rolRequerido) {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = paginaRequerida;
        return;
    }

    console.log('Sesión activa y rol autorizado.');
}