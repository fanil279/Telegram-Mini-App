import { join } from 'node:path';
import type { Request } from 'express';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(__dirname, './schema.gql'),
            path: '/graphql',
            sortSchema: true,
            context: ({ req }: { req: Request }) => ({ req }),
        }),
        AuthModule,
        UserModule,
    ],

    providers: [AppService, AppResolver],
})
export class AppModule {}
