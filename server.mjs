/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import { bundle } from '@remotion/bundler';
import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import cors from 'cors'
import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: "isita",
	api_key: "739813596913426",
	api_secret: "_nBKrqtVT8ZZW5zK_jmT8KrICXc",
})

const app = express();
const port = process.env.PORT || 8000;
let compositionId;


app.use(
	cors({
		exposedHeaders: ["Authorization", "Content-type"],
	})
);

const cache = new Map();
app.use(cors());
app.get('/', async (req, res) => {


	compositionId = req.query.tipo
	console.log(req.query);
	const sendFile = (file) => {
		fs.createReadStream(file)
			.pipe(res)
			.on('close', () => {
				res.end();
			});
	};
	try {
		if (cache.get(JSON.stringify(req.query))) {
			cloudinary.v2.uploader.upload(`${cache.get(JSON.stringify(req.query))}`,
				{
					resource_type: "video",
					public_id: "",
					chunk_size: 6000000,
					upload_preset: "stories",
				},
				function (error, result) {
					console.log(result);
					console.log("-------------");
					console.log(error);
					res.json(result)
				});
			console.log('cached video sent!');

			return;
		}
		const bundled = await bundle(path.join(process.cwd(), './src/index.jsx'));
		const comps = await getCompositions(bundled);
		const video = comps.find((c) => c.id === compositionId);
		if (!video) {
			throw new Error(`No video called ${compositionId}`);
		}
		res.set('content-type', 'video/mp4');

		const tmpDir = await fs.promises.mkdtemp(
			path.join(os.tmpdir(), 'remotion-')
		);
		const { assetsInfo } = await renderFrames({
			config: video,
			webpackBundle: bundled,
			onStart: () => console.log('Rendering frames...'),
			onFrameUpdate: (f) => {
				if (f % 10 === 0) {
					console.log(`Rendered frame ${f}`);
				}
			},
			parallelism: null,
			outputDir: tmpDir,
			inputProps: req.query,
			compositionId,
			imageFormat: 'jpeg',
		});

		const finalOutput = path.join(tmpDir, 'out.mp4');
		await stitchFramesToVideo({
			dir: tmpDir,
			force: true,
			fps: video.fps,
			height: video.height,
			width: video.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
		});
		cache.set(JSON.stringify(req.query), finalOutput);
		console.log(finalOutput)

		cloudinary.v2.uploader.upload(`${finalOutput}`,
			{
				resource_type: "video",
				public_id: "",
				chunk_size: 6000000,
				upload_preset: "stories",
			},
			function (error, result) {
				console.log(result);
				console.log("-------------");
				console.log(error);
				res.json(result)

			});

		console.log('Video rendered and sent!');

	} catch (err) {
		console.error(err);
		res.json({
			error: err,
		});
	}
});

app.listen(port);

console.log(
	[
		`The server has started on http://localhost:${port}!`,
		'You can render a video by passing props as URL parameters.',
		'',
		'If you are running Hello World, try this:',
		'',
		`http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
		'',
	].join('\n')
);
