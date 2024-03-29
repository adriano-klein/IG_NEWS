import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/react';
import { SignInButton } from ".";


jest.mock('next-auth/react')

//----------------Início do primeiro teste-----------------
describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<SignInButton/>)
  
  expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })
})
//-------------Fim do primeiro teste----------------------


//----------------Início do segundo teste-----------------
it('renders correctly when user is authenticated', () => {
  const useSessionMocked = mocked(useSession);

  useSessionMocked.mockReturnValueOnce({
    data: {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      },
      expires: 'fake-expires'
    },
    status: "authenticated"
  })

  render(<SignInButton/>)

expect(screen.getByText('John Doe')).toBeInTheDocument()
})

//-------------Fim do segundo teste----------------------