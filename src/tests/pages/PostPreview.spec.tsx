import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>My excerpt</p>',
  updatedAt: '01 de abril de 2021'
};

jest.mock('../../services/prismic.ts');
jest.mock('next-auth/react');
jest.mock('next/router');

describe('Post preview page', () => {
  
  //------------Início do primeiro teste------------------
  it('render correctly', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<Post post={post} />)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByText("My excerpt")).toBeInTheDocument()
    expect(screen.getByText("Wanna to continue reading?")).toBeInTheDocument()  
  })
  //------------Fim do primeiro teste------------------

  //------------Início do segundo teste------------------
  it('redirect user to full content when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      }
    } as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any )

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })
  //-------------Fim do segundo teste--------------------

  //-------------Início do terceiro teste----------------
  it('loads initial data', async () => {
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

    const response = await getStaticProps({
      params: {slug: 'my-new-post'}
    })


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