/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IInfographicksProps } from './InfographicProps';
import styles from './Infographic.module.scss';

export const Infographic: React.FC<IInfographicksProps> = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>How does a multiproxy work?</h2>
      <div className={styles.graphickContainer}>
        <div className={styles.row}>
          <div className={styles.card}>
            <div className={styles.pictureFrame}>
              <img
                className={styles.cardImage}
                src="/images/man-1.png"
                alt="picture of man"
              />
            </div>
            <div className={styles.right}>
              <p className={styles.cardTitle}>Movement</p>
              <p className={styles.cardText}>System #1</p>
            </div>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}>
              <p>Move</p>
              <div className={styles.rightDot}></div>
            </div>
            <div
              className={styles.line}
              style={{ width: '75%', background: '#868686' }}
            >
              <p>Other function</p>
            </div>
          </div>
          <div className={styles.card} style={{ padding: '2rem' }}>
            <p
              className={styles.blueDash}
              style={{ margin: 'auto', padding: '1rem' }}
            >
              Movement system Data
            </p>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}>
              <div className={styles.leftDot}></div>
              <p>Move</p>
              <div className={styles.rightDot}></div>
            </div>
          </div>
          <div className={styles.card}>
            <p style={{ margin: 'auto', fontWeight: 600 }}>Game client</p>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line} style={{ backgroundColor: '#27AB83' }}>
              <div className={styles.leftDot}></div>
              <p>Result</p>
              <img
                src="/images/arrow.png"
                alt="arrow"
                className={styles.arrow}
              />
            </div>
          </div>
          <img
            className={styles.gamefield}
            src="/images/gamefield-1.png"
            alt="123"
          />
        </div>
      </div>
      <div className={styles.explanation}>
        <h3 className={styles.heh}>What did the user do?</h3>
        <p>
          Added a combat system function and replaced the movement system
          function with a compatible function from another system.
        </p>
        <strong>Result:</strong>
      </div>
      <div className={styles.graphicContainer}>
        <div className={styles.row + ' ' + styles.dimmed}>
          <div className={styles.card}>
            <div className={styles.pictureFrame}>
              <img
                className={styles.cardImage}
                src="/images/man-1.png"
                alt="picture of man"
              />
            </div>
            <div className={styles.right}>
              <p className={styles.cardTitle} style={{ color: '#868686' }}>
                Movement
              </p>
              <p className={styles.cardText} style={{ color: '#868686' }}>
                System #1
              </p>
            </div>
          </div>
          <div className={styles.lineContainer}>
            <div
              className={styles.line}
              style={{ width: '75%', background: '#868686' }}
            >
              <p>Move</p>
            </div>
            <div
              className={styles.line}
              style={{ width: '75%', background: '#868686' }}
            >
              <p>Other function</p>
            </div>
          </div>
          <p className={styles.disabled}>The system is disabled</p>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.row}>
              <div style={{ marginBottom: '1.5rem' }} className={styles.card}>
                <div className={styles.pictureFrame}>
                  <img
                    className={styles.cardImage}
                    src="/images/man-2.png"
                    alt="picture of man"
                  />
                </div>{' '}
                <div className={styles.right}>
                  <p className={styles.cardTitle}>Movement</p>
                  <p className={styles.cardText}>System #2</p>
                </div>
              </div>
              <div className={styles.lineContainer}>
                <div className={styles.line}>
                  <p>Move</p>
                  <div className={styles.rightDot}></div>
                </div>
                <div
                  className={styles.line}
                  style={{
                    width: '75%',
                    background: '#868686',
                  }}
                >
                  <p>Other function</p>
                </div>
                <div
                  className={styles.line}
                  style={{
                    width: '75%',
                    background: '#868686',
                  }}
                >
                  <p>Unused</p>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.card}>
                <div className={styles.pictureFrame}>
                  <img
                    className={styles.cardImage}
                    src="/images/sword.png"
                    alt="sword"
                  />
                </div>
                <div className={styles.right}>
                  <p className={styles.cardTitle} style={{ color: '#d64545' }}>
                    Fight
                  </p>
                  <p className={styles.cardText} style={{ color: '#d64545' }}>
                    System #1
                  </p>
                </div>
              </div>
              <div className={styles.lineContainer}>
                <div className={styles.line} style={{ background: '#D64545' }}>
                  <p>Attack</p>
                  <div className={styles.rightDot}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bigCard}>
            <h4>Diamond</h4>
            <p className={styles.orangeDash}>Movement system Data</p>
            <p className={styles.redDash}>Fight system Data</p>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}>
              <div className={styles.leftDot}></div>
              <p>Move</p>
              <div className={styles.rightDot}></div>
            </div>
            <div
              className={styles.line}
              style={{
                background: '#D64545',
              }}
            >
              <div className={styles.leftDot}></div>
              <p>Attack</p>
              <div className={styles.rightDot}></div>
            </div>
          </div>
          <div className={styles.card}>
            <p style={{ margin: 'auto', fontWeight: 600 }}>Game client</p>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line} style={{ backgroundColor: '#27AB83' }}>
              <div className={styles.leftDot}></div>
              <p>Result</p>
              <img
                src="/images/arrow.png"
                alt="arrow"
                className={styles.arrow}
              />
            </div>
          </div>
          <img
            className={styles.gamefield}
            src="/images/gamefield-2.png"
            alt="gamefield"
          />
        </div>
      </div>
    </div>
  );
};
