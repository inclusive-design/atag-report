import { readFile, writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { createTypstCompiler } from 'typst-wasm';
import { createWorkerThread } from 'typst-wasm/worker/node';
import { convert } from 'pandoc-wasm';
import { parseHTML } from 'linkedom';

/**
 * @param {import("@awesome.me/buildawesome").UserConfig} $config An instance of Eleventy's UserConfig class.
 */
export default function buildawesomeConfig($config) {
	$config.ignores.add('CHANGELOG.md');
	$config.ignores.add('LICENSE.md');
	$config.ignores.add('README.md');

	$config.addTemplateFormats('typ');

	$config.addExtension('typ', {
		async compile(inputContent) {
			// Load bibliography
			const bibliography = await readFile('bibliography.yml').then((result) => result.toString());
			const isDisposed = false;
			// Initialize variables for outputs outside try/catch
			let html;

			try {
				const engine1 = await readFile(new URL(import.meta.resolve('typst-wasm/engine/engine.core.wasm')));
				const engine2 = await readFile(new URL(import.meta.resolve('typst-wasm/engine/engine.core2.wasm')));
				const engine3 = await readFile(new URL(import.meta.resolve('typst-wasm/engine/engine.core3.wasm')));

				// Set up the compiler
				const compiler = await createTypstCompiler({
					backend: 'worker',
					coreModules: {
						'engine.core.wasm': WebAssembly.compile(engine1),
						'engine.core2.wasm': WebAssembly.compile(engine2),
						'engine.core3.wasm': WebAssembly.compile(engine3),
					},
					worker: () =>
						createWorkerThread(new URL(import.meta.resolve('typst-wasm/worker/worker-thread'))),
				});

				try {
					const newCMMathFont = await readFile(new URL(import.meta.resolve('@typst-wasm/fonts/NewCMMath-Regular.otf')));

					// Add required fonts
					await compiler.addFonts(new Uint8Array(newCMMathFont));

					// Set source
					await compiler.addSource('index.typ', inputContent);
					// Set bibliography
					await compiler.addSource('bibliography.yml', bibliography);

					// Compile HTML
					html = await compiler.compile({
						main: 'index.typ',
						format: 'html',
					});

					// Compile PDF
					const pdf = await compiler.compile({
						main: 'index.typ',
						format: 'pdf',
					});

					// Convert HTML to Word
					const docx = await convert({ from: 'html', to: 'docx', 'output-file': 'download.docx' }, html.output);
					const buffer = Buffer.from(await docx.files['download.docx'].arrayBuffer());

					// Write PDF and Word files.
					await writeFile('_site/download.pdf', pdf.output);
					await writeFile('_site/download.docx', buffer);

					// Return HTML for output.
					return async () => html.output;
				} finally {
					await compiler.dispose();
				}
			} catch (error) {
				if (!isDisposed) {
					console.error(error instanceof Error ? error.message : String(error));
				}
			}
		},
	});

	$config.addTransform('parse', async (value, outputPath) => {
		if (!outputPath || !outputPath.includes('.html')) {
			return value;
		}

		const { document } = parseHTML(value);
		for (const element of document.querySelectorAll('[style]')) {
			element.removeAttribute('style');
		}

		return document.toString();
	});

	$config.addPassthroughCopy('admin/preview.js');
	$config.addPassthroughCopy('admin/preview.css');
	$config.addPassthroughCopy('admin/config.yml');
}
