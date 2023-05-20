import { TableFilter } from '../../utils/TableFilter.js';
import { ElementBuilder } from '../../utils/ElementBuilder.js';

export class TurnosFilter {
	constructor() {
		const $link = ElementBuilder.createElement('link', '', {
			rel: 'stylesheet',
			href: 'scripts/components/turnos-filter/turnos-filter.css',
		});

		document.head.appendChild($link);
		this.$container = document.querySelector('section.detail-section');
		this.$container.innerHTML = '';
		this.filter = new TableFilter(this.$container);

		this.url = 'scripts/components/turnos-filter/assets/turnos.json';

		this.createPages();
		this.addEvents();
		this.sort = false;
		this.textFilter = '';
	}

	addEvents() {
		document.addEventListener('change', (event) => {
			if (event.target === this.filter.$range) {
				this.createPages();
			}
		});

		document.addEventListener('change', (event) => {
			if (event.target.name === 'order') {
				if (event.target.value === 'up') {
					this.createPages();
					this.sort = 'up';
				} else {
					this.createPages();
					this.sort = 'down';
				}
			}
		});

		const $filterInput = document.getElementById('filter-text');
		$filterInput.addEventListener('input', (event) => {
			this.textFilter = event.target.value;
			this.createPages();
		});
	}

	async getData() {
		const response = await fetch(this.url);
		const data = await response.json();
		return data;
	}

	async createPages() {
		let data = await this.getData();
		data = this.filter.dataFilter(data, this.textFilter, [
			'profesional',
			'especialidad',
		]);

		if (this.sort) {
			data = this.filter.sort(data, this.sort, 'date');
		}

		this.pages = this.filter.setPages(data, this.filter.$range.value);
		const $index = this.filter.createIndex(
			this.pages.length,
			this.pages,
			this.loadPage
		);
		this.$container.appendChild($index);
		this.loadPage(this.pages, 0, $index);
		document.getElementById('filter-text').focus();
	}

	loadPage(pages, indexNumber, index) {
		const $container = document.querySelector('section.detail-section');
		const $filter = document.querySelector('.result-filter-container');
		$container.innerHTML = '';
		$container.appendChild($filter);
		if (pages.length > 0) {
			for (let turno of pages[indexNumber]) {
				const $details = ElementBuilder.createElement('details', '', {
					class: 'search-result',
				});
				$details.innerHTML = `
                    <summary data-id="<?= $turno->getId() ?>">Turno
                        ${turno.id}
                    </summary>
                    <h4>Información del turno</h4>
                    <ul>
                        <li>Médico:
                            ${turno.profesional}
                        </li>
                        <li>Especialidad:
                            ${turno.especialidad}
                        </li>
                        <li>Fecha:
                            ${turno.date}
                        </li>
                        <li>Hora:
                            ${turno.time}
                        </li>
                    </ul>
                    <button class='cancelar-turno'>Cancelar turno</button>;
		    	`;

				$container.appendChild($details);
			}
		}
		$container.appendChild(index);
	}
}