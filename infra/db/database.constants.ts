import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { DatabaseEntity } from "../../domains";
export const DATABASE_AUDIT_USER_ID = Buffer.from(Symbol.for('ANONYMOUS').toString()).toString('hex');
export const DATABASE_CURRENT_USER_ID = Symbol.for('DATABASE_CURRENT_USER_ID');
export const DATABASE_CLIENT_TOKEN = Symbol.for('DATABASE_CLIENT_TOKEN');
export const DATABASE_CLIENT_SCOPED_TOKEN = Symbol.for('DATABASE_CLIENT_SCOPED_TOKEN');



export type Repository<TId = number | string, TEntity = DatabaseEntity<TId>> =
    Prisma.UsersDelegate<DefaultArgs> |
    Prisma.AccountsDelegate<DefaultArgs> |
    Prisma.IdentitiesDelegate<DefaultArgs> |
    Prisma.SessionsDelegate<DefaultArgs> |
    Prisma.DevicesDelegate<DefaultArgs> |
    Prisma.SubscriptionsDelegate<DefaultArgs> |
    Prisma.TopicsDelegate<DefaultArgs> |
    Prisma.TenantsDelegate<DefaultArgs> |
    Prisma.TeamsDelegate<DefaultArgs> |
    Prisma.HashesDelegate<DefaultArgs> |
    Prisma.MembersDelegate<DefaultArgs> |
    Prisma.InvitesDelegate<DefaultArgs> |
    Prisma.AuthorizationResourcesDelegate<DefaultArgs> | 
    Prisma.AuthorizarionsDelegate<DefaultArgs> |
    Prisma.CredentialsDelegate<DefaultArgs> |
    Prisma.ConnectorsDelegate<DefaultArgs> | 
    Prisma.TestsDelegate<DefaultArgs> |
    Prisma.GroupsDelegate<DefaultArgs>;


export type RepositoryWhereInputs = 
    Prisma.UsersWhereInput |
    Prisma.AccountsWhereInput |
    Prisma.IdentitiesWhereInput |
    Prisma.SessionsWhereInput |
    Prisma.DevicesWhereInput |
    Prisma.SubscriptionsWhereInput |
    Prisma.TopicsWhereInput |
    Prisma.TenantsWhereInput |
    Prisma.TeamsWhereInput |
    Prisma.HashesWhereInput |
    Prisma.MembersWhereInput |
    Prisma.InvitesWhereInput |
    Prisma.AuthorizationResourcesWhereInput |
    Prisma.AuthorizarionsWhereInput |
    Prisma.CredentialsWhereInput |
    Prisma.ConnectorsWhereInput |
    Prisma.TestsWhereInput |
    Prisma.GroupsWhereInput;

