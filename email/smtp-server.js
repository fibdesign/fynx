import { SMTPServer } from 'smtp-server'
import { simpleParser } from 'mailparser'
import fs from 'fs'
import path from 'path'


const LAST_EMAIL_FILE = path.resolve('./email/last-email.json')

const server = new SMTPServer({
  authOptional: true,
  secure: false,        // explicitly disable TLS
  disabledCommands: ['STARTTLS', 'AUTH'], // remove encryption options
  onData(stream, session, callback) {
    simpleParser(stream)
      .then(parsed => {
        const email = {
          from: parsed.from?.text || '',
          to: parsed.to?.text || '',
          subject: parsed.subject || '(no subject)',
          html: parsed.html || '',
          text: parsed.text || '',
          date: new Date().toISOString(),
        }

        fs.writeFileSync(LAST_EMAIL_FILE, JSON.stringify(email, null, 2))

        if (process.send) {
          process.send({ type: 'new-email', email })
        }
      })
      .catch(err => console.error('Email parse error:', err))
      .finally(callback)
  },
})

server.listen(2525, '127.0.0.1', () => {
  console.log('SMTP server running on localhost:2525')
})
