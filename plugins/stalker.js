const { command, getJson } = require("../lib");

command(
  {
    pattern: "gitstalk",
    fromMe: true,
    desc: "Fetch details of a GitHub user",
    type: "stalker",
  },
  async (message, match) => {
    try {
      if (!match) {
        await message.react("❌️");
        return await message.reply("Please provide a GitHub username.");
      }

      await message.react("⏳️");

      const response = await getJson(`https://nikka-api.vercel.app/stalker/gitstalk?q=${match}&apiKey=nikka`);
      if (!response || !response.data) {
        await message.react("❌️");
        return await message.reply("Failed to fetch user details. Please try again.");
      }

      const res = response.data;

      const text = `
♤□ NIKKA GITHUB STALKER □♤
> Username: ${res.username || "N/A"}
> Nickname: ${res.nickname || "N/A"}
> Bio: ${res.bio || "N/A"}
> Id: ${res.id || "N/A"}
> Node ID: ${res.nodeid || "N/A"}
> URL: ${res.url || "N/A"}
> Type: ${res.type || "N/A"}
> Admin: ${res.admin || "N/A"}
> Company: ${res.company || "N/A"}
> Location: ${res.location || "N/A"}
> Email: ${res.email || "N/A"}
> Blog: ${res.blog || "N/A"}
> Public Repos: ${res.public_repo || "N/A"}
> Public Gists: ${res.public_gists || "N/A"}
> Followers: ${res.followers || "N/A"}
> Following: ${res.following || "N/A"}
> Created At: ${res.created_at || "N/A"}
> Updated At: ${res.updated_at || "N/A"}
`;

      await message.client.sendMessage(message.jid, {
        image: { url: res.profile_pic || "" },
        caption: text,
      });

      await message.react("✅️");
    } catch (error) {
      console.error(error);
      await message.react("❌️");
      await message.reply("An error occurred while fetching the data.");
    }
  }
);
command(
    {
        pattern: "ttstalk",
        desc: "TikTok Stalker",
        fromMe: true,
        type: "stalker",
    },
    async (message, match) => {
        try {
            await message.react("⏳️");
            const query = match?.trim();
            const name = message.pushName;

            if (!query) {
                return await message.send(`Hello ${name}, please provide a TikTok username.`);
            }

            const apiUrl = `https://apii.ambalzz.biz.id/api/stalker/ttstalk?username=${encodeURIComponent(query)}`;
            const resp = await getJson(apiUrl);

            if (!resp?.status || resp.status !== "success" || !resp?.data?.user || !resp?.data?.stats) {
                return await message.send("Failed to fetch TikTok profile details.");
            }

            const user = resp.data.user;
            const stats = resp.data.stats;

            const img = user.avatarThumb;
            const text = `
*NIKKA MD TIKTOK STALKER*

👤 *Username:* ${user.uniqueId}
📛 *Nickname:* ${user.nickname}
✅ *Verified:* ${user.verified ? "Yes" : "No"}
🌎 *Region:* ${user.region}

📊 *Stats:*
👥 *Followers:* ${stats.followerCount}
👤 *Following:* ${stats.followingCount}
❤️ *Likes:* ${stats.heart}
👫 *Friends:* ${stats.friendCount}
🎥 *Videos:* ${stats.videoCount}
`;

            await message.client.sendMessage(message.jid, { image: { url: img }, caption: text });
        } catch (error) {
            await message.send("An error occurred while fetching TikTok profile details.");
            console.error(error);
        }
    }
);
