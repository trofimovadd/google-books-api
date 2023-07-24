import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader: React.FC = () => {
    return (
        <div>
            <Spinner
            as="span"
            variant="dark"
            size="sm"
            role="status"
            aria-hidden="true"
            animation="border"/>
        </div>
    )
}

export default Loader;