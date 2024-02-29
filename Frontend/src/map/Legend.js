import React from "react";

const Legend = ({legendItems}) => {
    console.log(legendItems);
    return(
        <div
            style = {{
                display: "inline-block",
            }}
        >
            {legendItems.map((item) =>(
                <div key={item.title}
                    style = {{
                        backgroundColor: item.color,
                        flex: 1,
                        // display: "flex",
                        alignItems: "center",
                        color: item.textColor,
                    }}
                >
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
}

export default Legend;