// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import libraries
import { FC } from "react";
import { Row, Col} from "react-bootstrap";

// Import my files
import "./App.scss";
import PassWordGenerator from "./components/PassWordGenerator";

//

const App: FC = () => {

    return (
        <div className="app-container">
            <Row className="row">
                <Col lg="6" md="8">
                    <PassWordGenerator />
                </Col>
            </Row>
        </div>
    );
};

export default App;
