export const getYearsOfExperience = (): number => {
    const startDate = new Date(2023, 7); // Marzo (mes 2)
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();

    const isBeforeAnniversary =
        now.getMonth() < startDate.getMonth() ||
        (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate());

    if (isBeforeAnniversary) {
        years--;
    }

    return years;
};
