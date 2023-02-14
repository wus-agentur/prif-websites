import React from 'react'
import * as styles from './StickyHeader.module.scss'
import { useScrollPosition } from '@prif/shared'
import BookIcon from '../assets/icons/favicon.svg'
import { Link } from 'gatsby'

export default function StickyHeader({ post, unit, next, prev }) {
  const scrollPosition = useScrollPosition()
  let scrollProgress = 0
  if (typeof window !== 'undefined') {
    scrollProgress = scrollPosition.y / (document.body.scrollHeight - window.innerHeight)
  }

  const showStatusClass = scrollPosition.y > 10 ? styles.statusActive : ''

  return (
    <header className={`${styles.status} ${showStatusClass}`}>
      <Link className={styles.home} to="/">
        <BookIcon />
        EUNPDC eLearning
      </Link>
      <div className={styles.statusLocation}>
        {unit && (
          <Link to={`../#chapters`} className={styles.unit}>
            Unit {unit.childMdx.frontmatter.order}
          </Link>
        )}
        {post && <span className={styles.post}>{post.childMdx.frontmatter.title}</span>}
      </div>
      <div className={styles.progress}>
        <div style={{ width: `${scrollProgress * 100}%` }} className={styles.progressInner}></div>
      </div>
      <nav className={styles.statusPagination}>
        {prev && <Link to={`../${prev.childMdx.fields.slug}`}>Previous</Link>}
        {next && <Link to={`../${next.childMdx.fields.slug}`}>Next</Link>}
      </nav>
    </header>
  )
}
