import LegendItem from "./LegendItem";

const legendItems = [
    new LegendItem(
        "<10%",
        "#caf0f8",
        (cases) => cases < 10,
        "black"
    ),
    new LegendItem(
        "10%~20%%",
        "#90e0ef",
        (cases) => cases >= 10 && cases < 20,
        0.3,
        "black"
    ),
    new LegendItem(
        "20%~30%",
        "#00b4d8",
        (cases) => cases >= 20 && cases < 30,
        "black"
    ),
    new LegendItem(
        "30%~40%",
        "#0077b6",
        (cases) => cases >= 30 && cases < 40
    ),
    new LegendItem(
        ">40%",
        "#03045e",
        (cases) => cases >= 40,
    )
];

export default legendItems;

