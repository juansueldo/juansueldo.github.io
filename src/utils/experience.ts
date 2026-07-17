export const getYearsOfExperience = (): string => {
    const startDate = new Date(2023, 7, 1); // 1 de agosto de 2023
    const now = new Date();

    let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

    // Si todavía no llegó al día de inicio del mes, no se cumplió el mes completo
    if (now.getDate() < startDate.getDate()) {
        totalMonths--;
    }

    if (totalMonths < 0) {
        return '0';
    }

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    // Desde 11 meses se muestra el siguiente año
    if (remainingMonths === 11) {
        return String(years + 1);
    }

    // Entre 5 y 10 meses se agrega "+"
    if (remainingMonths >= 5) {
        return `${years}+`;
    }

    // Entre 0 y 4 meses se muestran los años completos
    return String(years);
};
