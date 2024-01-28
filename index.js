const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, Collection, PermissionsBitField } = require('discord.js');

require("./.env")
const discord = require('discord.js');

const client = new Client({ intents: Object.values(GatewayIntentBits), });
//const { getcash, addcash, showcash } = require('./bank.js');

client.on('ready', () => {
  console.log(`${client.user.tag}`);
    setInterval(() => {
client.user.setPresence({ activities: [{ name: `מחובר ל-${client.guilds.cache.size} שרתים` }], status: 'online' });
      }, 10000); 
  //client.user.setAvatar('https://images-ext-2.discordapp.net/external/7kG8GvaAyFTW94FQsZCs8yiC3GDDqorEamYmQhePvI4/https/cdn.discordapp.com/embed/avatars/3.png');

  
  const embed = new EmbedBuilder()
            .setTimestamp()
            .setTitle(`מחובר!`)
            .setColor('Green');

        const channel = client.channels.cache.get("1110493392242221168");
  //console.log(channel)
        if (channel) {
            channel.send({embeds: [embed]});
        }
});

const fs = require('fs');

client.on('messageCreate', (message) => {
  if (message.content === "שלום") {
    message.reply("שלום!");
  }
  if (message.content === "ping") {
    const ping = client.ws.ping;
    message.reply("ping: "+ping)
  }
});
/*

client.on('messageCreate', (message) => {
  if (message.content === '!embed') {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('1')
          .setLabel('1')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('2')
          .setLabel('2')
          .setStyle(ButtonStyle.Secondary)
      );
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('כותרת')
      .setDescription('תיאור')
      .setTimestamp();
    message.channel.send({ embeds: [embed], components: [row] });
  }
});


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

  if (interaction.customId === '1') {
    let set12 = new EmbedBuilder()
      .setColor("#4CC9F0")
      .setDescription("תיאור")
      .setTitle("1");
    interaction.reply({embeds: [set12]});
  }
  
    if (interaction.customId === '2') {
        interaction.reply('2');
    }
});*/


client.once('ready', () => {
    console.log('Bot is online!');
});

client.commands = new Collection();
const cooldowns = new Collection();

const prefix = '?';

const path = require('path');

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const commandFiles1 = fs.readdirSync('./commands/cmd').filter(file => file.endsWith('.js'));
const settingFiles = fs.readdirSync('./commands/setting').filter(file => file.endsWith('.js'));



for (const file of commandFiles1) {
    const command = require(`./commands/cmd/${file}`);
    command.category = 'cmd';
    client.commands.set(command.name, command);
  
}

for (const file of settingFiles) {
    const command = require(`./commands/setting/${file}`);
    command.category = 'settings';
    client.commands.set(command.name, command);
}



//const interaction = require('./events/interaction.js');

//client.on('interactionCreate', (i) => {interaction(i, client);});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
      const embed1 = new EmbedBuilder()
      .setAuthor({
                name: `${message.author.username}`,
      iconURL: message.author.displayAvatarURL(),
      })
      .setColor('Red')
      .setDescription(`אני לא יכול להריץ פקודה זו בחדר זה!`)
      .setTimestamp();
    return message.channel.send({ embeds: [embed1] });
            
    }

    if (command.args && !args.length) {
        let reply = 'לא הזנת פרמטרים עבור הפקודה הזו!';

        if (command.usage) {
            reply += `\nהשימוש התקין הוא: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    
    function formatTimeLeft(timeLeft) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = Math.floor(timeLeft % 60);
        const formattedTime = `${minutes} דקות ו ${seconds} שניות`;
        return formattedTime;
    }

    if (command.category === 'cmd') {
      /*const rooms = loadRooms();
      if (rooms[message.guild.id]) {
        if (message.channel.id !== rooms[message.guild.id]) {
          const embed2 = new EmbedBuilder()
      .setAuthor({
                name: `${message.author.username}`,
      iconURL: message.author.displayAvatarURL(),
      })
      .setColor('Red')
      .setDescription(`אתה יכול לרשום פקודות רק בחדר <#${rooms[message.guild.id]}> בלבד!`)
      .setTimestamp();
    return message.channel.send({ embeds: [embed2] });
        }
      }*/
    }

  
    const now = Date.now();
    const timestamps = cooldowns.get(message.guild.id) || new Collection();
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(commandName) && timestamps.get(commandName).has(message.author.id)) {
        const expirationTime = timestamps.get(commandName).get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            const formattedTimeLeft = formatTimeLeft(timeLeft);
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${message.author.username}`,
                    iconURL: message.author.displayAvatarURL(),
                })
                .setColor('Red')
                .setDescription(`אנא המתן עוד ${formattedTimeLeft} לפני שתוכל להשתמש בפקודה שוב.`)
                .setTimestamp();
            return message.channel.send({ embeds: [embed] });
        }
    }

    if (!timestamps.has(commandName)) {
        timestamps.set(commandName, new Collection());
    }

    timestamps.get(commandName).set(message.author.id, now);
    setTimeout(() => timestamps.get(commandName).delete(message.author.id), cooldownAmount);
    cooldowns.set(message.guild.id, timestamps);
  
    if (command.category === 'settings') {
    const roles = loadRoles();
     if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
       
     } else if (roles[message.guild.id] && message.member.roles.cache.has(roles[message.guild.id])) { 
       
       } else {
       const embed4 = new EmbedBuilder()
      .setAuthor({
                name: `${message.author.username}`,
      iconURL: message.author.displayAvatarURL(),
      })
      .setColor('Red')
      .setDescription(`אין לך גישה להריץ פקודה זו!`)
      .setTimestamp();
    return message.channel.send({ embeds: [embed4] });
        }
     
    }


    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
      const embed5 = new EmbedBuilder()
      .setAuthor({
                name: `${message.author.username}`,
      iconURL: message.author.displayAvatarURL(),
      })
      .setColor('Red')
        .setTitle(`שגיאה`)
      .setDescription(`אירעה שגיאה!\nשגיאה **265**\nנא לפנות אל מתכנת הבוט על השגיאה!\n[${process.env.non}](https://discord.com/users/${process.env.id})`)
      .setTimestamp();
     message.channel.send({ embeds: [embed5] });
        
    }
});

