import { PrismaClient } from '@mailerpro/database';

const prisma = new PrismaClient();

async function main() {
    console.log('Bot started...');

    setInterval(async () => {
        console.log('Bot is checking for emails to send...');
        // Logic to check DB and send emails would go here
        const users = await prisma.user.count();
        console.log(`Found ${users} users in database.`);
    }, 5000); // Check every 5 seconds
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
