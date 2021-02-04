const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {//'
  let sahip = message.member;
  let rol = "805040614923960341"//rol id'si
  
  const kanal = new Discord.MessageEmbed()
  .setTitle(`<a:gifhouse_hayir:766252757283766283> Hata`)
  .setDescription(`${sahip} bu komudu sadece <#805040758855041024> ve <#805040757316386857> kanalında kullanabilirsin!`)
  .setColor("FF0000")
  .setFooter(`O kanaldan rolünü alabilirsin.`)
  .setTimestamp()
  if (!["805040757316386857", "805040758855041024"].includes(message.channel.id))//komutun kullanılmasını istediğiniz kanal id'sini girin
    return message.channel.send(kanal);

  if (!rol) return message.channel.send("Rol bulunamadı.");

  const ver = new Discord.MessageEmbed()
  .setTitle(`Rolün verildi`)
  .setDescription(`${sahip} başarıyla <@&${rol}> rolü verildi.`)
  .setColor("6DFF6D")
  .setFooter(`Rolü silmek için komudu tekrar kullan.`)
  .setTimestamp()
  if (!sahip.roles.cache.has(rol))
    return sahip.roles.add(rol)
      .then(message.channel.send(ver));

  const sil = new Discord.MessageEmbed()
  .setTitle(`Rolün silindi`)
  .setDescription(`${sahip} başarıyla <@&${rol}> rolün silindi.`)
  .setColor("FF2727")
  .setFooter(`Rolü tekrar almak istersen komudu tekrar kullan.`)
  .setTimestamp()
  if (sahip.roles.cache.has(rol))
    return sahip.roles.remove(rol)
      .then(message.channel.send(sil));
};
exports.conf = {//'
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: "vip",
  description: "",
  usage: ""
}; 