export type RepositoryOrderByInputs =
    Prisma.UsersOrderByWithAggregationInput | Prisma.UsersOrderByWithRelationInput | Prisma.UsersAvgOrderByAggregateInput | Prisma.UsersMaxOrderByAggregateInput | Prisma.UsersMinOrderByAggregateInput | Prisma.UsersSumOrderByAggregateInput | Prisma.UsersCountOrderByAggregateInput |
    Prisma.AccountsOrderByWithAggregationInput | Prisma.AccountsOrderByWithRelationInput | Prisma.AccountsAvgOrderByAggregateInput | Prisma.AccountsMaxOrderByAggregateInput | Prisma.AccountsMinOrderByAggregateInput | Prisma.AccountsSumOrderByAggregateInput | Prisma.AccountsCountOrderByAggregateInput |
    Prisma.IdentitiesOrderByWithAggregationInput | Prisma.IdentitiesOrderByWithRelationInput | Prisma.IdentitiesAvgOrderByAggregateInput | Prisma.IdentitiesMaxOrderByAggregateInput | Prisma.IdentitiesMinOrderByAggregateInput | Prisma.IdentitiesSumOrderByAggregateInput | Prisma.IdentitiesCountOrderByAggregateInput |
    Prisma.SessionsOrderByWithAggregationInput | Prisma.SessionsOrderByWithRelationInput | Prisma.SessionsMaxOrderByAggregateInput | Prisma.SessionsMinOrderByAggregateInput | Prisma.SessionsCountOrderByAggregateInput |
    Prisma.DevicesOrderByWithAggregationInput | Prisma.DevicesOrderByWithRelationInput | Prisma.DevicesMaxOrderByAggregateInput | Prisma.DevicesMinOrderByAggregateInput | Prisma.DevicesCountOrderByAggregateInput |
    Prisma.SubscriptionsOrderByWithAggregationInput | Prisma.SubscriptionsOrderByWithRelationInput | Prisma.SubscriptionsMaxOrderByAggregateInput | Prisma.SubscriptionsMinOrderByAggregateInput | Prisma.SubscriptionsCountOrderByAggregateInput |
    Prisma.TopicsOrderByWithAggregationInput | Prisma.TopicsOrderByWithRelationInput | Prisma.TopicsMaxOrderByAggregateInput | Prisma.TopicsMinOrderByAggregateInput | Prisma.TopicsCountOrderByAggregateInput |
    Prisma.TenantsOrderByWithAggregationInput | Prisma.TenantsOrderByWithRelationInput | Prisma.TenantsMaxOrderByAggregateInput | Prisma.TenantsMinOrderByAggregateInput | Prisma.TenantsCountOrderByAggregateInput |
    Prisma.TeamsOrderByWithAggregationInput | Prisma.TeamsOrderByWithRelationInput | Prisma.TeamsMaxOrderByAggregateInput | Prisma.TeamsMinOrderByAggregateInput | Prisma.TeamsCountOrderByAggregateInput |
    Prisma.HashesOrderByWithAggregationInput | Prisma.HashesOrderByWithRelationInput | Prisma.HashesAvgOrderByAggregateInput | Prisma.HashesMaxOrderByAggregateInput | Prisma.HashesMinOrderByAggregateInput | Prisma.HashesSumOrderByAggregateInput | Prisma.HashesCountOrderByAggregateInput |
    Prisma.MembersOrderByWithAggregationInput | Prisma.MembersOrderByWithRelationInput | Prisma.MembersMaxOrderByAggregateInput | Prisma.MembersMinOrderByAggregateInput | Prisma.MembersCountOrderByAggregateInput |
    Prisma.InvitesOrderByWithAggregationInput | Prisma.InvitesOrderByWithRelationInput | Prisma.InvitesAvgOrderByAggregateInput | Prisma.InvitesMaxOrderByAggregateInput | Prisma.InvitesMinOrderByAggregateInput | Prisma.InvitesSumOrderByAggregateInput | Prisma.InvitesCountOrderByAggregateInput |
    Prisma.AuthorizationResourcesOrderByWithAggregationInput | Prisma.AuthorizationResourcesOrderByWithRelationInput | Prisma.AuthorizationResourcesAvgOrderByAggregateInput | Prisma.AuthorizationResourcesMaxOrderByAggregateInput | Prisma.AuthorizationResourcesMinOrderByAggregateInput | Prisma.AuthorizationResourcesSumOrderByAggregateInput | Prisma.AuthorizationResourcesCountOrderByAggregateInput |
    Prisma.AuthorizarionsOrderByWithAggregationInput | Prisma.AuthorizarionsOrderByWithRelationInput | Prisma.AuthorizarionsAvgOrderByAggregateInput | Prisma.AuthorizarionsMaxOrderByAggregateInput | Prisma.AuthorizarionsMinOrderByAggregateInput | Prisma.AuthorizarionsSumOrderByAggregateInput | Prisma.AuthorizarionsCountOrderByAggregateInput |
    Prisma.CredentialsOrderByWithAggregationInput | Prisma.CredentialsOrderByWithRelationInput | Prisma.CredentialsMaxOrderByAggregateInput | Prisma.CredentialsMinOrderByAggregateInput | Prisma.CredentialsCountOrderByAggregateInput |
    Prisma.ConnectorsOrderByWithAggregationInput | Prisma.ConnectorsOrderByWithRelationInput | Prisma.ConnectorsMaxOrderByAggregateInput | Prisma.ConnectorsMinOrderByAggregateInput | Prisma.ConnectorsCountOrderByAggregateInput |
    Prisma.TestsOrderByWithAggregationInput | Prisma.TestsOrderByWithRelationInput | Prisma.TestsMaxOrderByAggregateInput | Prisma.TestsMinOrderByAggregateInput | Prisma.TestsCountOrderByAggregateInput |
    Prisma.GroupsOrderByWithAggregationInput | Prisma.GroupsOrderByWithRelationInput | Prisma.GroupsAvgOrderByAggregateInput | Prisma.GroupsMaxOrderByAggregateInput | Prisma.GroupsMinOrderByAggregateInput | Prisma.GroupsSumOrderByAggregateInput | Prisma.GroupsCountOrderByAggregateInput;