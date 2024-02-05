import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  return (
    <div className='main'><h2>Sign In</h2>
        <div className='form-field'><label>Email Address</label><input type='email' className='input' /></div>
        <div className='form-field'><label>Password</label><input type='password' className='input' /></div>
        <div className='footer'>
            <p className='text'>Not registered ? <Link to='/register'>Create an account here</Link></p>
            <button>Login</button>
        </div>
    </div>
  )
}

export default Login