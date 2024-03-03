import React, { memo } from "react";

const ReactQuillComponent = memo(
    ({ long_description, setLongDescription }) => {
        if (typeof window === "undefined") {
            return <p>Loading editor...</p>;
        }

        return (
            <ReactQuill
                theme="snow"
                className="text-black"
                value={long_description}
                onChange={setLongDescription}
            />
        );
    }
);

export default ReactQuillComponent;
