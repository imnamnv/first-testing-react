import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // manipulate <van dung, tan dung> the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // assertion <xac nhan> - make sure the component is doing
  // what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is summited", () => {
  // NOT THE BEST IMPLEMENTATION
  const argList = [];
  const callback = (...args) => {
    console.log("args", args);
    argList.push(args);
  };
  // Try to render my component
  render(<UserForm onUserAdd={callback} />);
  // Find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard("name");

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("name@gmail.com");

  // Find the button
  const button = screen.getByRole("button");

  // Similate clicking the button
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email,name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "name", email: "name@gmail.com" });
});
