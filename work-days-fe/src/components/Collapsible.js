import { useState } from "react";

export const Collapsible = () => {
    const [ open, setOpen ] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    return(
        <div>
            <button onClick={toggle}>toggle</button>
            {open && (
                <div className="toggle">
                    <h4>toggle me</h4>
                </div>
            )}
        </div>
    )
}