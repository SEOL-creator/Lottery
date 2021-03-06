/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import getRandomInt from "./functions/getRandomInt";

import { Tab, TabContent, TabHeader, TabHeaderItem } from "./Tab";
import "./App.css";
import NumberInput from "./NumberInput";
import ResultBox from "./ResultBox";

export default function App() {
    const closed = css`
        height: 0;
        padding: 0;
    `;

    const formStyle = css`
        width: 100%;
        height: 354px;
        padding: 20px 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;

        position: relative;

        & strong {
            font-size: 18px;
            font-weight: 500;
        }

        & > label {
            width: 390px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
    `;

    const [isClosed, setIsClosed] = useState(false);
    const [isDisplayNone, setIsDisplayNone] = useState(false);
    const [displayResult, setDisplayResult] = useState(false);

    const [validatorState, setValidatorState] = useState({ valid: true });
    const [pickPostValue, setPickPostValue] = useState({ panzeeNum: 1, pageNum: 1, postNum: 15, lastPostNum: 15 });
    const [pickNumValue, setPickNumValue] = useState({ startNum: 1, endNum: 100, numCount: 1 });

    const [result, setResult] = useState({ name: "", condition: "", date: new Date(), result: [], retryFunc: () => {} });

    // handle input change for post picker
    const handlePostChange = (e) => {
        setPickPostValue((prev) => {
            setValidatorState({ valid: true });
            if (e.target.value < 0) return prev;
            let newObj = { ...prev };
            newObj[e.target.name] = e.target.value * 1;
            return newObj;
        });
    };
    // set input value for up, down button, ,
    const setPostValue = (name, value) => {
        setPickPostValue((prev) => {
            setValidatorState({ valid: true });
            if (value < 0) return prev;
            let newObj = { ...prev };
            newObj[name] = value;
            return newObj;
        });
    };

    // handle input change for number picker
    const handleNumChange = (e) => {
        setPickNumValue((prev) => {
            setValidatorState({ valid: true });
            if (e.target.value < 0) return prev;
            let newObj = { ...prev };
            newObj[e.target.name] = e.target.value * 1;
            return newObj;
        });
    };
    // set input value for up, down button, ,
    const setNumValue = (name, value) => {
        setPickNumValue((prev) => {
            setValidatorState({ valid: true });
            if (value < 0) return prev;
            let newObj = { ...prev };
            newObj[name] = value;
            return newObj;
        });
    };

    // Pick Posts
    function validatePostPicker(obj) {
        if (obj.panzeeNum <= 0 || obj.pageNum <= 0 || obj.postNum <= 0 || obj.lastPostNum <= 0) {
            setValidatorState({ valid: false, message: "0이 될 수 없습니다." });
            return false;
        }
        if (obj.panzeeNum > obj.pageNum * obj.postNum) {
            setValidatorState({ valid: false, message: "게시글 수보다 더 많이 뽑을 수 없습니다." });
            return false;
        }
        if (obj.lastPostNum > obj.postNum) {
            setValidatorState({ valid: false, message: "마지막 페이지 글이 한 페이지당 글보다 많아요" });
            return false;
        }
        setValidatorState({ valid: true });
        return true;
    }

    function formatPostPickResult(winners) {
        let resultArr = [];
        for (let winner of winners) {
            winner = JSON.parse(winner);
            resultArr.push(`${winner[0]}페이지 ${winner[1]}번째 게시글!`);
        }
        return resultArr;
    }

    function postPick(obj) {
        if (!validatePostPicker(obj)) return false;

        const winners = new Set();
        while (winners.size < obj.panzeeNum) {
            const postNum = getRandomInt(1, obj.postNum);
            const pageNum = getRandomInt(1, obj.pageNum);
            if (pageNum !== obj.pageNum) {
                winners.add(JSON.stringify([pageNum, postNum]));
            } else if (postNum <= obj.lastPostNum) {
                winners.add(JSON.stringify([pageNum, postNum]));
            }
        }
        setResult({
            name: "게시글 추첨 결과",
            condition: `총 ${obj.pageNum}페이지 중 ${obj.panzeeNum}개 게시글 추첨. 페이지당 게시글 ${obj.postNum}개, 마지막 페이지 ${obj.lastPostNum}개 게시글`,
            date: new Date(),
            result: formatPostPickResult(winners),
            retryFunc: () => {
                postPick(obj);
            },
        });
        return true;
    }

    // Pick Nums
    function validateNumPicker(obj) {
        if (obj.startNum <= 0 || obj.endNum <= 0 || obj.numCount <= 0) {
            setValidatorState({ valid: false, message: "0이 될 수 없습니다." });
            return false;
        }
        if (obj.endNum - obj.startNum < 0) {
            setValidatorState({ valid: false, message: "시작 숫자는 끝 숫자보다 클 수 없습니다." });
            return false;
        }
        if (obj.numCount > obj.endNum - obj.startNum + 1) {
            setValidatorState({ valid: false, message: "범위 이상으로 숫자를 뽑을 수 없습니다." });
            return false;
        }
        setValidatorState({ valid: true });
        return true;
    }

    function formatNumPickResult(winners) {
        let resultArr = [];
        for (let number of Array.from(winners)) {
            resultArr.push(`${number}번`);
        }
        return resultArr;
    }

    function numPick(obj) {
        if (!validateNumPicker(obj)) return false;

        const winners = new Set();
        while (winners.size < obj.numCount) {
            winners.add(getRandomInt(obj.startNum, obj.endNum));
        }
        setResult({
            name: "숫자 뽑기 결과",
            condition: `${obj.startNum} 이상 ${obj.endNum} 이하 범위에서 숫자 ${obj.numCount}개 추첨`,
            date: new Date(),
            result: formatNumPickResult(winners),
            retryFunc: () => {
                numPick(obj);
            },
        });
        return true;
    }

    // Show Result
    function gotoResult() {
        setIsClosed(true);
        // display result after closing animation of control box
        setTimeout(() => {
            setIsDisplayNone(true);
            setDisplayResult(true);
        }, 800);
    }

    // Hide result and go to main
    function gotoControl() {
        setDisplayResult(false);
        setIsDisplayNone(false);
        setIsClosed(false);
    }

    return (
        <>
            <div css={[isClosed && closed, isDisplayNone && { display: "none" }]} className="control-wrap">
                <Tab>
                    <TabHeader>
                        <TabHeaderItem index={0}>게시글 뽑기</TabHeaderItem>
                        <TabHeaderItem index={1}>숫자 뽑기</TabHeaderItem>
                    </TabHeader>
                    <TabContent index={0}>
                        <div css={formStyle}>
                            <label htmlFor="panzeeNum">
                                <span>
                                    <strong>몇 명</strong>의 팬치를 잡아올까요?
                                </span>
                                <NumberInput name="panzeeNum" value={pickPostValue} handleOnChange={handlePostChange} setValue={setPostValue} />
                            </label>
                            <label htmlFor="pageNum">
                                <span>
                                    총 <strong>몇 페이지</strong>인가요?
                                </span>
                                <NumberInput name="pageNum" value={pickPostValue} handleOnChange={handlePostChange} setValue={setPostValue} />
                            </label>
                            <label htmlFor="lastPostNum">
                                <span>
                                    <strong>마지막 페이지</strong>에는 글이 몇 개 있나요?
                                </span>
                                <NumberInput name="lastPostNum" value={pickPostValue} handleOnChange={handlePostChange} setValue={setPostValue} />
                            </label>
                            <label htmlFor="postNum">
                                <span>
                                    한 페이지마다 <strong>글이 몇 개씩</strong> 있나요?
                                </span>
                                <NumberInput name="postNum" value={pickPostValue} handleOnChange={handlePostChange} setValue={setPostValue} />
                            </label>
                            <div
                                css={css`
                                    width: 100%;
                                    margin-top: auto;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: flex-end;
                                `}
                            >
                                <span style={{ fontSize: "20px", fontWeight: "700", color: "red" }}>{!validatorState.valid && validatorState?.message}</span>
                                <button
                                    css={css`
                                        width: 80px;
                                        height: 40px;
                                        border-radius: 12px;
                                        background-color: orange;
                                        font-weight: 600;
                                        font-size: 18px;
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                        &:hover {
                                            background-color: rgba(255, 165, 0, 0.75);
                                        }
                                    `}
                                    onClick={() => {
                                        postPick(pickPostValue) && gotoResult();
                                    }}
                                >
                                    추첨
                                </button>
                            </div>
                        </div>
                    </TabContent>
                    <TabContent index={1}>
                        <div
                            css={[
                                formStyle,
                                css`
                                    & > label:nth-of-type(2) {
                                        width: 43%;
                                    }
                                `,
                            ]}
                        >
                            <label htmlFor="endNum">
                                <NumberInput name="startNum" value={pickNumValue} handleOnChange={handleNumChange} setValue={setNumValue} />
                                <span>이상</span>
                                <NumberInput name="endNum" value={pickNumValue} handleOnChange={handleNumChange} setValue={setNumValue} />
                                <span>이하</span>
                            </label>
                            <label htmlFor="numCount">
                                <NumberInput name="numCount" value={pickNumValue} handleOnChange={handleNumChange} setValue={setNumValue} />
                                <span>개의 숫자를 뽑습니다.</span>
                            </label>
                            <div
                                css={css`
                                    width: 100%;
                                    margin-top: auto;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: flex-end;
                                `}
                            >
                                <span style={{ fontSize: "20px", fontWeight: "700", color: "red" }}>{!validatorState.valid && validatorState?.message}</span>
                                <button
                                    css={css`
                                        width: 80px;
                                        height: 40px;
                                        border-radius: 12px;
                                        background-color: orange;
                                        font-weight: 600;
                                        font-size: 18px;
                                        cursor: pointer;
                                        transition: background-color 0.2s;
                                        &:hover {
                                            background-color: rgba(255, 165, 0, 0.75);
                                        }
                                    `}
                                    onClick={() => {
                                        numPick(pickNumValue) && gotoResult();
                                    }}
                                >
                                    뽑기
                                </button>
                            </div>
                        </div>
                    </TabContent>
                </Tab>
            </div>
            <ResultBox css={[!displayResult && { opacity: "0" }]} isOpen={displayResult} result={result} goBack={gotoControl} />
        </>
    );
}
