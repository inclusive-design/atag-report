import { readFile, writeFile } from "node:fs/promises";
import { createTypstCompiler } from "typst-wasm";
import { createWorkerThread } from "typst-wasm/worker/node";

/**
 * @param {import("@awesome.me/buildawesome").UserConfig} config An instance of Eleventy's UserConfig class.
 * @returns {object} The configuration object.
 */
export default function ($config) {
	$config.addTemplateFormats('typ');

	/* $config.addExtension("typ", {
	compile: async (inputContent) => {
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

		let result;

		try {
			await compiler.addSource("index.typ", inputContent);
			result = await compiler.compile({
				main: "index.typ",
				format: "html",
			});

		} finally {
			await compiler.dispose();
		}

		return result.output;
	},
	}); */

	$config.addPassthroughCopy('admin/preview.js');
	$config.addPassthroughCopy('admin/preview.css');
	$config.addPassthroughCopy('admin/config.yml');
	$config.addPassthroughCopy('bibliography.yml');
}
