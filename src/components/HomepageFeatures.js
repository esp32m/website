import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Modular, extensible, event-driven framework',
    Svg: require('../../static/img/undraw_Wireframing_re_q6k6.svg').default,
    description: (
      <>
        Built on top of <a href="https://docs.espressif.com/projects/esp-idf/en/latest/"><b>ESP-IDF</b></a>, it aims to be as simple and user-friendly as Arduino is, designed to kickstart your project in minutes.
      </>
    ),
  },
  {
    title: 'On-chip responsive UI',
    Svg: require('../../static/img/undraw_app_data_re_vg5c.svg').default,
    description: (
      <>
        Interact with your ESP32 and attached devices via modern React UI, served directly from the microchip, mobile and desktop browser-friendly.
      </>
    ),
  },
  {
    title: 'Real-time and historical sensor monitoring',
    Svg: require('../../static/img/undraw_visual_data_re_mxxo.svg').default,
    description: (
      <>
        Monitor your sensors in UI, collect readings in <b><a href="//www.influxdata.com/">Influx</a></b> and visualize in <b><a href="//www.influxdata.com/time-series-platform/chronograf/">Chronograf</a></b>. Feed the data into your own application via MQTT / WebSockets API.
      </>
    ),
  },
  {
    title: 'Remote logging and debugging',
    Svg: require('../../static/img/undraw_programming_2svr.svg').default,
    description: (
      <>
        Send logs to remote <b>rsyslog</b> server, save to flash, or design your own appender. Monitor/change digital pin states, use <b>PWM</b>, <b>ADC</b>, <b>pulse counters</b> and many more ESP32 hardware features from within UI
      </>
    ),
  },
  {
    title: 'True multitasking',
    Svg: require('../../static/img/undraw_multitasking_hqg3.svg').default,
    description: (
      <>
        Interact with many different devices from separate threads at the same time, even on a single bus like <b>I2C</b>. Leave synchronization, locking and handling race conditions to the framework.
      </>
    ),
  },
  {
    title: 'Built-in OTA upload support',
    Svg: require('../../static/img/undraw_Update_re_swkp.svg').default,
    description: (
      <>
        Upload new firmware from the designated HTTP server easily, via UI, MQTT or WebSockets command.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
