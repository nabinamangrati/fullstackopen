import { Button, Input } from "./Button";
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
          <Input
            value={username}
            onChange={handleUsernameChange}
            id="username"
          />
        </div>
        <div>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="password"
          />
        </div>
        <Button type="submit" primary="">
          login
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
