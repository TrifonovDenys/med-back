class Email {
    constructor(user, url) {
        (this.to = user.email), (this.name = user.name), (this.url = url), (this.from = process.env.EMAIL_FROM);
    }
}
