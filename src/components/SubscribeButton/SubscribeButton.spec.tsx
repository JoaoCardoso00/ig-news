import { render, screen } from "@testing-library/react";
import { SubscribeButton } from ".";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("should be able to render correctly", () => {

    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });

  it("should redirect user to sign in when user is not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false] as any)


    render(<SubscribeButton />);

    const button = screen.getByText("Subscribe Now");

    button.click();

    expect(signInMocked).toHaveBeenCalled();
  });

  it("should redirect user to posts page when user is authenticated", () => {
    const useRouterMocker = jest.mocked(useRouter);
    const useSessionMocked = jest.mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        activeSubscription: 'fake-active-subscription',
        expires: "fake-expires",
      },
    } as any);

    useRouterMocker.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const button = screen.getByText("Subscribe Now");

    button.click();

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
