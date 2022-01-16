import { interpolate, Sequence, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { Logo } from './Logo'
import { Img } from 'remotion'
import './FinalPartido.css'
import { useEffect, useState } from 'react'

export const FinalPartido = (props) => {
  let { equipo1, equipo2, escudo1, escudo2, puntaje1, puntaje2, deporte, imgPartido } = props

  const [wEquipos, setWEquipos] = useState(0)

  useEffect(() => {
    let equipos = document.querySelector('#nombresEquipos');
    console.log(equipos.clientWidth)
    console.log((equipos.clientWidth) + 60)
    setWEquipos((equipos.clientWidth) + 60)
  }, [])


  const frame = useCurrentFrame();

  const desplazamientoXFinal = interpolate(frame, [0, 30], [100, 0], {
    easing: Easing.bezier(0.76, -0.01, 1, 1),
    extrapolateRight: "clamp",
  });

  const desplazamientoYImagen = interpolate(frame, [0, 30, 60], [100, 100, 0], {
    easing: Easing.bezier(0.76, -0.01, 1, 1),
    extrapolateRight: "clamp",
  });

  const desplazamientoXEquipos = interpolate(frame, [0, 60, 90], [100, 100, 0], {
    easing: Easing.bezier(0.76, -0.01, 1, 1),
    extrapolateRight: "clamp",
  });


  const oEquipo1 = interpolate(frame, [0, 95, 105], [0, 0, 1], {
    extrapolateRight: "clamp",
  });
  const oPuntaje1 = interpolate(frame, [0, 110, 120], [0, 0, 1], {
    extrapolateRight: "clamp",
  });
  const oEquipo2 = interpolate(frame, [0, 125, 135], [0, 0, 1], {
    extrapolateRight: "clamp",
  });
  const oPuntaje2 = interpolate(frame, [0, 140, 150], [0, 0, 1], {
    extrapolateRight: "clamp",
  });


  return (
    <div style={{ position: 'relative', height: '1920px', width: '1080px', background: `url(${deporte}) center center /cover`, backgroundColor: '#171717' }}>
      <div id="divFinalPartido" style={{ clipPath: `inset(0 ${desplazamientoXFinal}% 0 0)` }}><p>Final del partido</p></div>


      <div id="contenedorImg" style={{ clipPath: `inset(0 0 ${desplazamientoYImagen}% 0)`, background: `url(${imgPartido}) center center /cover` }}>
      </div>

      <div id="divNombreEquipos" style={{ clipPath: `inset(0 ${desplazamientoXEquipos}% 0 0)` }}><p id="nombresEquipos">{equipo1} vs {equipo2}</p></div>

      <div id="resultados">
        <div id="escudo1" style={{ background: `url(${escudo1}) center center /contain`, opacity: `${oEquipo1}` }}></div>
        <p style={{ opacity: `${oPuntaje1}` }}>{puntaje1}</p>
        <div id="escudo2" style={{ background: `url(${escudo2}) center center /contain`, opacity: `${oEquipo2}` }}></div>
        <p style={{ opacity: `${oPuntaje2}` }}>{puntaje2}</p>
      </div>

    </div>
  );
};
