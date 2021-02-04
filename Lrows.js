const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const chalk = require("chalk")
const fs = require("fs")
const moment = require("moment")
const db = require("quick.db")
const request = require("request")
const ms = require("parse-ms")
const express = require("express")
const http = require("http")
const app = express()
const logs = require("discord-logs")
require("moment-duration-format")
logs(client)
require("./util/eventLoader")(client)
var prefix = ayarlar.prefix
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.gif = {
  kategoriler: ["805040722537218080","805040723589857280","805040724303020032","805040725010939934","805040725649129472","805040726308028426","805040726685122591","805040727750475796","805040728584617984","805040729289392138","805040730091159592","805040730803929098","805040731260583948","805040732339437569","805040733093625866","805040733370843157"], //gif kategori idleri
  log: "805050084903485470", //Gif-Log (kanal id)
  sunucu: "sunucu isminiz", //Sunucunuzun İsmi
  rastgele: {
    PP: "805040762232111114", //Random PP (kanal id)
    GIF: "805040761472942080" //Random Gif (kanal id)
  }
  
}
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });//Lrows
      resolve();
    } catch (e) {
      reject(e);
    }//Lrows
  });
};
client.on('message', async msg =>{

  let categories = client.gif.kategoriler
  
  if(msg.attachments.size == 0&&categories.includes(msg.channel.parentID)){
  
  if(msg.author.bot) return;
  
  msg.delete({timeout:500})
  //Lrows
  msg.reply('Bu kanalda sadece pp/gif paylaşabilirsin!').then(m=>m.delete({timeout:5000}))
  //Lrows
}
  if(msg.attachments.size > 0 && categories.includes(msg.channel.parentID)){
//Lrows
  db.add(`sayı.${msg.author.id}`,msg.attachments.size)
  let emojis = ['⭐','🌙','⚡','🌌','💸']//Lrows
  var random = Math.floor(Math.random()*(emojis.length));
  let pp = 0
  let gif = 0
  msg.attachments.forEach(atch=>{
   if(atch.url.endsWith('.webp')||atch.url.endsWith('.png')||atch.url.endsWith('.jpeg')||atch.url.endsWith('.jpg')){
     db.add(`pp.${msg.author.id}`,1)//Lrows
     pp = pp + 1//Lrows
   }
    if(atch.url.endsWith('.gif')){//Lrows
     db.add(`gif.${msg.author.id}`,1)
      gif = gif +1//Lrows
    }
  })
  let mesaj = ``//lrows
  if(gif > 0 && pp === 0){
    mesaj = `${gif} gif`
  }//lrows
if(pp > 0 && gif === 0){
    mesaj = `${pp} pp`//lrows
  }
if(gif > 0 && pp > 0){
    mesaj = `${pp} pp, ${gif} gif`//lrows
  }
  client.channels.cache.get(client.gif.log).send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(client.gif.sunucu +' 🔥').setDescription(`<a:gifhouse_elmas:769504135346257940> \`•\` **${msg.author.tag}** (\`${msg.author.id}\`) **Adlı Üye** ,\n<#${msg.channel.id}> **kanalına ${mesaj} gönderdi.**\n**Bu kişi şuanda kanallara toplam ${db.fetch(`sayı.${msg.author.id}`)||0} pp/gif göndermiş.**`))
}//lrows
})

client.elevation = message => {
  if (!message.guild) {//Lrows
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;//Lrows
  if (message.author.id === ayarlar.sahip) permlvl = 4;//Lrows
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//Lrows

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on('ready',()=>{
  let oynuyorlrows = 
      ['GİF HOUSE | DEVELOPED BY Lrows ',]
    
    setInterval(function() {

        var random = Math.floor(Math.random()*(oynuyorlrows.length-0+1)+0);

        client.user.setActivity(oynuyorlrows[random],{type:'LISTENING'});
        }, 2 * 2000);
  setTimeout(()=>{
     client.user.setStatus("idle");

  },2000)
  
});
console.log('Bot Başarıyla Aktif Edildi by Lrows')
client.login(process.env.token).catch(err=> console.error('Tokeni Yenileyip Tekrar Girin'));
