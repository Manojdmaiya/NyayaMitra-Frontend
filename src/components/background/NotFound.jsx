import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-3">Oops! Page Not Found</h2>
            <p className="text-center mb-4 px-3" style={{ maxWidth: "500px" }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/login" className="btn btn-primary fw-bold px-4 py-2">
                Login
            </Link>
        </div>
    );
};

export default NotFound;
