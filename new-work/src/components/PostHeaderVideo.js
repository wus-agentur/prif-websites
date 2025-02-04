import React, { useRef, useState, useContext } from 'react'
import { Link } from 'gatsby'
import Button from './ButtonAdapter'
import CrossIcon from '../images/cross.svg'
import * as styles from './PostHeaderVideo.module.scss'
import { EmbedChoicesContext } from '../context/EmbedChoicesContext'

export default function PostHeaderVideo({ url, poster }) {
  const [isActive, setIsActive] = useState(false)
  const [loadedOnce, setLoadedOnce] = useState(false)
  const matches = url.match(/(?:vimeo.com\/)(\d+)(?:\/)(.+)/)
  const closeButtonRef = useRef(null)
  const openButtonRef = useRef(null)
  const { choices, setChoices } = useContext(EmbedChoicesContext)

  return (
    <div className={`${isActive ? styles.mediaActive : ''}`}>
      <div className={`${styles.poster}`}>{poster && poster}</div>
      <div className={styles.controls}>
        <Button
          label={`Film starten`}
          size="large"
          ref={openButtonRef}
          onClick={() => {
            setIsActive(true)
            setLoadedOnce(true)
            setChoices((prev) => {
              let newChoices = { ...prev }
              newChoices['vimeo'] = true
              return newChoices
            })
            closeButtonRef.current.focus()
          }}
        />
        <p>
          <Link to="/datenschutz">Datenschutz</Link>
        </p>
      </div>

      <div className={`${styles.media}`}>
        <div className={styles.mediaInner}>
          <div className={styles.mediaControls}>
            <Button
              label="Schließen"
              ref={closeButtonRef}
              icon={<CrossIcon />}
              hideLabel={true}
              onClick={() => {
                setIsActive(false)
                openButtonRef.current.focus()
              }}
            />
          </div>
          <iframe
            title="Film"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            src={loadedOnce ? `https://player.vimeo.com/video/${matches[1]}?h=${matches[2]}&title=0&byline=0&portrait=0` : ''}
          />
        </div>
      </div>
    </div>
  )
}
