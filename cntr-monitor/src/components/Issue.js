import React from 'react'
import { graphql } from 'gatsby'
import MarkdownRenderer from 'react-markdown-renderer'
import App from './App.js'
import Meta from './Meta.js'
import SkipToContent from './SkipToContent.js'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Link } from 'gatsby-plugin-react-i18next'
import * as styles from './Issue.module.scss'

export const query = graphql`
  query ($id: String!, $language: String!, $postsDirectory: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    site {
      siteMetadata {
        title
        siteUrl
      }
    }

    post: file(id: { eq: $id }) {
      relativeDirectory
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
          intro
          order
          authors {
            name
          }
        }
      }
    }

    posts: allFile(
      sort: { childMdx: { frontmatter: { order: ASC } } }
      filter: {
        extension: { eq: "mdx" }
        relativeDirectory: { eq: $postsDirectory }
        sourceInstanceName: { eq: "content" }
        childMdx: { fields: { locale: { eq: $language } } }
      }
    ) {
      nodes {
        relativePath
        relativeDirectory
        id
        childMdx {
          fields {
            slug
            locale
          }
          frontmatter {
            title
            order
          }
        }
      }
    }

    pages: allFile(
      filter: {
        relativeDirectory: { glob: "**/pages/**" }
        extension: { eq: "mdx" }
        sourceInstanceName: { eq: "content" }
        childMdx: { fields: { locale: { eq: $language } } }
      }
    ) {
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

const Index = ({ data, pageContext, children, location }) => {
  const { t } = useTranslation()

  const posts = data.posts.nodes.map((p) => {
    let postStyles = {}
    const year = data.post.relativeDirectory.replace(/(.{2})\/(issues)\//g, '')
    const frontmatter = p.childMdx.frontmatter
    const maxWords = 45
    let intro = ''
    if (frontmatter.teaser) {
      intro = frontmatter.teaser
    } else {
      intro =
        frontmatter.intro && frontmatter.intro.split(' ').length > maxWords
          ? frontmatter.intro.split(' ').slice(0, maxWords).join(' ') + '...'
          : frontmatter.intro
    }

    return (
      <li key={p.id}>
        <Link style={postStyles} to={`/${year}/${p.childMdx.fields.slug}`}>
          <h3>{frontmatter.title}</h3>
          {frontmatter.intro && <MarkdownRenderer markdown={intro} />}
        </Link>
      </li>
    )
  })
  return (
    <App pages={data.pages.nodes} translationData={{ currentLanguage: pageContext.language, currentSlug: location.pathname }}>
      <SkipToContent />
      <main>
        <header>
          <h1 className={styles.title}>{data.post.childMdx.frontmatter.title}</h1>
        </header>
        <section>
          <h2>{t('Contents')}</h2>
          <ol>{posts}</ol>
        </section>
      </main>
    </App>
  )
}

export default Index

export const Head = ({ data, pageContext, location }) => {
  const year = data.post.relativeDirectory.replace(/(.{2})\/(issues)\//g, '')
  const translationData = { currentLanguage: pageContext.language, currentSlug: location.pathname }

  const bodyStyles = {}
  return (
    <>
      <body style={bodyStyles} />
      <Meta title={`${year} – ${data.site.siteMetadata.title}`} translationData={translationData} />
    </>
  )
}
