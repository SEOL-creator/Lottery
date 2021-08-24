/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { ReactComponent as ChevronUp } from "./assets/chevron-up.svg";
import { ReactComponent as ChevronDown } from "./assets/chevron-down.svg";

export default function NumberInput({ name, value, handleOnChange, setValue }) {
    const inputStyle = css`
        display: flex;
        align-items: center;
        justify-content: center;

        & button {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 4px;
            height: 30px;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.3);
            background: none;
            border-radius: 12px;
        }

        & button.up {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none;
        }
        & button.down {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
        }

        & svg {
            width: 12px;
            margin: 0 4px;
        }

        & input[type="number"] {
            width: 50px;
            height: 30px;
            box-sizing: border-box;
            font-size: 18px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        & input[type="number"]:focus {
            border-color: orange;
        }

        & input[type="number"]::-webkit-inner-spin-button,
        & input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
        }
    `;

    return (
        <div css={inputStyle}>
            <button
                className="down"
                onClick={() => {
                    setValue(name, value[name] - 1);
                }}
            >
                <ChevronDown />
            </button>
            <input id={name} type="number" name={name} value={value[name]} onChange={handleOnChange} />
            <button
                className="up"
                onClick={() => {
                    setValue(name, value[name] + 1);
                }}
            >
                <ChevronUp />
            </button>
        </div>
    );
}
