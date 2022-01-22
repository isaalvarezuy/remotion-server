import { Composition } from 'remotion';
import { Anuncio2 } from './Anuncio2';
import { FinalPartido } from './FinalPartido'
export const RemotionVideo = () => {
	return (
		<>

			<Composition
				id="Anuncio"
				component={Anuncio2}
				durationInFrames={388}
				height={1820}
				width={1080}
				fps={30}
				defaultProps={{
					temaUno: 'tema 1',
					temaDos: 'tema 2',
					temaTres: 'tema 3',
					dia: 'Domingo',
					hora: '21:00hs'
				}}
			/>

			<Composition
				id="FinalPartido"
				component={FinalPartido}
				durationInFrames={300}
				height={1820}
				width={1080}
				fps={30}
				defaultProps={{
					momento: 'Final del Primer Tiempo',
					equipo1: 'Nacional',
					equipo2: 'Defensor',
					escudo1: 'https://res.cloudinary.com/isita/image/upload/v1640467870/static/escudos/Nacional-1_pe0w5a.png',
					escudo2: 'https://res.cloudinary.com/isita/image/upload/v1640467869/static/escudos/Defensor-1_tzycjb.png',
					puntaje1: '86',
					puntaje2: '78',
					deporte: 'https://res.cloudinary.com/isita/image/upload/v1640470419/static/canchas/Handball_vwi7tu.png',
					imgPartido: 'https://res.cloudinary.com/isita/image/upload/v1635200451/static/image_32_zjmn2y.png'
				}}

			/>








		</>
	);
};
