import { createTypstCompiler } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/+esm";
import { createWebWorker } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist/worker/browser.js";

const { useEffect, useState } = CMS.React;

// TODO: fetch using collections
const bibliography = await fetch('/bibliography.yml').then(response => response.blob()).then(blob => blob.text());

const TypstPreview = ({ entry }) => {
	const [result, setResult] = useState('');

	const body = entry.getIn(['data', 'body']);

	useEffect(() => {
		let cancelled = false;
		let compiler = null;
		let workerUrl = null;

		(async () => {
			const typstCdn =
				"https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist";
			const fontsCdn =
				"https://cdn.jsdelivr.net/npm/@typst-wasm/fonts@1.0.0/dist/files";

			// A Worker must normally be same-origin with its page. This blob module
			// imports the worker entry from the CDN while giving Worker a same-origin URL.
			const workerEntry = `${typstCdn}/worker/web-worker.js`;
			workerUrl = URL.createObjectURL(
				new Blob([`import ${JSON.stringify(workerEntry)};`], {
					type: "text/javascript",
				}),
			);

			compiler = await createTypstCompiler({
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

			await compiler.addSource("index.typ", entry.getIn(['data', 'body']));
			await compiler.addSource("bibliography.yml", bibliography);

			const compiled = await compiler.compile({
				main: "index.typ",
				format: "html",
			});

			if (!cancelled) setResult(compiled.output);


		})();

		return () => {
			cancelled = true;
			compiler?.dispose?.();
			if (workerUrl) URL.revokeObjectURL(workerUrl);
		};
	}, [body]);

	const doc = new DOMParser().parseFromString(result || '', 'text/html');

	return h('main', { dangerouslySetInnerHTML: { __html: doc.body.innerHTML } });
};

// TODO: Add preview style.
CMS.registerPreviewTemplate('document', TypstPreview);

/* import { createTypstCompiler } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist/index.js";
import { createWebWorker } from "https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist/worker/browser.js";

const { useEffect, useState } = CMS.React;

// TODO: fetch using collections
const bibliography = await fetch('/bibliography.yml').then(response => response.blob()).then(blob => blob.text());

const TypstPreview = ({ entry }) => {
	const [result, setResult] = useState('');

	const body = entry.getIn(['data', 'body']);

	useEffect(() => {
		let disposed = false;
		let workerUrl = undefined;

		const typstCdn =
			"https://cdn.jsdelivr.net/npm/typst-wasm@1.0.0/dist";
		const fontsCdn =
			"https://cdn.jsdelivr.net/npm/@typst-wasm/fonts@1.0.0/dist/files";

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

	return html`<main dangerouslySetInnerHTML=${{ __html: doc.body.innerHTML }}></main>`;
};

// const DocPreview = createClass({
// 	getInitialState: function () {
// 		return { bibliography: undefined };
// 	},
//
// 	componentDidMount: function () {
// 		const { getCollection } = this.props;
// 		const relatedSlugs = this.props.entry.getIn(['data', 'related_products']) ?? [];
//
// 		getCollection('products').then((products) => {
// 			const related = products.filter(function (product) {
// 				const slug = product.get('slug');
// 				return relatedSlugs.includes(slug);
// 			});
// 			this.setState({ relatedProducts: related });
// 		});
// 	},
//
// 	render: function () {
// 		const { entry } = this.props;
// 		const { bibliography } = this.state;
//
// 		return html`<main dangerouslySetInnerHTML=${{ __html: doc.body.innerHTML }}></main>`;
// 	},
// });

// TODO: Add preview style.
CMS.registerPreviewTemplate('document', TypstPreview);
*/
