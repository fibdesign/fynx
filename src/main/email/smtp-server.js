import { SMTPServer } from 'smtp-server'
import { simpleParser } from 'mailparser'
import fs from 'fs'
import { join } from 'path'

import { app } from 'electron'
export const LAST_EMAIL_FILE = join(app.getPath('userData'), 'last-email.json')

export const startSMTPServer = (onNewEmail) => {
  const server = new SMTPServer({
    authOptional: true,
    secure: false,
    disabledCommands: ['STARTTLS', 'AUTH'],
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

          // call callback
          if (onNewEmail) onNewEmail(email)
        })
        .catch(err => console.error('Email parse error:', err))
        .finally(callback)
    },
  })

  server.listen(2525, '127.0.0.1', () => {
    console.log('SMTP server running on localhost:2525')
  })

  return server
}
