//
import { FC } from "react";
import classNames from "classnames/bind";
import { Form } from "react-bootstrap";

//
import styles from "./CheckBox.module.scss";

//
const cx = classNames.bind(styles);

type props = {
    label: string;
    value: boolean;
    onChange: () => void;
};

const CheckBox: FC<props> = (props) => {
    const { label, value, onChange } = props;
    return (
        <div className={cx("checkBox-container")}>
            <Form.Group className={cx("group")}>
                <Form.Label htmlFor="check" className={cx("label")}>{label}</Form.Label>
                <Form.Check 
                    id="check" 
                    checked={value} 
                    className={cx("input")} 
                    onChange={onChange}
                />
            </Form.Group>
        </div>
    );
};

export default CheckBox;
