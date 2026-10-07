import { readFile, writeFile } from "node:fs/promises";
import { createTypstCompiler } from "typst-wasm";
import { createWorkerThread } from "typst-wasm/worker/node";

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
			let html, pdf;

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
						format: "pdf",
					});

				} finally {
					await writeFile('_site/download.pdf', pdf.output);
					await compiler.dispose();
					return async () => html.output;
				}
			} catch (cause) {
				if (!disposed)
					console.error(cause instanceof Error ? cause.message : String(cause));
			}
		},
	});

	$config.addPassthroughCopy('admin/preview.js');
	$config.addPassthroughCopy('admin/preview.css');
	$config.addPassthroughCopy('admin/config.yml');
	$config.addPassthroughCopy('bibliography.yml');
}
