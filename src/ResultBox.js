/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const formatDateTime = (date, format) => {
    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일", "월", "화", "수", "목", "금", "토"];

    const zf = (len, str) => {
        if (typeof str === "number") str = str.toString();
        let result = "";
        for (let i = 0; i < len - str.length; i++) {
            result += "0";
        }
        return (result += str);
    };

    if (!format || !date) return "";

    return format.replace(/(YYYY|YY|MM|dd|aaaa|aaa|HH|hh|mm|ss|a\/p)/gi, function (formatstr) {
        switch (formatstr) {
            case "YYYY":
                return date.getFullYear();
            case "YY":
                return zf(2, date.getFullYear() % 1000);
            case "MM":
                return date.getMonth() + 1;
            case "dd":
                return zf(2, date.getDate());
            case "aaa":
                return weekName[date.getDay() + 7];
            case "aaaa":
                return weekName[date.getDay()];
            case "HH":
                return zf(2, date.getHours());
            case "hh":
                return zf(2, date.getHours() % 12 ? date.getHours() % 12 : 12);
            case "mm":
                return zf(2, date.getMinutes());
            case "ss":
                return zf(2, date.getSeconds());
            case "a/p":
                return date.getHours() < 12 ? "오전" : "오후";
            default:
                return formatstr;
        }
    });
};

export default function ResultBox({ className, isOpen, result, goBack }) {
    const variants = {
        open: { scale: 1, y: 0 },
        closed: { scale: 0, y: "50%" },
    };

    const ResultSpan = styled.span`
        font-size: 28px;
        margin-bottom: 8px;
    `;

    const ButtonContainer = styled.div`
        width: 100%;
        padding: 0 60px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    const Button = styled.button`
        padding: 5px 10px;
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
                damping: 10,
                stiffness: 200,

                duration: 2,
            }}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            css={css`
                width: 500px;
                height: 500px;
                border-radius: 80px;
                box-sizing: border-box;
                padding: 10px;

                box-shadow: rgb(235, 235, 235) 0px 0px 0.5rem 0px;

                background-color: rgba(154, 205, 50, 0.4);
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
            `}
            className={className}
        >
            <h2 style={{ fontSize: "14px" }}>{formatDateTime(result.date, "YYYY년 MM월 dd일 (aaa) a/p hh시 mm분 ss초 실행")}</h2>
            <h2 style={{ fontSize: "14px" }}>{result.condition}</h2>
            <h1 style={{ fontSize: "24px" }}>{result.name}</h1>
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {result.result.map((text) => {
                    return <ResultSpan>{text}</ResultSpan>;
                })}
            </div>
            <ButtonContainer>
                <Button onClick={result.retryFunc}>같은 조건으로 다시 뽑기</Button>
                <Button onClick={goBack}>돌아가기</Button>
            </ButtonContainer>
        </motion.div>
    );
}
