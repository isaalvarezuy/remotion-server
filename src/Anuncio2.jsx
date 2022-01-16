import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Video } from 'remotion'
import video from './video/logo.webm'
import './Anuncio.css'
import { useEffect, useState } from 'react';

export const Anuncio2 = (props) => {

  let { temaUno, temaDos, temaTres, dia, hora } = props

  const [wTema1, setWTema1] = useState(0)
  const [wTema2, setWTema2] = useState(0)
  const [wTema3, setWTema3] = useState(0)

  useEffect(() => {
    /* averiguo anchos */
    /* tema 1 */
    let tema1 = document.querySelector('#tema1');
    setWTema1(tema1.clientWidth);

    let tema2 = document.querySelector('#tema2');
    setWTema2(tema2.clientWidth);

    let tema3 = document.querySelector('#tema3');
    setWTema3(tema3.clientWidth);


  }, [])


  const frame = useCurrentFrame();

  const posBanda = interpolate(frame, [0, 300], [0, -380])

  const opacity1 = interpolate(frame, [0, 10, 20, 30], [0, 1, 1, 0])
  const opacity2 = interpolate(frame, [5, 15, 25, 35], [0, 1, 1, 0])
  const opacity3 = interpolate(frame, [10, 20, 30, 40], [0, 1, 1, 0])
  const opacity4 = interpolate(frame, [15, 25, 35, 45], [0, 1, 1, 0])
  const opacity5 = interpolate(frame, [20, 30, 40, 50], [0, 1, 1, 0])
  const opacity6 = interpolate(frame, [25, 35, 45, 55], [0, 1, 1, 0])
  const opacity7 = interpolate(frame, [30, 40, 50, 60], [0, 1, 1, 0])

  const pTema1 = interpolate(frame, [0, 60, 150], [1080, 1080, -wTema1], {
    extrapolateRight: "clamp",
  });

  const pTema2 = interpolate(frame, [0, 90, 180], [-wTema2, -wTema2, 1080], {
    extrapolateRight: "clamp",
  });

  const pTema3 = interpolate(frame, [0, 120, 210], [1080, 1080, -wTema3], {
    extrapolateRight: "clamp",
  });

  const oDia = interpolate(frame, [200, 201, 225, 226], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const oHora = interpolate(frame, [225, 226, 250, 251], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const oRadio = interpolate(frame, [250, 251, 275, 276], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });



  return (
    <div style={{ backgroundColor: "#171717", width: '100%', height: '100%' }}>

      <div style={{ width: '2280px', left: posBanda, top: 0 }} className="banda ">
        <span >HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO  </span>
      </div>
      <div style={{ width: '2280px', right: posBanda, bottom: 0 }} className="banda ">
        <span >HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO - HORARIO CONFIRMADO  </span>
      </div>
      <div className="videoContainer ">
        <div className="flickerContainer" >
          <span style={{ opacity: opacity1 }} >Hay programa </span>
          <span style={{ opacity: opacity2 }} >Hay programa  </span>
          <span style={{ opacity: opacity3 }} >Hay programa  </span>
          <span id="solid" style={{ opacity: opacity4, color: 'white' }} >Hay programa  </span>
          <span style={{ opacity: opacity5 }} >Hay programa  </span>
          <span style={{ opacity: opacity6 }} >Hay programa  </span>
          <span style={{ opacity: opacity7 }} >Hay programa  </span>
        </div>
        <div className="temas" style={{ width: '100%' }}>
          <span id="tema1" style={{ transform: `translateX(${pTema1}px)` }}>{props.temaUno}</span>
          <span id="tema2" style={{ transform: `translateX(${pTema2}px)` }} >{props.temaDos}</span>
          <span id="tema3" style={{ transform: `translateX(${pTema3}px)` }}>{props.temaTres}</span>
        </div>
        <div className="horario">
          <span style={{ opacity: oDia }}>Este {dia}</span>
          <span style={{ opacity: oHora }}>a las {hora}</span>
          <span style={{ opacity: oRadio }}>en Radio Universal </span>
        </div>
      </div >
      <div className="logoContainer">
        <Sequence from={280}>
          <Video
            src={video}
            startFrom={0} // if video is 30fps, then it will start at 2s
            endAt={120} // if video is 30fps, then it will end at 4s
            style={{ height: 1080 / 2, width: 1920 / 2 }}
          />
        </Sequence>
      </div>
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        The current frame is {frame}.
    </div>
    </div >
  );
};
