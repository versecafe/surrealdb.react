'use client';

import { Token } from 'surrealdb.js/types';
import { fetcherFactory } from '../library/fetcherFactory';
import { AbstractMutationParameters, useAbstractMutation } from './useAbstract';
import { useAuthUpdated } from './useAuthUpdated';

export function useAuthenticate<Error = unknown>(
    abstractArguments: AbstractMutationParameters = {}
) {
    const authUpdated = useAuthUpdated();

    type Args = [token: Token];
    const key = JSON.stringify(['__auth', 'authenticate']);
    const fetcher = fetcherFactory<Args, boolean, Error>(
        'mutation',
        key,
        ({ surreal }, token) => surreal.authenticate(token).finally(authUpdated)
    );

    return useAbstractMutation<Args, boolean, Error>(
        key,
        fetcher,
        abstractArguments
    );
}
