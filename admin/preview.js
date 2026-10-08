import { createTypstCompiler } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/+esm";
import { createWebWorker } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist/worker/browser.js";

const { useEffect, useState } = CMS.React;

const TypstPreview = ({ entry, getCollection, window }) => {
	const [result, setResult] = useState('');

	const body = entry.getIn(['data', 'body']);
	let bibliography = undefined;
	getCollection('_singletons').then(collection => {
		collection.filter((item) => {
			if (item.get('slug') === 'bibliography') {
				bibliography = item.getIn(['data', 'body']);
			}
		});
	});

	useEffect(() => {
		let disposed = false;
		let workerUrl = undefined;

		const typstCdn =
			"https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist";

		// A Worker must normally be same-origin with its page. This blob module
		// imports the worker entry from the CDN while giving Worker a same-origin URL.
		const workerEntry = `${typstCdn}/worker/web-worker.js`;
		workerUrl = URL.createObjectURL(
			new Blob([`import ${JSON.stringify(workerEntry)};`], {
				type: "text/javascript",
			}),
		);

		const render = async () => {
			try {
				const compiler = await createTypstCompiler({
					backend: "auto",
					worker: () => createWebWorker(workerUrl),
					coreModules: {
						"engine.core.wasm": WebAssembly.compileStreaming(
							fetch(`${typstCdn}/engine/engine.core.wasm`),
						),
						"engine.core2.wasm": WebAssembly.compileStreaming(
							fetch(`${typstCdn}/engine/engine.core2.wasm`),
						),
						"engine.core3.wasm": WebAssembly.compileStreaming(
							fetch(`${typstCdn}/engine/engine.core3.wasm`),
						),
					},
				});
				try {
					await compiler.addSource("index.typ", entry.getIn(['data', 'body']));
					await compiler.addSource("bibliography.yml", bibliography);
					const compiled = await compiler.compile({
						main: "index.typ",
						format: "html",
					});

					if (!disposed) setResult(compiled.output);
				} finally {
					await compiler.dispose();
					if (workerUrl) URL.revokeObjectURL(workerUrl);
				}
			} catch (cause) {
				if (!disposed)
					setError(cause instanceof Error ? cause.message : String(cause));
			}
		};
		void render();
		return () => {
			disposed = true;
		};
	}, [body]);

	const doc = new DOMParser().parseFromString(result || '', 'text/html');

	for (const anchorLink of doc.querySelectorAll('a[href^="#"]')) {
		anchorLink.setAttribute('href', `${window.location.href}${anchorLink.getAttribute('href')}`);
		anchorLink.setAttribute('target', '_self');
	};

	return html`<main dangerouslySetInnerHTML=${{ __html: doc.body.innerHTML }}></main>`;
};

CMS.registerPreviewTemplate('document', TypstPreview);
CMS.registerPreviewStyle('/admin/preview.css');
