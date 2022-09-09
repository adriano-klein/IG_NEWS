import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Posts, { getStaticProps } from '../../pages/posts';
import { stripe } from '../../services/stripe';
import { getPrismicClient } from '../../services/prismic';

const posts = [{
  slug: 'My post',
  title: 'My new post',
  excerpt: 'My excerpt',
  updatedAt: '10 de abril'
}];

jest.mock('../../services/prismic.ts')

describe('Posts', () => {
  //------------Início do primeiro teste------------------
  it('render correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()  
  })
  //------------Fim do primeiro teste------------------

  //------------Início do segundo teste------------------
  it('loads initial data', async () => {
    const gePrismicClientMock = mocked(getPrismicClient);

    gePrismicClientMock.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid:'my-new-post',
            data: {
              title: [
                {type: 'heading', text: 'My new post'}
              ],
              content: [
                {type: 'paragraph', text:'Post excerpt'}
              ],
            },
            last_publication_date:'04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({});

    //Este tipo de expect valida se pelo menos algumas das informações estão presentes.
    //Se tirarmos o objectContaining a validação considera as informações exatas do objeto.
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de abril de 2021'
          }]
        }
      })
    )
  })
})