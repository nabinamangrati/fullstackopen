import { Form, Button } from "react-bootstrap";
const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <div>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              value={username}
              onChange={handleUsernameChange}
              id="username"
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group>
            <Form.Label>password:</Form.Label>

            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
            />
          </Form.Group>
        </div>
        <Button variant="primary" type="submit" id="login-button">
          login
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
