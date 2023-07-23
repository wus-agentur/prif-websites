import React from 'react'
import { graphql } from 'gatsby'
import Color from 'colorjs.io'
import App from './App'
import PostBody from './PostBody'
import Meta from './Meta'

import * as styles from './Post.module.scss'

export const query = graphql`
  query ($id: String!, $language: String!, $translations: [String!]) {
    site {
      siteMetadata {
        title
        siteUrl
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
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
          intro
          order
          color
          eyebrow
          authors {
            frontmatter {
              author_id
            }
          }
        }
      }
    }
    authors: allFile(
      # TODO: Only load authors from this year's report
      filter: {
        relativeDirectory: { glob: "**/authors" }
        extension: { eq: "mdx" }
        sourceInstanceName: { eq: "content" }
        childMdx: { fields: { locale: { eq: $language } } }
      }
    ) {
      nodes {
        id
        childMdx {
          frontmatter {
            name
            author_id
          }
          body
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

    translations: allFile(filter: { id: { in: $translations } }) {
      nodes {
        id
        relativeDirectory
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
  }
`
const Post = ({ data, pageContext, children }) => {
  const frontmatter = data.post.childMdx.frontmatter
  let authorIds = []
  if (frontmatter.authors) {
    authorIds = frontmatter.authors.map((el) => el?.frontmatter.author_id)
  }

  const authors = data.authors.nodes.filter((el) => {
    return authorIds.indexOf(el.childMdx.frontmatter.author_id) !== -1
  })

  const byline = authors.map((a) => a.childMdx.frontmatter.name).join(', ')

  const bios = authors.map((a) => {
    const fm = a.childMdx.frontmatter
    return (
      <li key={a.id}>
        <em>{fm.name}</em>
        {a.childMdx.body}
      </li>
    )
  })

  let appStyles = {}
  if (frontmatter.color) {
    const color = new Color(frontmatter.color)
    appStyles['--fc-text'] = color.toString()
    appStyles['--fc-background'] = color.set({ 'lch.l': 98, 'lch.c': 2 }).toString()
  }

  return (
    <App
      translationData={{ translations: data.translations.nodes, currentLanguage: pageContext.language, currentSlug: data.post.childMdx.fields.slug }}
      pages={data.pages.nodes}
      styles={appStyles}
    >
      <article id="content" className={styles.postContainer}>
        <header className={styles.header}>
          {frontmatter.eyebrow && <span className={styles.eyebrow}>{frontmatter.eyebrow}</span>}
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.intro}>{frontmatter.intro}</p>
          {authorIds.length > 0 && <p className={styles.byline}>{byline}</p>}
        </header>
        <section className={styles.body}>
          <PostBody>{children}</PostBody>
          {authorIds.length > 0 && (
            <aside>
              <ul>{bios}</ul>
            </aside>
          )}
        </section>
      </article>
    </App>
  )
}

export function Head({ data, pageContext, location }) {
  const frontmatter = data.post.childMdx.frontmatter
  const translationData = {
    currentPath: location,
    currentSlug: data.post.childMdx.fields.slug,
    currentLanguage: pageContext.language,
    translations: data.translations.nodes,
  }
  return <Meta translationData={translationData} title={`${frontmatter.title} – ${data.site.siteMetadata.title}`} description={frontmatter.intro} />
}

export default Post
