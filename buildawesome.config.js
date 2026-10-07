import { readFile, writeFile } from "node:fs/promises";
import { createTypstCompiler } from "typst-wasm";
import { createWorkerThread } from "typst-wasm/worker/node";
import HtmlToDocx from "@turbodocx/html-to-docx";
import { parseHTML } from 'linkedom';

/**
 * @param {import("@awesome.me/buildawesome").UserConfig} config An instance of Eleventy's UserConfig class.
 * @returns {object} The configuration object.
 */
export default function ($config) {

	$config.addTemplateFormats('typ');

	$config.addExtension("typ", {
		compile: async (inputContent) => {
			const bibliography = await readFile('bibliography.yml').then(result => result.toString());
			let disposed = false;
			let html, docx, pdf;

			try {
				const compiler = await createTypstCompiler({
					backend: "worker",
					coreModules: {
						"engine.core.wasm": WebAssembly.compile(
							await readFile(
								new URL(import.meta.resolve("typst-wasm/engine/engine.core.wasm")),
							),
						),
						"engine.core2.wasm": WebAssembly.compile(
							await readFile(
								new URL(import.meta.resolve("typst-wasm/engine/engine.core2.wasm")),
							),
						),
						"engine.core3.wasm": WebAssembly.compile(
							await readFile(
								new URL(import.meta.resolve("typst-wasm/engine/engine.core3.wasm")),
							),
						),
					},
					worker: () =>
						createWorkerThread(
							new URL(import.meta.resolve("typst-wasm/worker/worker-thread")),
						),
				});

				try {
					await compiler.addFonts(
						new Uint8Array(
							await readFile(
								new URL(
									import.meta.resolve("@typst-wasm/fonts/NewCMMath-Regular.otf"),
								),
							),
						),
					);

					await compiler.addSource("index.typ", inputContent);
					await compiler.addSource("bibliography.yml", bibliography);

					html = await compiler.compile({
						main: "index.typ",
						format: "html",
					});

					pdf = await compiler.compile({
						main: "index.typ",
						format: "pdf"
					});

					docx = await HtmlToDocx(html.output);

				} finally {
					await writeFile('_site/download.pdf', pdf.output);
					await writeFile('_site/download.docx', docx);
					await compiler.dispose();
					return async () => html.output;
				}
			} catch (cause) {
				if (!disposed)
					console.error(cause instanceof Error ? cause.message : String(cause));
			}
		},
	});

	$config.addTransform('parse', async function (value, outputPath) {
		if (!outputPath || !outputPath.includes('.html')) {
			return value;
		}

		const { document } = parseHTML(value);
		document.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
		return document.toString();
	});

	$config.addPassthroughCopy('admin/preview.js');
	$config.addPassthroughCopy('admin/preview.css');
	$config.addPassthroughCopy('admin/config.yml');
}
