import * as React from 'react';
import { graphql } from 'gatsby';

import Page from '@/components/Page';
import Container from '@/components/Container';
import IndexLayout from '@/layouts';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import 'katex/dist/katex.min.css';

interface PostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: {
          name: string;
          url: string;
        };
      };
    };
    mdx: {
      body: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        lang: string;
      };
    };
  };
}

const PostTemplate: React.FC<PostTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <article lang={data.mdx.frontmatter.lang}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <p>{data.mdx.frontmatter.date}</p>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </article>
      </Container>
    </Page>
  </IndexLayout>
);

export default PostTemplate;

export const query = graphql`
  query PostTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        lang
      }
    }
  }
`;
