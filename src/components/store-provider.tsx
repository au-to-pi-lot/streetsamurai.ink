'use client'
import React, {useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '../lib/store'

export type StoreProviderProps = {} & React.PropsWithChildren;

const StoreProvider = ({children}: StoreProviderProps) =>    {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider;