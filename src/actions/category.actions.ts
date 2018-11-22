import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Category } from './../store/category'

export const ADD_CATEGORY       = '[CATEGORY] Add'
export const REMOVE_CATEGORY    = '[CATEGORY] Remove'

export class AddCategory implements Action {
    readonly type = ADD_CATEGORY

    constructor(public payload: Category) {}
}

export class RemoveCategory implements Action {
    readonly type = REMOVE_CATEGORY

    constructor(public payload: number) {}
}

export type Actions = AddCategory | RemoveCategory