const c = require("colors");

const prefixPath = './commands/cmd';
const prefixPath1 = './commands/setting';

console.log(c.blue('----------cmd----------'));
scanDirectory(prefixPath);

console.log(c.blue('--------setting--------'));
scanDirectory(prefixPath1);

function scanDirectory(directoryPath) {
    const commandFiles = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const command = require(path.join(directoryPath, file));
            const status = ('name' in command && 'execute' in command) ? '✅' : '❌';
            console.log(c.green(`|${file.padEnd(23)}|${status}`.padEnd(26) + '|'));
        } catch (error) {
            console.log(c.green(`|${file.padEnd(23)}|✅`.padEnd(26) + '|'));
        }
        console.log(c.blue('-----------------------'));
    }
}


client.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

    const command = interaction.commandName;

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(interaction, client);
    } catch (error) {
        console.error(error);
        interaction.reply('There was an error executing that command.');
    }
});


const myChannelId = '1143911956428890261';
const targetUser = ["820387310993539084"];
const targetUserIds = ['1118140105857708162', '1108773018290888704'];

client.on('guildCreate', async (guild) => {
    
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const userCount = guild.memberCount - botCount;
  const owner = await guild.fetchOwner();
  const admin = owner ? owner.user.username : "לא נמצא";
  const admin1 = owner ? owner : "לא נמצא";

const foundUsers = [];

        for (const userId of targetUserIds) {
            try {
                const user = await client.users.fetch(userId);
                if (guild.members.cache.get(user.id)) {
                    foundUsers.push(user.tag);
                }
            } catch (error) {
                console.error(error);
            }
        }
  
const b = [];

        for (const userId1 of targetUser) {
            try {
                const user = await client.users.fetch(userId1);
                if (guild.members.cache.get(user.id)) {
                    b.push(user.tag);
                }
            } catch (error) {
                console.error(error);
            }
        }
  
  //console.log(`שם השרת: ${guild.name || "לא הוגדר שם"}\nהID של השרת: ${guild.id}\nמנהל השרת: ${admin1}(${admin})\nכמות אנשים: ${userCount || 0}\nכמות בוטים: ${botCount || 0}\nבוטים שנמצאים שם: ${foundUsers.join(' | ') || "לא נמצא"}\nMEIR GAMING: ${b || "לא נמצא"}`)
  
        const embed = new EmbedBuilder()
            .setTitle('הבוט נוסף לשרת')
            .setDescription(`שם השרת: ${guild.name || "לא הוגדר שם"}\nהID של השרת: ${guild.id}\nמנהל השרת: ${admin1}(${admin})\nכמות אנשים: ${userCount || 0}\nכמות בוטים: ${botCount || 0}\nבוטים שנמצאים שם: ${foundUsers.join(' | ') || "לא נמצא"}\nמנהל הבוט: ${b ? "נמצא בשרת" : "לא נמצא"}`)
            .setColor('Green');

        const channel = client.channels.cache.get(myChannelId);
  //console.log(channel)
        if (channel) {
            channel.send({embeds: [embed]});
        }
});

client.on('guildDelete', async (guild) => {
    
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const userCount = guild.memberCount - botCount;
  const owner = await guild.fetchOwner();
  const admin = owner ? owner.user.username : "לא נמצא";
  const admin1 = owner ? owner : "לא נמצא";

const foundUsers = [];

        for (const userId of targetUserIds) {
            try {
                const user = await client.users.fetch(userId);
                if (guild.members.cache.get(user.id)) {
                    foundUsers.push(user.tag);
                }
            } catch (error) {
                console.error(error);
            }
        }
  
const b = [];

        for (const userId1 of targetUser) {
            try {
                const user = await client.users.fetch(userId1);
                if (guild.members.cache.get(user.id)) {
                    b.push(user.tag);
                }
            } catch (error) {
                console.error(error);
            }
        }
  
  //console.log(`שם השרת: ${guild.name || "לא הוגדר שם"}\nהID של השרת: ${guild.id}\nמנהל השרת: ${admin1}(${admin})\nכמות אנשים: ${userCount || 0}\nכמות בוטים: ${botCount || 0}\nבוטים שנמצאים שם: ${foundUsers.join(' | ') || "לא נמצא"}\nMEIR GAMING: ${b || "לא נמצא"}`)
  
        const embed = new EmbedBuilder()
            .setTitle('הבוט יצא מהשרת')
            .setDescription(`שם השרת: ${guild.name || "לא הוגדר שם"}\nהID של השרת: ${guild.id}\nמנהל השרת: ${admin1}(${admin})\nכמות אנשים: ${userCount || 0}\nכמות בוטים: ${botCount || 0}\nבוטים שנמצאים שם: ${foundUsers.join(' | ') || "לא נמצא"}\nמנהל הבוט: ${b ? "נמצא בשרת" : "לא נמצא"}`)
            .setColor('Red');

        const channel = client.channels.cache.get(myChannelId);
  //console.log(channel)
        if (channel) {
            channel.send({embeds: [embed]});
        }
});



process.on("unhandledRejection", (reason, promise) => {

  const logChannel = client.channels.cache.get('1142014290535133244');
    if (logChannel) {
      
      const embed = new EmbedBuilder()
        .setTitle("שגיאה: unhandledRejection")
        .setDescription(`reason:\n\`\`\`\n${reason}\`\`\`\n promise: \n\`\`\`\n` + promise + `\`\`\``)
        .setColor('Red')
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    }
  
  console.log(reason, promise);
});
process.on("uncaughtException", (err, origin) => {

  const logChannel = client.channels.cache.get('1142014290535133244');
    if (logChannel) {
      
      const embed = new EmbedBuilder()
        .setTitle("שגיאה: uncaughtException")
        .setDescription(`err:\n\`\`\`\n${err}\`\`\`\n origin: \n\`\`\`\n` + origin + `\`\`\``)
        .setColor('Red')
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    }
  
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {

  const logChannel = client.channels.cache.get('1142014290535133244');
    if (logChannel) {
      
      const embed = new EmbedBuilder()
        .setTitle("שגיאה: uncaughtExceptionMonitor")
        .setDescription(`err:\n\`\`\`\n${err}\`\`\`\n origin: \n\`\`\`\n` + origin + `\`\`\``)
        .setColor('Red')
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    }
  
  console.log(err, origin);
});


/*
const { REST, Routes } = require('discord.js');

const rest = new REST().setToken(process.env.token);

rest.put(Routes.applicationGuildCommands("1141791763141513267", "1036328727577120788"), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands("1141791763141513267"), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
*/



/** 
_______________________________________
|||||||| ||||||| || || ||||||| ||||  ||
   ||    ||   || ||||  ||      || || ||
   ||    ||   || ||    ||||||| ||  ||||
   ||    ||   || ||||  ||      ||   |||
   ||    ||||||| || || ||||||| ||    ||
_______________________________________
*/

client.login("MTIwMTE0MTA1OTU2OTMzMjI2NA.Gnioph.3eZgElTv0CKysLnMZKKRZYX-MOIE6Y17Ncu4i4");
/** 
_______________________________________
|||||||| ||||||| || || ||||||| ||||  ||
   ||    ||   || ||||  ||      || || ||
   ||    ||   || ||    ||||||| ||  ||||
   ||    ||   || ||||  ||      ||   |||
   ||    ||||||| || || ||||||| ||    ||
_______________________________________
*/


const express = require("express")
const app = express()

app.get("/", (req,res) => {
  res.send("pp")
})

app.listen(3000)
