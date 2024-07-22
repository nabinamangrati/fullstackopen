const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
