import { NestFactory } from '@nestjs/core';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { SubscriptionPlanType, Features } from '../generated/prisma';

const subscriptions = [
    { plan: SubscriptionPlanType.FREE },
    { plan: SubscriptionPlanType.BRONZE },
    { plan: SubscriptionPlanType.SILVER },
    { plan: SubscriptionPlanType.GOLD },
    { plan: SubscriptionPlanType.PLATINUM },
];

const permissions = [
    { feature: Features.SEE_WHO_IS_ONLINE },
    { feature: Features.BOOST_PROFILE },
    { feature: Features.VIEW_PROFILE_VISITORS },
    { feature: Features.LIKE },
    { feature: Features.LOVE },
    { feature: Features.UNDO_SWIPE },
    { feature: Features.HIDE_FROM_TG_CONTACTS },
    { feature: Features.AVATAR_VIDEOS },
    { feature: Features.MULTIPLE_AVATAR_PHOTOS_VIDEOS },
    { feature: Features.HIDE_RECEIPTS },
    { feature: Features.REACTIONS_TEN },
    { feature: Features.REACTIONS_THIRTY },
    { feature: Features.REACTIONS_FIFTY },
    { feature: Features.REACTIONS_SEVENTY },
    { feature: Features.REACTIONS_UNLIMITED },
];

const subscriptionPermissionsPairs = [
    {
        subscriptionName: SubscriptionPlanType.FREE,
        permissionsNames: [Features.REACTIONS_TEN],
    },

    {
        subscriptionName: SubscriptionPlanType.BRONZE,
        permissionsNames: [Features.REACTIONS_THIRTY, Features.LIKE, Features.AVATAR_VIDEOS],
    },

    {
        subscriptionName: SubscriptionPlanType.SILVER,
        permissionsNames: [
            Features.REACTIONS_FIFTY,
            Features.LIKE,
            Features.AVATAR_VIDEOS,
            Features.MULTIPLE_AVATAR_PHOTOS_VIDEOS,
            Features.BOOST_PROFILE,
        ],
    },

    {
        subscriptionName: SubscriptionPlanType.PLATINUM,
        permissionsNames: [
            Features.REACTIONS_SEVENTY,
            Features.LIKE,
            Features.AVATAR_VIDEOS,
            Features.MULTIPLE_AVATAR_PHOTOS_VIDEOS,
            Features.BOOST_PROFILE,
            Features.SEE_WHO_IS_ONLINE,
            Features.UNDO_SWIPE,
            Features.LOVE,
        ],
    },

    {
        subscriptionName: SubscriptionPlanType.GOLD,
        permissionsNames: [
            Features.REACTIONS_UNLIMITED,
            Features.LIKE,
            Features.AVATAR_VIDEOS,
            Features.MULTIPLE_AVATAR_PHOTOS_VIDEOS,
            Features.BOOST_PROFILE,
            Features.SEE_WHO_IS_ONLINE,
            Features.UNDO_SWIPE,
            Features.LOVE,
            Features.HIDE_FROM_TG_CONTACTS,
            Features.HIDE_RECEIPTS,
            Features.VIEW_PROFILE_VISITORS,
        ],
    },
];

(async function seed() {
    try {
        const appContext = NestFactory.createApplicationContext(PrismaModule);
        const prisma = (await appContext).get(PrismaService);

        // seed subscriptions
        await Promise.all(
            subscriptions.map((s) =>
                prisma.subscription.upsert({
                    where: { plan: s.plan },
                    update: {},
                    create: { plan: s.plan },
                }),
            ),
        );

        // seed permissions
        await Promise.all(
            permissions.map((perm) =>
                prisma.permission.upsert({
                    where: { feature: perm.feature },
                    update: {},
                    create: { feature: perm.feature },
                }),
            ),
        );

        // seed subscriptionsPermissions
        for (const { subscriptionName, permissionsNames } of subscriptionPermissionsPairs) {
            const subscription = await prisma.subscription.findUnique({
                where: { plan: subscriptionName },
                select: { id: true },
            });
            if (!subscription) throw new Error(`Subscription ${subscriptionName} not found`);

            const permissions = await prisma.permission.findMany({
                where: { feature: { in: permissionsNames } },
                select: { id: true },
            });
            if (!permissions) throw new Error(`Permission not found`);

            await prisma.subscriptionPermission.createMany({
                data: permissions.map((perm) => ({
                    subscriptionId: subscription.id,
                    permissionId: perm.id,
                })),

                skipDuplicates: true,
            });
        }

        console.log('Seeding finished successfully!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
