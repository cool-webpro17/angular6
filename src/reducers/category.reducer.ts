import { Action } from '@ngrx/store'
import { Category } from './../store/category'
import * as CategoryActions from './../actions/category.actions'

export function reducer(state: Category[] = [], action: CategoryActions.Actions) {

    switch(action.type) {
        case CategoryActions.ADD_CATEGORY:
            return [...state, action.payload];
       	case CategoryActions.REMOVE_CATEGORY:
            state.splice(action.payload, 1)
            return state;
        default:
            return state;
    }
}