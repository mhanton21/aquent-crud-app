import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

  items: any[] = []
  totalPages = 0;
  itemsPerPage = 0;
  currentPage = 1;

  constructor() { }

  updateData(items: any[]) {
    this.items = items;
    const totalItems = this.items.length;
    this.itemsPerPage = (totalItems <= 100)
      ? (totalItems <= 50 ? 5 : 10)
      : Math.min(10, Math.ceil(totalItems / 10));
    this.totalPages = Math.ceil(totalItems / this.itemsPerPage);
    this.generatePaginationLinks();
  }

  getPageData() {
    return this.items.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  generatePaginationLinks() {
    const ul = document.querySelector('.pagination');
    if (ul != null) {
      ul.innerHTML = '';

      for (let i = 1; i <= this.totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === this.currentPage) {
          li.classList.add('active');
        }
        li.addEventListener('click', () => this.changePage(i));

        const a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i.toString();
        li.appendChild(a);

        ul.appendChild(li);
      }
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.generatePaginationLinks();
  }
}
