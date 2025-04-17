// Constantes de tema para usar en JavaScript/TypeScript
export const COLORS = {
    brand: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b", // Color principal
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
    // Puedes añadir más colores aquí
  }
  
  // Función de ayuda para obtener un color específico
  export function getBrandColor(shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 = 500): string {
    return COLORS.brand[shade]
  }  