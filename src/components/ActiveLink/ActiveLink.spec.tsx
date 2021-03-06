import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("should be able to render correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>
    );

    expect(screen.getByText("home")).toBeInTheDocument();
  });

  it("should receive active class if the link is currently active", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>home</a>
      </ActiveLink>
    );

    expect(screen.getByText("home")).toHaveClass("active");
  });
});
