//
import { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames/bind";
import { Card, Form, Button } from "react-bootstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//
import styles from "./PassWordGenerator.module.scss";
import CheckBox from "../CheckBox";

//
const cx = classnames.bind(styles);

const PassWordGenerator:FC = () => {
    //
    const [inputPrimary, setInputPrimary] = useState<string>("AAA55HEB");
    const [level, setLevel] = useState<string>("medium");
    const [lengthChar, setLengthChar] = useState<number>(8);
    const [upper, setUpper] = useState<boolean>(true);
    const [lower, setLower] = useState<boolean>(false);
    const [numb, setNumb] = useState<boolean>(true);
    const [specialChar, setSpecialChar] = useState<boolean>(false);

    //
    const input = useRef<HTMLInputElement | null>(null);

    //
    useEffect(() => {
        if (
            /[A-Z]/.test(inputPrimary) &&
            /[a-z]/.test(inputPrimary) &&
            /[0-9]/.test(inputPrimary) &&
            /[!@#$%^&*()]/.test(inputPrimary) &&
            inputPrimary.length > 10
        ) {
            setLevel("strong");
        } else if (
            /[A-Z]/.test(inputPrimary) &&
            /[a-z]/.test(inputPrimary) &&
            /[0-9]/.test(inputPrimary) &&
            /[!@#$%^&*()]/.test(inputPrimary)
        ) {
            setLevel("medium");
        } else {
            setLevel("weak");
        }
    }, [inputPrimary]);

    // Logic
    const randomString = (length: number): string => {
        const upperStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerStr: string = "abcdefghijklmnopqrstuvwxyz";
        const numStr: string = "0123456789";
        const specStr: string = "!@#$%^&*()";
        let result: string = "";

        for (let i = 0; i < length; i++) {
            if (upper) {
                const indexRandom: number = Math.floor(
                    Math.random() * upperStr.length
                );
                result += upperStr.charAt(indexRandom);
                if (result.length === length) break;
            }
            if (lower) {
                const indexRandom: number = Math.floor(
                    Math.random() * lowerStr.length
                );
                result += lowerStr.charAt(indexRandom);
                if (result.length === length) break;
            }
            if (numb) {
                const indexRandom: number = Math.floor(
                    Math.random() * numStr.length
                );
                result += numStr.charAt(indexRandom);
                if (result.length === length) break;
            }
            if (specialChar) {
                const indexRandom: number = Math.floor(
                    Math.random() * specStr.length
                );
                result += specStr.charAt(indexRandom);
                if (result.length === length) break;
            }
        }

        return result;
    };

    // Handle Events
    const handleClickReset = (): void => {
        setInputPrimary(randomString(lengthChar));
    };

        // Copy
    const handleClickCopy = (): void => {
        if(input.current !== null) {
            navigator.clipboard.writeText(input.current.value as string)
            .then(() => console.log("Success!"))
            .catch(() => console.log("Error!"));
        }
    };

    return (
        <Card className={cx("passGenerator-container")}>
            <Card.Body>
                {/* head */}
                <div className={cx("title")}>
                    <img
                        className={cx("img")}
                        src="https://reactjs-password-generator.vercel.app/static/media/password.41b50a01b4d0a0f2c9ba.gif"
                        alt="gif"
                    />
                    <h3>PASSWORD GENERATOR</h3>
                    <p>
                        Create strong and secure passwords to keep your account
                        safe online.
                    </p>
                </div>

                {/* middle */}
                <div className={cx("middle")}>
                    <Form.Group className={cx("form-group")}>
                        <Form.Control
                            ref={input}
                            spellCheck={false}
                            className={cx("input")}
                            value={inputPrimary}
                            onChange={(e) => setInputPrimary(e.target.value)}
                        />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className={cx("btn-reset")}
                        viewBox="0 0 16 16"
                        onClick={handleClickReset}
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                        />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                    </Form.Group>
                    <Button
                        className={cx("btn-copy")}
                        onClick={handleClickCopy}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-copy"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"
                            />
                        </svg>
                        <span style={{ marginLeft: "6px" }}>Copy</span>
                    </Button>
                </div>
                <Form.Text
                    className={cx("noti-message", {
                        weak: level === "weak",
                        medium: level === "medium",
                        strong: level === "strong",
                    })}
                >
                    {level}
                </Form.Text>

                <div className={cx("slider")}>
                    <h5 className={cx("title-slider")}>
                        Password Length:
                        <span>{lengthChar}</span>
                    </h5>
                    <Slider
                        value={lengthChar}
                        min={1}
                        step={1}
                        max={30}
                        onChange={(val) => setLengthChar(val as number)}
                    />
                </div>

                {/* foot */}
                <div className={cx("list-check")}>
                    <CheckBox
                        value={upper}
                        label="Uppercase"
                        onChange={() => setUpper(!upper)}
                    />
                    <CheckBox
                        value={lower}
                        label="Lowercase"
                        onChange={() => setLower(!lower)}
                    />
                    <CheckBox
                        value={numb}
                        label="Numbers"
                        onChange={() => setNumb(!numb)}
                    />
                    <CheckBox
                        value={specialChar}
                        label="Special Characters"
                        onChange={() => setSpecialChar(!specialChar)}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default PassWordGenerator;
