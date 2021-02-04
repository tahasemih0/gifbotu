const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
let kisi = message.mentions.members.first() ? message.mentions.members.first() : message.member
let stat = []
if(db.has(`pp.${kisi.user.id}`)){
  stat.push(`\`${db.fetch(`pp.${kisi.user.id}`)}\` **pp**`)
}
  if(db.has(`gif.${kisi.user.id}`)){
  stat.push(`\`${db.fetch(`gif.${kisi.user.id}`)}\` **gif**`)
}
let embed = new Discord.MessageEmbed()
.setAuthor(client.gif.sunucu+'')
  .setDescription(stat[0] ? stat.join(', ') + ' **paylaşımında bulunmuşsun.**\n<a:gifhouse_kelebek:769504149213151252> **Toplam Paylaşım: **' + db.fetch(`sayı.${kisi.user.id}`)||0 : `\`•\` **Paylaşımda bulunmamış. <a:gifhouse_hayir:766041381017092120>**`)
  message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bilgi','stat'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Lrows V12 & Wenzy',
  usage: 'bilgi'
}
