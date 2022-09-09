import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Home, { getStaticProps } from '../../pages';
import { stripe } from '../../services/stripe';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false]
  }
});
jest.mock('../../services/stripe')

describe('Home page', () => {
  //------------Início do primeiro teste------------------
  it('render correctly', () => {
    render(<Home product={{
      priceId: 'fake-price-id',
      amount: "R$10,00"
    }}   />)

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()  
  })
  //------------Fim do primeiro teste------------------

  //------------Início do segundo teste------------------
  it('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id:'fake-price-id',
      unit_amount: 1000
    } as any)
    const response = await getStaticProps({});

    //Este tipo de expect valida se pelo menos algumas das informações estão presentes.
    //Se tirarmos o objectContaining a validação considera as informações exatas do objeto.
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId:'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})