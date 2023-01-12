import composeExtension from '@harlem/extension-compose';
import actionExtension from '@harlem/extension-action';
import storageExtension from '@harlem/extension-storage';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    reset,
    computeState,
    isActionRunning,
} = createStore('app', {
    firstName: 'Nanang',
    lastName: 'Rustianto',
    yolk: 500
}, {
    extensions: [
        composeExtension(),
        actionExtension(),
        storageExtension({
            prefix: 'vite-ts-actions',
            restore: true,
        }),
    ],
});

let actionHandle: number | undefined;
let team = "";
let city = "";

export const fullName = getter('fullname', ({ firstName, lastName }) => `${firstName} ${lastName}`);
export const yolk = getter('yolk', ({ yolk }) => `${yolk}`);



export const getNewName = action('get-new-name', async (timeout: number, mutate, controller, onAbort) => {
    onAbort(() => window.clearTimeout(actionHandle));

    const setName = () => mutate(state => {
        state.firstName = "Hana";
        state.lastName = "Antara";
    });

    await new Promise(resolve => {
        actionHandle = window.setTimeout(() => (setName(), resolve(true)), timeout);
    });
});

export const fetchNewName = action('fetch-new-name', async (payload, mutate, { signal }) => {

 const responsez = await fetch( 'https://www.pps-stie-nobel.org/api/harlem/detail/?id='+localStorage.getItem('id-cari'), {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key'     : 'A7980EB02ADE9DD9FD90DDAB0AEF1676',
        'x-token'       : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMzE5OCJ9LCJpYXQiOjE2NzM0Nzg3NzEsImV4cCI6MTY3MzU2NTE3MX0.3NYjQjfImaXwW6c0OZPajG6_NNiCx-iybATcBaEpKWU'
    },
    body: null,
} ).then(res => {
            return res.json();
         })
         .then(tickets => {
       
                team = tickets.data.harlem.firstName;
                city = tickets.data.harlem.lastName;

                mutate(state => {
                    state.firstName = team;
                    state.lastName = city;
                });

         }) ;

});

 
export const fetchNewName0 = action('fetch-new-name', async (payload, mutate, { signal }) => {
    
    const response = await fetch('https://pps-stie-nobel.org/api/harlem/get/?id=1', { signal });

    const {
        firstName = "NAMA API",
        lastName= "AHA",
    } = await response.json();

    mutate(state => {
        state.firstName = team;
        state.lastName = city;
    });
});


