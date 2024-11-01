'use server';

export async function signup(_previousState, formData) {
    console.log('^^^ PREVIOUS STATE ^^^', _previousState)
    const email = formData.get('email');
    const password = formData.get('password');

    // Validate data
    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address.';
    }

    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long.'
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // Store in dat
}