import * as d3 from "d3";

// Computes summary statistics from an array of numbers for boxplot visualization
export const getSummaryStats = (data) => {
    // Sort the data in ascending order
    const sortedData = data.sort((a, b) => a - b);

    // Calculate the first quartile (Q1), median, and third quartile (Q3)
    const q1 = d3.quantile(sortedData, 0.25);
    const median = d3.quantile(sortedData, 0.5);
    const q3 = d3.quantile(sortedData, 0.75);

    // Check for valid calculations before proceeding
    if (!q3 || !q1 || !median) {
        return;
    }

    // Calculate the interquartile range and the "min" and "max" fence values
    const interQuantileRange = q3 - q1;
    const min = q1 - 1.5 * interQuantileRange;
    const max = q3 + 1.5 * interQuantileRange;

    return { min, q1, median, q3, max };
}
