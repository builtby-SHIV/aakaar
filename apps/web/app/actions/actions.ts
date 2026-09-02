'use server';

import { signIn, signOut } from "../auth";

export async function googleLogIn (formData: FormData) {
    const action = formData.get('action');
    if (typeof action === 'string')
        await signIn(action, {redirectTo: '/dashboard'});
}

export async function googleLogOut (formData: FormData) {
    const action = formData.get('action');
    if (typeof action === 'string')
        await signOut({redirectTo: '/'});
}