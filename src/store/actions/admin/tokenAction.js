import {createAction} from '@reduxjs/toolkit'

export const storeToken = createAction("token/storeToken")
export const removeToken = createAction("token/removeToken")