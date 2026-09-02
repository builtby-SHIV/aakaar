import React from 'react'
import { googleLogIn } from '../app/actions/actions'
import { signIn } from '../app/auth'
// import { signIn } from 'next-auth/react'

const LogIn = () => {
    return (
        <form
            action={googleLogIn}
        >
            <button
                type='submit'
                value='google'
                name='action'
            >
                Sign In With Google
            </button>
        </form>
    )
}

export default LogIn
