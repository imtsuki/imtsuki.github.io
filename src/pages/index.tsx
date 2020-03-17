import * as React from 'react';
import { graphql, Link } from 'gatsby';

import Page from '@/components/Page';
import Container from '@/components/Container';
import IndexLayout from '@/layouts';
import PostEntry from '@/components/PostEntry';

interface IndexPageProps {
  data: {
    allMdx: {
      edges: Array<{
        node: {
          fields: { slug: string };
          frontmatter: {
            date: string;
            title: string;
          };
        };
      }>;
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <ul>
          {data.allMdx.edges.map(({ node }) => {
            const { title, date } = node.frontmatter;
            const { slug } = node.fields;
            return <PostEntry key={slug} slug={slug} title={title} date={date} />;
          })}
        </ul>
      </Container>
    </Page>
  </IndexLayout>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`;
