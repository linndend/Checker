const axios = require("axios");
const fs = require("fs");

const wallets = JSON.parse(fs.readFileSync("wallets.json", "utf-8"));
const baseURL = "API KEY web";

async function checkAirdrop(wallet) {
    try {
        const res = await axios.get(`${baseURL}${wallet.address}`);
        const data = res.data;

        const eligible = data?.data?.airdrops?.length > 0;

        if (eligible) {
            console.log(`✅ ${wallet.address} (${wallet.chain}) eligible`);
            console.log(`   Airdrop(s):`, data.data.airdrops);
        } else {
            console.log(`❌ ${wallet.address} (${wallet.chain}) not eligible`);
        }
    } catch (err) {
        console.error(`⚠️ ${wallet.address} (${wallet.chain}) error:`, err.message);
    }
}

async function main() {
    for (const wallet of wallets) {
        await checkAirdrop(wallet);
    }
}

main();
