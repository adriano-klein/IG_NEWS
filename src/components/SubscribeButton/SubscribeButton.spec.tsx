import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/react';
import { SubscribeButton } from ".";
import { useRouter } from 'next/router';



jest.mock('next-auth/react')
jest.mock('next/router')

//----------------Início do primeiro teste-----------------
describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<SubscribeButton/>)
  
  expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })
})
//-------------Fim do primeiro teste----------------------

//------------- Início do segundo teste ------------------
it('redirect user to sign if not authenticated', () => {
  const signInMocked = mocked(signIn);
  const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

  render(<SubscribeButton />)

  const subscribeButton = screen.getByText('Subscribe now')
  fireEvent.click(subscribeButton)

  expect(signInMocked).toBeCalled()

})

//-------------Fim do segundo teste----------------------

//------------- Início do terceiro teste ------------------
it('redirects to posts when user already has a subscription', () => {
  const useRouterMocked = mocked(useRouter);
  const useSessionMocked = mocked(useSession)
  const pushMock = jest.fn();

  useSessionMocked.mockReturnValueOnce({
    data: {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      },
      expires: 'fake-expires',
      activeSubscription:'fake-active-subscription'
    },
    status: "authenticated"
  })

  useRouterMocked.mockReturnValueOnce({
    push: pushMock,
  } as any)

  render(<SubscribeButton />)

  const subscribeButton = screen.getByText('Subscribe now');

  fireEvent.click(subscribeButton);

  expect(pushMock).toHaveBeenCalledWith('/posts')
})
//-------------Fim do terceiro teste----------------------