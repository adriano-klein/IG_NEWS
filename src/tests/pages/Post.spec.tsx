import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { getSession } from 'next-auth/react';
import Post, {getServerSideProps} from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'My post',
  title: 'My new post',
  content: '<p>My excerpt</p>',
  updatedAt: '01 de abril de 2021'
};

jest.mock('../../services/prismic.ts');
jest.mock('next-auth/react');

describe('Post page', () => {
  //------------Início do primeiro teste------------------
  it('render correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByText("My excerpt")).toBeInTheDocument()  
  })
  //------------Fim do primeiro teste------------------

  //------------Início do segundo teste------------------
  it('redirect user if user no subscription is found ', async () => {
    const getSessionMock = mocked(getSession);
    
    getSessionMock.mockResolvedValueOnce({
      activeSubscription: null,
    } as any)

    const response = await getServerSideProps({params: {slug: 'my-new-post'}} as any);

    //Este tipo de expect valida se pelo menos algumas das informações estão presentes.
    //Se tirarmos o objectContaining a validação considera as informações exatas do objeto.
    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMock = mocked(getSession);
    const getPrismicClientMock = mocked(getPrismicClient);

    getPrismicClientMock.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce ({
        data: {
          title: [
            {type: 'heading', text: 'My new post'}
          ],
          content: [
            {type: 'paragraph', text: 'post content'}
          ],
        },
        last_publication_date: '04-01-2021'
      }
    )} as any)
    
    getSessionMock.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    const response = await getServerSideProps({
      params: {slug: 'my-new-post'}
    } as any);


    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
    
  })
})