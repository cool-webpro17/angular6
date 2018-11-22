import { Component, OnInit } from '@angular/core';
import { Category } from '../store/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { Firm } from './../store/firm';
import { AppState } from './app.state';
import * as CategoryActions from './../actions/category.actions';

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	locale: string;

	firms:Firm[];

	tempFirm: Firm;

	categories: Observable<Category[]>;

	constructor(private http: HttpClient, private store: Store<AppState>) {
	    this.categories = store.select('category');
  	}

	dropdownList = [];
  	selectedItems = [];
  	dropdownSettings = {};

	ngOnInit() {
		this.getFirms();
		this.getCategories();
	    this.locale = 'en';

	    this.dropdownSettings = {
	      singleSelection: false,
	      textField: 'name',
	      itemsShowLimit: 2,
	      allowSearchFilter: true,
	      enableCheckAll: false,
	    };
	}

	getFirms() {
	   	this.http.get<Firm[]>('https://testapi.io/api/rezunalex/Firms').subscribe((res)=>{
	        this.firms = res;
	        for (let i = 0; i < this.firms.length; i++) {
	        	this.firms[i].showFlag = true;
	        }
	    });
	}

	getCategories() {
		this.http.get<Category[]>('https://testapi.io/api/rezunalex/FirmCategories').subscribe((res)=>{
	        for (let i = 0; i < res.length; i++) {
	        	res[i].id = i;
	        }
	        this.dropdownList = res;
	    });
	}

	changeLocale(localeParam) {
		this.locale = localeParam;
	}

	onItemSelect(filter) {
		this.store.dispatch(new CategoryActions.AddCategory({id: filter.id, name: filter.name}) );
		for (let i = 0; i < this.firms.length; i++) {
			if (this.store.source.value.category.length == this.firms[i].mainCategory.length) {
				let tempFlag = true;
				for (let j = 0; j < this.firms[i].mainCategory.length; j++) {
					let tempCat = this.firms[i].mainCategory[j];
					let tempCategory = this.store.source.value.category.filter(function(e) {
						return e.name == tempCat;
					});
					if (tempCategory.length == 0) {
						tempFlag = false;
					}
				}
				this.firms[i].showFlag = tempFlag;
			} else {
				this.firms[i].showFlag = false;
			}
		}
	}

	onItemDeSelect(filter) {
		for (let i = 0; i < this.store.source.value.category.length; i++) {
			if (this.store.source.value.category[i].id == filter.id) {
				this.store.dispatch(new CategoryActions.RemoveCategory(i) );
			}
		}
		for (let i = 0; i < this.firms.length; i++) {
			if (this.store.source.value.category.length == 0) {
				this.firms[i].showFlag = true;
			} else {
				if (this.store.source.value.category.length == this.firms[i].mainCategory.length) {
					let tempFlag = true;
					for (let j = 0; j < this.firms[i].mainCategory.length; j++) {
						let tempCat = this.firms[i].mainCategory[j];
						let tempCategory = this.store.source.value.category.filter(function(e) {
							return e.name == tempCat;
						});
						if (tempCategory.length == 0) {
							tempFlag = false;
						}
					}
					this.firms[i].showFlag = tempFlag;
				} else {
					this.firms[i].showFlag = false;
				}
			}
		}
		
	}
}
