import { render, screen } from '@testing-library/react';
import { Header } from ".";

jest.mock('next/router', () => {
  return{
    useRouter(){
      return {
        asPath:"/"
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

//----------------Início do primeiro teste-----------------
describe('Header component', () => {
  
  it('renders correctly', () => {
    render(
    <Header/>
  )
  
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})
//-------------Fim do primeiro teste----------------------
