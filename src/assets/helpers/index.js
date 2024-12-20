//Generar un ID único
export const generateId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//Otra para IDs únicos 
export const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

//Formatear números como moneda
export const formatCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

//Otra para formatear números como moneda
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
};

//Capitalizar texto - Capitaliza la primera letra de una cadena
export const capitalizeText = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

//Validar un email - Verifica si una cadena es un correo electrónico válido.
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Ordenar un arreglo de objetos - Ordena un arreglo de objetos por una clave específica.
export const sortArrayByKey = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

//Debounce Function (Evitar múltiples invocaciones) - Evita ejecutar una función repetidamente en un corto período de tiempo.
export const debounce = (func, delay = 300) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

//Throttle Function (Controlar la frecuencia de ejecución) - Limita la ejecución de una función a una vez cada cierto tiempo.
export const throttle = (func, limit = 300) => {
    let lastFunc;
    let lastRan;
    return (...args) => {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

//Filter Function (Filtrar un arreglo por búsqueda) - Filtra un arreglo de objetos con base en un término de búsqueda.
export const filterBySearch = (array, key, searchTerm) => {
    return array.filter((item) => 
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
};

//Obtener la diferencia de fechas en días - Calcula el número de días entre dos fechas.
export const getDateDifferenceInDays = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

//Almacenar y recuperar datos en localStorage - Facilita el uso de `localStorage`.
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

//Verificar si un valor está vacío - Comprueba si un valor es `null`, `undefined`, vacío o tiene longitud cero.
export const isEmpty = (value) => {
    return (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim().length === 0) ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === 'object' && Object.keys(value).length === 0)
    );
};

//Generar un color aleatorio - Devuelve un código de color hexadecimal aleatorio.
export const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

//Deep Clone (Clonar objetos profundamente) - Realiza una copia profunda de un objeto.
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

//Formatear fechas - Convierte una fecha a un formato amigable.
export const formatDate = (date, locale = 'es-ES', options = {}) => {
    const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options });
};

//Otro para Formatear fechas
export const formatFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}

//Obtener el valor de una consulta en la URL - Extrae parámetros de consulta (`query parameters`) de una URL.
export const getQueryParam = (key) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
};

//Convertir texto a `slug` (URL amigable) - Convierte una cadena de texto a un formato amigable para URLs.
export const toSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-');
};

//Detectar si es un dispositivo móvil - Comprueba si el usuario está utilizando un dispositivo móvil.
export const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};


//Generar un rango de números - Crea un rango de números como un arreglo, útil para paginación o listas.
export const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

//Descargar un archivo - Permite descargar un archivo desde una URL.
export const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


//Convertir a camelCase - Transforma una cadena a formato camelCase.
export const toCamelCase = (text) => {
    return text
        .toLowerCase()
        .replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};


//Eliminar duplicados en un arreglo -Elimina elementos duplicados en un arreglo.
export const removeDuplicates = (array) => {
    return [...new Set(array)];
};


//Combinar clases dinámicamente - Útil para manejar clases dinámicas en React sin tener múltiples condiciones en `className`.
export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

//Ejemplo de uso:
//<div className={classNames('base-class', isActive && 'active-class')} />

//Agrupar elementos por una clave - Agrupa elementos de un arreglo en un objeto basado en una propiedad.
export const groupBy = (array, key) => {
    return array.reduce((acc, item) => {
        (acc[item[key]] = acc[item[key]] || []).push(item);
        return acc;
    }, {});
};

//Obtener el tamaño del viewport - Devuelve el tamaño actual del viewport.
export const getViewportSize = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
};

//Convertir una cadena de texto a formato de título - Convierte una cadena a formato de título (todas las palabras empiezan con mayúscula).
export const toTitleCase = (text) => {
    return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

//Validar un número de teléfono - Verifica si una cadena es un número de teléfono válido.
export const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basado en el formato E.164
    return phoneRegex.test(phone);
};

//Copiar texto al portapapeles - Permite copiar texto al portapapeles.
export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => console.log('Texto copiado al portapapeles'))
        .catch((err) => console.error('Error al copiar texto:', err));
};

///Redondear un número a n decimales - Redondea un número a un número específico de decimales.
export const roundToDecimal = (num, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
};

//Desactivar el scroll - Desactiva el desplazamiento de la página, útil para modales.
export const disableScroll = () => {
    document.body.style.overflow = 'hidden';
};

export const enableScroll = () => {
    document.body.style.overflow = '';
};

//Formato amigable para la diferencia de tiempo - Devuelve una cadena amigable para la diferencia entre fechas (por ejemplo, "hace 5 minutos").
export const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.abs(now - new Date(date));
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} día${days > 1 ? 's' : ''} atrás`;
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    return `${seconds} segundo${seconds > 1 ? 's' : ''} atrás`;
};
