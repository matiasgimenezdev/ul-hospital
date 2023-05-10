import { ElementBuilder } from './ElementBuilder.js';

export class ScriptLoader {
	static loadScript(scriptName, url, callbackFunction) {
		let element = document.querySelector(`script #${scriptName}`);
		if (!element) {
			element = ElementBuilder.createElement('script', '', {
				src: url,
				id: scriptName,
				type: 'module',
			});

			element.addEventListener('load', callbackFunction);

			document.head.appendChild(element);
		}

		return element;
	}
}
