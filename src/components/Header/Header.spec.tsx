import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Header component", () => {
  it("should be able to render correctly", () => {
    render(<Header />);

    expect(screen.getByText("Posts")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});