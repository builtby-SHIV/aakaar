'use server';

import { signIn } from "../auth";

export async function googleLogIn (formData: FormData) {
    const action = formData.get('action');
    if (typeof action === 'string')
        await signIn(action, {redirectTo: '/dashboard'});
}