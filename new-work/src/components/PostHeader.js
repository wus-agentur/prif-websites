import React from 'react'
import * as styles from './PostHeader.module.scss'

export default function PostHeader({ title, intro, eyebrow, image, credit, portrait }) {
  return (
    <header className={`${styles.wrapper} ${image ? styles.hasImage : ''}`}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={`${styles.container}`}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${title.length > 30 ? styles.isLong : ''}`}>{title}</h1>
        </div>
        {intro && (
          <div className={`${styles.intro} ${portrait ? styles.hasPortrait : ''}`}>
            {portrait && portrait}
            <p className={styles.introCopy}>{intro}</p>
          </div>
        )}
      </div>
    </header>
  )
}
