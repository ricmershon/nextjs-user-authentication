'use server';

import { redirect } from "next/navigation";

import { createUser, getUserByEmail } from "./user";
import { hashUserPassword, verifyPassword } from "./utils";
import { createAuthSession } from "./auth";

export async function signup(_previousState, formData) {
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

    // Store data
    const hashedPassword = hashUserPassword(password);

    try {
        const userId = createUser(email, hashedPassword);
        await createAuthSession(userId)
        redirect('/training');
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'Account for the chosen email already exists.'
                }
            };
        }
        throw error;
    }
}

export async function login(_previousState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                email: 'Could not authenticate user. Please check credentials.'
            }
        }
    }

    const isValidPassword = verifyPassword(exisitingUser.password, password);

    if (!isValidPassword) {
        return {
            errors: {
                email: 'Could not authenticate user. Please check credentials.'
            }
        }
    }

    await createAuthSession(existingUser.id);
    redirect('/training');
}