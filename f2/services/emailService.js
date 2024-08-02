import { convert } from 'html-to-text';
import nodemailer from 'nodemailer';
import { dirname, join } from 'path';
import pug from 'pug';
import { fileURLToPath } from 'url';

class Email {
    constructor(user, url) {
        this.to = user.email;
        this.name = user.name;
        this.url = url;
        this.from = process.env.EMAIL_FROM;
    }

    static #initTransport() {
        if (process.env.NODE_ENV === 'production') {
            // use MAILGUN ...
            return nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
        }

        return nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async #send(template, subject, preheader) {
        const html = pug.renderFile(join(dirname(fileURLToPath(import.meta.url)), '..', 'views', 'emails', `${template}.pug`), {
            name: this.name,
            url: this.url,
            subject,
            preheader,
        });
        const emailConfig = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: convert(html),
        };

        await Email.#initTransport().sendMail(emailConfig);
    }

    async sendHello() {
        await this.#send('hello', 'Wellcome email');
    }

    async sendVerification() {
        await this.#send('verification', 'Verify you email');
    }

    async sendRestorePassword() {
        await this.#send('restorePassword', 'Password reset instractions');
    }
}

export default Email;
