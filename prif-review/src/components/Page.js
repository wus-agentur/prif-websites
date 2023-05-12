import { graphql } from 'gatsby'
import React from 'react'
import App from './App'
import PostBody from './PostBody'
import SkipToContent from './SkipToContent'

export const query = graphql`
  query ($id: String!, $language: String!, $translations: [String!]) {
    site: site {
      siteMetadata {
        title
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: file(id: { eq: $id }) {
      modifiedTime(locale: "de-DE", formatString: "dddd, D.M.YYYY")
      childMdx {
        fields {
          slug
          locale
        }
        frontmatter {
          title
          intro
        }
      }
    }
    translations: allFile(filter: { id: { in: $translations } }) {
      nodes {
        childMdx {
          fields {
            locale
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    pages: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "pages" }, childMdx: { fields: { locale: { eq: $language } } } }) {
      nodes {
        id
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            order
          }
        }
      }
    }
  }
`
const Page = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter
  return (
    <App pages={data.pages.nodes} translations={data.translations.nodes}>
      <SkipToContent />
      <article id="content">
        <main>
          <h1>{frontmatter.title}</h1>
          <PostBody>{children}</PostBody>
        </main>
      </article>
    </App>
  )
}

export function Head({ data }) {
  const frontmatter = data.post.childMdx.frontmatter
  return (
    <>
      <title>{`${frontmatter.title} – New Work (Eine Anleitung)`}</title>
      <meta name="description" content={`${frontmatter.intro}`} />
    </>
  )
}

export default Page
