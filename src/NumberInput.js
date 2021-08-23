/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
            padding: 0 5px;
            height: 44px;
            cursor: pointer;
            border: 2px solid rgba(0, 0, 0, 0.2);
            background: none;
        }

        & button.up {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border-left: none;
        }
        & button.down {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border-right: none;
        }

        & svg {
            width: 18px;
        }

        & input[type="number"] {
            width: 60px;
            height: 44px;
            box-sizing: border-box;
            font-size: 20px;
            border: 2px solid rgba(0, 0, 0, 0.2);
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
                <svg viewBox="0 -256 1792 1792" version="1.1">
                    <g>
                        <path
                            d="m 1611,320 q 0,-53 -37,-90 l -75,-75 q -38,-38 -91,-38 -54,0 -90,38 L 832,640 346,155 q -36,-38 -90,-38 -54,0 -90,38 l -75,75 q -38,36 -38,90 0,53 38,91 l 651,651 q 37,37 90,37 52,0 91,-37 l 650,-651 q 38,-38 38,-91 z"
                            style={{ fill: "currentColor" }}
                        />
                    </g>
                </svg>
            </button>
            <input id={name} type="number" name={name} value={value[name]} onChange={handleOnChange} />
            <button
                className="up"
                onClick={() => {
                    setValue(name, value[name] + 1);
                }}
            >
                <svg viewBox="0 -256 1792 1792" version="1.1">
                    <g transform="matrix(1,0,0,-1,68.338983,1217.0847)">
                        <path
                            d="m 1611,320 q 0,-53 -37,-90 l -75,-75 q -38,-38 -91,-38 -54,0 -90,38 L 832,640 346,155 q -36,-38 -90,-38 -54,0 -90,38 l -75,75 q -38,36 -38,90 0,53 38,91 l 651,651 q 37,37 90,37 52,0 91,-37 l 650,-651 q 38,-38 38,-91 z"
                            style={{ fill: "currentColor" }}
                        />
                    </g>
                </svg>
            </button>
        </div>
    );
}
