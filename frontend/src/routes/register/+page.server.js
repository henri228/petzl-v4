import { AuthAPIError } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
 
export const actions = {
    register: async({request, locals}) => {
        const body = Object.fromEntries(await request.formData())

        const { data, err } = await locals.sb.auth.signUp({
            email: body.email,
            password: body.password,
        })

        if(err){
            if(err instanceof AuthAPIError && err.status === 400){
                return fail(400, {
                    error: 'Invalid email or password'
                })
            }
            return fail(500, {
                error: 'Server error. Please try again later.'
            })
        }

        throw redirect(303, '/')
    }    
};