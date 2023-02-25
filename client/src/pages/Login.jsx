import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email").valueOf();
    const password = data.get("password").valueOf();
    login(email, password).then((res) => {
      if (res.status == 200) {
        navigate("/");
      } else {
        setError(true);
      }
    });
  };

  return (
    <form
      className="d-flex flex-column gap-3 align-items-center justify-content-center"
      style={{ height: '75vh' }}
      onSubmit={onSubmit}
    >
      <legend className="text-center">Welcome Back!</legend>
      <div className="w-50">
        <label htmlFor="email">Email: </label>
        <input className="form-control" type="email" name="email" />
      </div>
      <div className="w-50">
        <label htmlFor="email">Password: </label>
        <input className="form-control" type="password" name="password" />
      </div>
      <button className="btn btn-primary mt-4 w-50">Log In</button>
      {error && (
        <small className="form-text text-danger">
          Login failed! Please try again.
        </small>
      )}
      <small className="form-text text-muted">Don't have an account? <Link className='text-info' to={'/register'}>Sign Up</Link></small>
    </form>
  );
}

export default Login;
