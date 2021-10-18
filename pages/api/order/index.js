// const bot = new Telegraf('');
// bot.start(ctx => ctx.reply(`
// Hi, I'm a simple bot (please write /help)
// `))
// bot.help(ctx => ctx.reply(`
//    Hello world!
// `))

const BOT_TOKEN = '2055901371:AAHPHXZe7td2vUYhVsFOmP4iB6f95kkEaZk';
const CHANEL_ID = -1001648324188;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

export default async (req, res) => {
    const { method, body } = req;
    switch (method) {
        case 'POST':
            try {
                const organization = body.organization;
                const name = body.name;
                const note = body.note;
                const contact = body.contact;
                const phone = body.phone;
                const selected = body.selected.map(item => item.title);

                const message = `<strong>Новый желающий</strong>\n🏛<strong>Организация: </strong>${organization}\n👦<strong>Имя человека: </strong>${name}\n📱<strong>Контакт: </strong>${contact}\n📞<strong>Контакт: </strong>${phone}\n📄<strong>Выбранные услуги: </strong>${selected}\n💬 <strong>Коментарий: </strong>${note || 'Нет коментария'}`;
                const text = encodeURIComponent(message);
                const url = `${TELEGRAM_API}?chat_id=${CHANEL_ID}&text=${text}&parse_mode=HTML`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.ok === true) {
                    res.status(200).json({ statusCode: 200 });
                } else {
                    res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
                }
            } catch (error) {
                res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            }
            break;
        default:
            res.status(400).json({ statusCode: 400, message: 'Что то пошло не так...' });
            break;
    }
}