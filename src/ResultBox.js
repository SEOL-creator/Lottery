/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import formatDateTime from "./functions/formatDateTime";

export default function ResultBox({ className, isOpen, result, goBack }) {
    const variants = {
        open: { scale: 1 },
        closed: { scale: 0 },
    };

    const ResultSpan = styled.span`
        font-size: 28px;
        margin-bottom: 8px;
    `;

    const ButtonContainer = styled.div`
        width: 100%;
        padding: 0 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const Button = styled.button`
        padding: 6px 12px;
        border-radius: 12px;
        cursor: pointer;
        background: none;
        background-color: orange;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s;
        &:hover {
            background-color: rgba(255, 165, 0, 0.75);
        }
    `;

    return (
        <motion.div
            transition={{
                type: "spring",
                damping: 5,
                stiffness: 200,
                bounce: 0.25,
                mass: 0.25,
                restDelta: 0.001,
            }}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            css={css`
                width: 500px;
                min-height: 500px;
                border-radius: 60px;
                box-sizing: border-box;
                padding: 10px;

                box-shadow: rgb(235, 235, 235) 0px 0px 0.5rem 0px;

                transform-origin: bottom;

                background-color: rgba(154, 205, 50, 0.4);
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
            `}
            className={className}
        >
            <h2 style={{ fontSize: "13px" }}>{formatDateTime(result.date, "YYYY년 MM월 dd일 (aaa) a/p hh시 mm분 ss초 실행")}</h2>
            <h2 style={{ fontSize: "13px" }}>{result.condition}</h2>
            <h1 style={{ fontSize: "24px" }}>{result.name}</h1>
            <div style={{ minHeight: "380px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {result.result.map((text, idx) => {
                    return <ResultSpan key={idx}>{text}</ResultSpan>;
                })}
            </div>
            <ButtonContainer>
                <Button onClick={result.retryFunc}>같은 조건으로 다시 뽑기</Button>
                <Button onClick={goBack}>돌아가기</Button>
            </ButtonContainer>
        </motion.div>
    );
}
