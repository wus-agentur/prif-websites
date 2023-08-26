import React from 'react'
import * as styles from './Logo.module.scss'
import { useStaticQuery, graphql } from 'gatsby'
const easeInOutCubic = function (x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export default function Logo({ progress }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const orkTransform = `translate(${easeInOutCubic(progress) * -250} 0)`
  const nTransform = `translate(${easeInOutCubic(progress) * -238} 0)`
  const leibnizTransform = `translate(${easeInOutCubic(progress) * -428} 0)`
  const ewTransform = `translate(${easeInOutCubic(progress) * -428} 0)`
  const width = 1000 - easeInOutCubic(progress) * 425
  return (
    <div className={styles.container}>
      <span className={styles.label}> {data.site.siteMetadata.title}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} 107.192`}>
        <mask id="mask-1" x1={0} y1={0}>
          <polygon fill="white" points="100.199 111.3738 136.5067 -4.6262 795.0461 -4.6262 795.0461 111.3738 100.199 111.3738" />{' '}
        </mask>
        <mask id="mask-2" x1={0} y1={0}>
          <polygon fill="white" points="400.8502 111.3738 434.5878 -3.7249 1005.6836 -4.6262 1005.6836 111.3738 400.8502 111.3738" />
        </mask>

        <path d="m0,1.8221h6.968l20.2099,67.8772c3.0659,10.1751,12.4046,10.5937,15.7508,0L64.2525,1.8221h8.223l21.1864,67.8772c3.3453,10.7319,12.8223,10.1751,15.8881,0L129.9002,1.8221h6.8288l-29.9663,99.2377h-9.8956l-22.1454-71.1037c-1.9248-6.1804-10.6696-6.1862-12.6032-.0088l-22.2574,71.1125h-9.8956L0,1.8221Z" />

        <g mask="url(#mask-1)" id="ork">
          <g transform={orkTransform}>
            <path d="m167.8111,96.4601c19.5128,0,36.5167-15.7499,36.5167-45.4368,0-30.1055-17.0039-44.1828-36.5167-44.1828s-36.5177,14.0772-36.5177,44.1828c0,29.6869,17.0048,45.4368,36.5177,45.4368m-43.4867-45.577C124.3245,20.9178,140.3537.15,167.8111.15s43.4857,20.7678,43.4857,50.7331c0,31.0821-16.0283,52.2675-43.4857,52.2675s-43.4867-21.1855-43.4867-52.2675" />
            <path d="m240.1494,49.3501h5.2954c14.0772,0,24.2513-6.5504,24.2513-20.7678,0-15.0528-10.0339-20.3482-22.16-20.3482h-7.3867c-11.1506,0-22.4404,6.6896-22.5806,20.2099v.1382c0,15.6116,10.176,20.7678,22.5806,20.7678M210.0429,1.8221h38.0501c17.2833,0,28.9908,7.9446,28.9908,25.5063,0,16.1685-11.1506,23.1365-17.8402,25.2269,6.1327.4186,10.7329,3.6247,12.1261,9.7574l4.7385,20.2099c1.9511,8.5014,3.0669,14.2165,4.7395,18.2588v.2785h-8.5024l-7.2475-35.5411c-1.1157-5.2973-4.0424-9.6172-12.2654-9.6172h-36.099v45.1583h-6.6905V1.8221Z" />
            <path d="m345.2404,1.8221l-39.862,40.8375,41.2561,58.4002h-8.6416l-28.9908-41.3954c-5.2964-7.5259-12.9625-7.6661-18.9549-1.255l-2.5099,2.6492v40.0012h-6.6896V1.8221h6.6896v50.1762L336.0418,1.8221h9.1986Z" />
          </g>
        </g>
        <g id="n" transform={nTransform}>
          <path d="m375.4915,1.8221l22.7189,71.5009c1.9511,6.6905,8.3622,6.2729,10.0349.1392L427.8972,1.8221h6.6905l-27.1789,99.2377h-8.223l-22.5787-71.6401c-2.0913-6.6905-8.9211-5.1571-10.176,0l-19.7913,71.6401h-6.6906L367.1282,1.8221h8.3632Z" />
        </g>
        <g id="ew" mask="url(#mask-2)">
          <g transform={ewTransform}>
            <path
              class="b"
              d="m489.6424,1.8221h6.968l20.2099,67.8772c3.0659,10.1751,12.4046,10.5937,15.7509,0L553.8949,1.8221h8.223l21.1865,67.8772c3.3453,10.7319,12.8222,10.1751,15.8881,0L619.5426,1.8221h6.8288l-29.9663,99.2377h-9.8956l-22.1444-71.1037c-1.9258-6.1804-10.6706-6.1862-12.6042-.0088l-22.2574,71.1125h-9.8956L489.6424,1.8221Z"
            />
            <path
              class="b"
              d="m430.9646,1.8221h62.8593v6.2719h-36.9353c-9.7564,0-19.653,5.1571-19.7913,17.701v.1402c0,13.5194,8.7799,18.1186,19.7913,18.1186h32.7547v6.2719h-51.9891v44.323h54.7765v6.4111h-61.4661V1.8221Z"
            />
          </g>
        </g>
        <g className={styles.leibniz} transform={leibnizTransform}>
          <rect class="b" x="714.6972" y="1.8216" width="6.2719" height="99.2377" />
          <path
            class="b"
            d="m746.8925,60.0822h30.385c-.4186-16.447-10.175-23.6944-20.4893-23.6944-7.3867,0-13.5194,3.0668-17.5618,8.0847-3.2051,4.0414-6.5504,15.6097,7.6661,15.6097m-20.2099,5.0179c0-20.907,11.7075-35.1235,30.1055-35.1235,16.7264,0,27.876,13.938,27.876,34.5656v1.3932h-51.0126c0,14.7743,6.968,30.2457,23.9729,30.2457,9.6172,0,17.8402-5.714,19.5129-17.8402h6.6896c-2.0893,16.3077-13.2399,24.1121-26.2024,24.1121-20.3491,0-30.9418-16.0283-30.9418-37.353"
          />
          <path
            class="b"
            d="m798.1816,101.0597h-6.2719V31.3706h6.2719v69.6891Zm-3.0658-96.0317c2.9276,0,5.2963,2.509,5.2963,5.4356s-2.3687,5.4356-5.2963,5.4356-5.4356-2.508-5.4356-5.4356,2.5089-5.4356,5.4356-5.4356"
          />
          <path
            class="b"
            d="m836.7895,97.0178c13.1017,0,22.3003-10.4535,22.3003-30.385,0-20.0697-10.5927-30.1055-22.3003-30.1055-14.3557,0-22.7189,11.429-22.7189,30.1055,0,18.5373,8.3632,30.385,22.7189,30.385m-18.9559-1.9521c-1.8109-1.8109-3.4835-.5569-3.4835,1.5334v4.46h-6.2729V1.8225h6.2729v31.639c0,4.3198,3.3443,4.7385,5.8542,2.7874,4.46-3.4845,9.8956-5.9935,16.0273-5.9935,17.9794,0,29.5486,14.2165,29.5486,36.2382,0,22.7189-11.8477,36.6569-29.2692,36.6569-7.1082,0-13.7988-3.0668-18.6774-8.0847"
          />
          <path
            class="b"
            d="m877.7659,31.3703v7.2475c0,2.7884,2.7874,3.6237,4.6002,1.3942,2.6472-3.3453,8.9201-10.0358,21.1845-10.0358,9.8956,0,20.3501,6.4111,20.3501,21.3257v49.7576h-6.2729v-45.1583c0-13.7988-6.969-19.7922-15.7489-19.7922-12.4056,0-24.113,12.1261-24.113,28.8516v36.099h-6.2719V31.3703h6.2719Z"
          />
          <path
            class="b"
            d="m938.8129,101.0597h-6.2719V31.3706h6.2719v69.6891Zm-3.0658-96.0317c2.9266,0,5.2954,2.509,5.2954,5.4356s-2.3687,5.4356-5.2954,5.4356-5.4366-2.508-5.4366-5.4356,2.509-5.4356,5.4366-5.4356"
          />
          <path
            class="b"
            d="m945.2245,31.3703h54.7755v8.3632l-37.9109,44.1828c-3.0658,3.6228-2.5089,11.2889,4.8777,11.2889h33.0332v5.8542h-54.7755v-7.3867l40.2796-46.6917c3.9032-4.46,2.509-9.7564-2.9266-9.7564h-37.353v-5.8542Z"
          />
          <path
            class="b"
            d="m657.5372,80.125c-14.0052,0-22.8932-10.2344-22.8932-28.1447,0-18.0446,10.2345-27.875,22.8932-27.875,13.8698,0,21.276,9.8304,21.276,27.875,0,17.9103-8.7526,28.1447-21.276,28.1447m16.8325,27.067v-5.6556h-16.0245c-26.1255,0-45.2469-21.8154-45.2469-47.9399s19.1214-47.9399,45.2469-47.9399,46.3237,21.9497,46.3237,49.4207c0,14.5436-2.5586,26.1245-12.1193,26.1245-4.1748,0-8.2152-3.2314-8.2152-11.1769V20.7386h-6.0597v9.5607c-3.7708-6.8678-10.3688-11.4466-21.5457-11.4466-16.8335,0-28.6831,13.0627-28.6831,32.9932,0,20.6032,11.8496,33.8003,28.6831,33.8003,10.5031,0,17.5063-5.3869,21.5457-13.3324.2697,9.1576,6.8677,14.2749,14.4092,14.2749,16.0244,0,17.9103-16.8335,17.9103-31.6458,0-30.973-22.6235-54.943-52.249-54.943s-50.9025,23.9699-50.9025,53.5965,21.276,53.5955,50.9025,53.5955h16.0245Z"
          />
        </g>
      </svg>
    </div>
  )
}
