import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import remarkGfm from 'remark-gfm'
import adapter from 'gatsby-adapter-netlify'

const config = {
  siteMetadata: {
    siteUrl: `https://leibniz-nw.netlify.app`,
    title: 'WorkNew@Leibniz',
    description: 'Neue Arbeitformen für Wissenschaft und Forschung',
    siteTwitter: '@PRIF_org',
    authorTwitter: '@PRIF_org',
    image: {
      src: '/social-image.png',
      alt: 'image alt',
    },
  },
  flags: {
    FAST_DEV: true,
  },
  adapter: adapter.default(),
  plugins: [
    'gatsby-plugin-image',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-svg',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'authors',
        path: `${__dirname}/content/authors/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/content/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'snippets',
        path: `${__dirname}/content/snippets/`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
        gatsbyRemarkPlugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'posts',
        engine: 'flexsearch',
        query: `
          {
            terms: allTermsJson {
              nodes {
                id
                title
                term_id
              }
            }
            posts: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "posts" } }) {
              nodes {
                id
                relativeDirectory
                childMdx {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    short_title
                  }
                }
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'short_title'],
        store: ['id', 'title', 'slug', 'post_type'],
        normalizer: ({ data }) => {
          const mergedData = [
            ...data.posts.nodes.map((node) => ({
              id: node.id,
              slug: node.childMdx.fields.slug,
              title: node.childMdx.frontmatter.title,
              short_title: node.childMdx.frontmatter.short_title || '',
              post_type: 'post',
            })),
            ...data.terms.nodes.map((node) => ({
              id: node.term_id,
              slug: `glossar#${node.term_id}`,
              title: node.title,
              post_type: 'term',
            })),
          ]
          return mergedData
        },
      },
    },
  ],
}

export default config
