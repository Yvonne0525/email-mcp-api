const { ImapFlow } = require('imapflow');
const mailparser = require('mailparser');

export default async function handler(req, res) {
  const client = new ImapFlow({
    host: 'imap.qq.com', port: 993, secure: true,
    auth: { user: process.env.QQ_MAIL, pass: process.env.QQ_PASS }
  });
  await client.connect();
  let lock = await client.getMailboxLock('INBOX');
  let messages = [];
  for await (let msg of client.fetch({ recent: true }, { source: true })) {
    let parsed = await mailparser.simpleParser(msg.source);
    messages.push({ from: parsed.from.text, subject: parsed.subject, text: parsed.text });
  }
  lock.release();
  await client.logout();
  res.json(messages);
}

