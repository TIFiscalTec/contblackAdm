export function LimitValue(value, min = 0, max = 100) {
    if (value === "" || value === null || value === undefined) return "";

    const numericValue = Number(value);

    if (isNaN(numericValue)) return "";

    if (numericValue < min) return min;
    if (numericValue > max) return max;

    return numericValue;
}
