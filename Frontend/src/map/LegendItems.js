import LegendItem from "./LegendItem";

const legendItems = [
    new LegendItem(
        "<10%",
        "#accbff",
        (cases) => cases < 10,
        "black"
    ),
    new LegendItem(
        "10%~20%%",
        "#92bbff",
        (cases) => cases >= 10 && cases < 20,
        0.3,
        "black"
    ),
    new LegendItem(
        "20%~30%",
        "#78aaff",
        (cases) => cases >= 20 && cases < 30,
        "black"
    ),
    new LegendItem(
        "30%~40%",
        "#649eff",
        (cases) => cases >= 30 && cases < 40,
        "black"
    ),
    new LegendItem(
        ">40%",
        "#4188ff",
        (cases) => cases >= 40,
    )
];

export default legendItems;

